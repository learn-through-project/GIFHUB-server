const upload = require('../../config/s3');
const { INPUT_TAG_NAME, MEDIA_FILE, ROOT_ROUTE } = require('../../constants');

module.exports = router => {
  router.use(MEDIA_FILE, router);

  router.post(
    ROOT_ROUTE,
    upload.single(INPUT_TAG_NAME),
    (req, res, next) => {
    console.log(req.file,'video');
  });
};
