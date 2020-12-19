const multer = require('multer');
const { multerS3: uploadS3, multerMemory } = require('../../config');
const { INPUT_TAG_NAME, MEDIA_FILE, ROOT_ROUTE } = require('../../constants');
const {
  saveMediaFile,
  streamMediaFile,
  createFinalFile,
  getMediaFiles,
} = require('../controllers/mediaFile');

module.exports = router => {
  router.use(MEDIA_FILE, router);

  router.get(
    ROOT_ROUTE,
    getMediaFiles
  );

  router.post(
    ROOT_ROUTE,
    uploadS3.single(INPUT_TAG_NAME),
    saveMediaFile,
  );

  router.get(
    '/:file_id',
    streamMediaFile,
  );

  router.post(
    '/:file_id/finalFile',
    multerMemory.single('image'),
    createFinalFile,
  );
};
