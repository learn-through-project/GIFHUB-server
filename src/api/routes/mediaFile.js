const { Router } = require('express');
const { multerS3: uploadS3, multerMemory } = require('../../config');
const { config } = require('../../constants');
const {
  saveMediaFile,
  streamMediaFile,
  createFinalFile,
} = require('../controllers/mediaFile');

route = Router();

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

module.exports = route;
