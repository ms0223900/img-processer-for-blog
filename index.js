require('dotenv').config();
const {
  ImgurClient,
} = require('imgur');
const fs = require('fs')

const IMG_FOR_PROCESS_DIR = './img-for-process'
const OUT_DIR = './out'

const client = new ImgurClient({
  clientId: process.env.CLIENT_ID,
})

const uploadToImgur = (imgPath = '') => client.upload({
  image: fs.createReadStream(imgPath),
  type: 'stream',
});

const removeProcessedFiles = () => {
  fs.rmSync(IMG_FOR_PROCESS_DIR, {
    recursive: true,
  })
  fs.mkdirSync(IMG_FOR_PROCESS_DIR)
}

const readFilesFromOutDir = () => {
  const fileList = fs.readdirSync(OUT_DIR);
  return fileList;
}

function main() {
  (async () => {
    console.log('Remove processed files...');
    removeProcessedFiles();

    console.log('Start uploading...');
    const uploadeLinkList = [];
    const fileList = readFilesFromOutDir()

    for (const filePath of fileList) {
      const res = await uploadToImgur(`${OUT_DIR}/${filePath}`);
      // console.log(res.data);
      uploadeLinkList.push(res.data.link);
    }

    fs.writeFileSync('./uploaded.txt', uploadeLinkList.join('\n'))
    console.log('Upload completed :)')
  })();
}

main()