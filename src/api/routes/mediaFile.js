const { Router } = require('express');
const { multerS3: uploadS3, multerMemory } = require('../../config');
const { config, path } = require('../../constants');
const {
  saveMediaFile,
  streamMediaFile,
  createFinalFile,
  getMediaFiles,
} = require('../controllers/mediaFile');

route = Router();

module.exports = app => {
  app.use(path.MEDIA_FILE, route);

  route.get(
    '/',
    getMediaFiles
  );

  route.post(
    '/',
    uploadS3.single(config.VIDEO_INPUT_TAG_NAME),
    saveMediaFile,
  );

  route.get(
    '/:file_id',
    streamMediaFile,
  );

  route.post(
    '/:file_id/finalFile',
    multerMemory.single(config.IMAGE_INPUT_TAG_NAME),
    createFinalFile,
  );
};
