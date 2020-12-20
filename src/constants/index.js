const dotenv = require('dotenv');
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error('Could not find env ');
}

exports.config = {
  DB_URL: process.env.DB_URL,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: 'gifhub-file-bucket2',
  S3_ACL: 'public-read',
  VIDEO_INPUT_TAG_NAME: 'mediaFile',
  IMAGE_INPUT_TAG_NAME: 'image',
};

exports.path = {
  PORT: process.env.PORT,
  MEDIA_FILE: '/mediaFile',
};

exports.loaderMessages = {
  EXPRESS_LOADER_ERROR: 'Error in express loader: ',
  DB_CONNECTION: 'Database connected',
  DB_DISCONNECTION: 'Database disconnected',
  SERVER_CONNECTION: 'Server connected',
  SERVER_DISCONNECTION: 'Server disconnected',
};

exports.serviceMessages = {
  SAVE_MEDIA_FILE_ERROR: 'Error in saveMediaFile of MediaFileService:',
  FIND_MEDIA_FILE_BY_ID_ERROR: 'Error in findMediaFileById: ',
  DELETE_MEDIA_FILE_BY_ID_ERROR: 'Error in delete media file from db: ',
  GET_ALL_MEDIA_FILE_ERROR: 'Error in get all media file: ',
  S3_UPLOAD_ERROR: 'Error in s3service upload: ',
  S3_GET_OBJECT_ERROR: 'Error in s3service getObject: ',
  S3_DELETE_OBJECT_ERROR: 'Error in s3service delete: ',
};

exports.controllerMessages = {
  SAVE_MEDIA_FILE_ERROR: 'Error in saveMediaFile controller: ',
  STREAM_MEDIA_FILE_ERROR: 'Error in streamMediaFile controller: ',
  CREATE_FINAL_FILE_ERROR: 'Error in createFinalFile controller: ',
  GET_ALL_MEDIA_FILE_ERROR: 'Error in getAllMediaFile controller: ',
  NO_RANGE: 'no range',
};
