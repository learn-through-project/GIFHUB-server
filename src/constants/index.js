const dotenv = require('dotenv');
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error('Could not find env ');
}

module.exports = {
  PORT: process.env.PORT,
  SERVER_CONNECTION: 'Server connected',
  SERVER_DISCONNECTION: 'Server disconnected',
  DB_URL: process.env.DB_URL,
  DB_CONNECTION: 'Database connected',
  DB_DISCONNECTION: 'Database disconnected',
  MEDIA_FILE: '/mediaFile',
  ROOT_ROUTE: '/',
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: 'gifhub-file-bucket',
  S3_ACL: 'public-read',
  INPUT_TAG_NAME: 'mediaFile',
  SUCCESS: 'success',
  FAILURE: 'failure',
  POST: 'POST',
  GET: 'GET',
};

exports.ServiceErrors = {
  SAVE_MEDIA_FILE: 'Error in saveMediaFile of MediaFileService:'
}

exports.controllerErrors = {
  SAVE_MEDIA_FILE: 'Error in saveMediaFile controller:'
}

