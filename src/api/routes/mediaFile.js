const { multerS3: uploadS3, multerMemory } = require('../../config');
const { config, path } = require('../../constants');
const {
  saveMediaFile,
  streamMediaFile,
  createFinalFile,
  getMediaFiles,
} = require('../controllers/mediaFile');

module.exports = router => {
  router.use(path.MEDIA_FILE, router);

  router.get(
    '/',
    getMediaFiles
  );

  router.post(
    '/',
    uploadS3.single(config.VIDEO_INPUT_TAG_NAME),
    saveMediaFile,
  );

  router.get(
    '/:file_id',
    streamMediaFile,
  );

  router.post(
    '/:file_id/finalFile',
    multerMemory.single(config.IMAGE_INPUT_TAG_NAME),
    createFinalFile,
  );
};
