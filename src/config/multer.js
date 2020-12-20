const s3 = require('./s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const { config } = require('../constants');

exports.multerS3 = multer({
  storage: multerS3({
    s3,
    bucket: config.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, res, cb) => {
      cb(null, uuidv4());
    },
    acl: config.S3_ACL,
  })
});

exports.multerMemory = multer({
  storage: multer.memoryStorage()
});
