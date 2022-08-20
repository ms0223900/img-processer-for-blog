require('dotenv').config();
const {
  ImgurClient,
} = require('imgur');
const fs = require('fs')
// const rmOut = require('./rmOut')

const IMG_FOR_PROCESS_DIR = './img-for-process'
const OUT_DIR = './out'
const WRITTEN_FILE_PATH = './uploaded.txt'

const client = new ImgurClient({
  clientId: process.env.CLIENT_ID,
})

const uploadToImgur = (imgPath = '') => client.upload({
  image: fs.createReadStream(imgPath),
  type: 'stream',
});

const removeProcessedFiles = (dir = IMG_FOR_PROCESS_DIR) => {
  fs.rmSync(dir, {
    recursive: true,
  })
  fs.mkdirSync(dir)
}

const readFilesFromOutDir = () => {
  const fileList = fs.readdirSync(OUT_DIR);
  return fileList;
}

const makeTimeStampStrDevider = () => (
  `-----------------------${new Date().toISOString()}-----------------------`
)

const makeMarkdownImgStr = (imgSrc = '', imgAlt = '') => (
  `![${imgAlt}](${imgSrc})`
)

// https://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node
const writeUploadedLinksToFile = (uploadeLinkList = []) => {
  const stream = fs.createWriteStream(WRITTEN_FILE_PATH, {
    flags: 'a',
  });
  stream.write(
    '\n' + [makeTimeStampStrDevider(), ...uploadeLinkList].join('\n') + '\n'
  )
}

function main() {
  (async () => {
    const fileList = readFilesFromOutDir();
    if (!fileList.length) return console.log(
      `No image found, please put images to ${IMG_FOR_PROCESS_DIR} folder.`
    )

    console.log('Remove compressed files.');
    removeProcessedFiles();

    console.log('Start uploading...');
    const uploadeLinkList = [];

    for (const filePath of fileList) {
      const res = await uploadToImgur(`${OUT_DIR}/${filePath}`);
      // console.log(res.data);
      uploadeLinkList.push({
        link: res.data.link,
        path: filePath,
      });
      console.log(`File ${filePath} uploaded.`)
    }
    console.log('---Upload completed---')

    const strPathAndLinkList = uploadeLinkList.map(l => `${l.path}\n${l.link}`)
    const strLinkList = uploadeLinkList.map(l => l.link)
    const mdImgList = uploadeLinkList.map(l => (
      makeMarkdownImgStr(l.link, l.path)
    ))
    writeUploadedLinksToFile(
      [...strPathAndLinkList, '---', ...strLinkList, '---Markdown format---', ...mdImgList]
    )
    console.log('Clear uploaded images.')
    // removeProcessedFiles(OUT_DIR)
  })();
}

main()