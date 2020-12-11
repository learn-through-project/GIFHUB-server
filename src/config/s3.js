const AWS = require('aws-sdk');
const { S3_ACCESS_KEY_ID2, S3_SECRET_KEY2 } = require('../constants');

module.exports = new AWS.S3({
  accessKeyId: S3_ACCESS_KEY_ID2,
  secretAccessKey: S3_SECRET_KEY2,
});
