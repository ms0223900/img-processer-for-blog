# Auto compress and upload images :)

Compress images with squoosh and upload to imgur!

## Get your imgur client id

- Create and .env file under root directory
- Get Imgur client id

  - Register an application: https://api.imgur.com/oauth2/addclient

  ![Snipaste_2022-08-21_01-24-46.jpg](https://i.imgur.com/mKtxqpN.jpg)

  - You'll get client id and client secret.

- Set your client id to .env file

  ![Snipaste_2022-08-21_01-22-04.jpg](https://i.imgur.com/unKhc8j.jpg)

## Create two directories

- Make two directories under root directory:

  - out
  - img-for-process

  just like above
  ![Snipaste_2022-08-21_01-26-38.jpg](https://i.imgur.com/jr8bN3I.jpg)

## Run process

- Put your images to `img-for-process` directory.
- Run process

  - yarn

  ```bash
  yarn start
  ```

  - npm

  ```bash
  npm start
  ```

## See results

Output will be writen into uploaded.txt

![Snipaste_2022-08-21_01-17-19.jpg](https://i.imgur.com/fNsxxP6.jpg)
