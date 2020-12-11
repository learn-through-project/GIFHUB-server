const s3 = require('./s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const { S3_BUCKET_NAME2, S3_ACL } = require('../constants');

module.exports = multer({
  storage: multerS3({
    s3,
    bucket: S3_BUCKET_NAME2,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, res, cb) => {
      cb(null, uuidv4());
    },
    acl: S3_ACL,
  })
});
