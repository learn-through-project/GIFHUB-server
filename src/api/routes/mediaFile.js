const upload = require('../../config/s3');
const { saveMediaFile } = require('../controllers/mediaFile');
const { INPUT_TAG_NAME, MEDIA_FILE, ROOT_ROUTE } = require('../../constants');

module.exports = router => {
  router.use(MEDIA_FILE, router);

  router.post(
    ROOT_ROUTE,
    upload.single(INPUT_TAG_NAME),
    saveMediaFile,
  );
};
