const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const aws = require('aws-sdk');
const {
  S3_ACCESS_KEY_ID,
  S3_SECRET_KEY,
  S3_BUCKET_NAME,
  S3_ACL
} = require('../constants');

const s3 = new aws.S3({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_KEY,
});

module.exports = multer({
  storage: multerS3({
    s3,
    bucket: S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, res, cb) => {
      cb(null, uuidv4());
    },
    acl: S3_ACL,
  })
});
