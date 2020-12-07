const dotenv = require('dotenv');
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error('Could not find env ');
}

module.exports = {
  PORT: process.env.PORT,
  DBURL: process.env.DB_URL,
  MEDIA_FILE: '/mediaFile',
  ROOT_ROUTE: '/',
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: 'gifhub-file-bucket',
  S3_ACL: 'public-read',
  INPUT_TAG_NAME: 'mediaFile',
};
