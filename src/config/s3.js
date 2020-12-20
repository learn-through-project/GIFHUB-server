const AWS = require('aws-sdk');
const { config } = require('../constants');

module.exports = new AWS.S3({
  accessKeyId: config.S3_ACCESS_KEY_ID,
  secretAccessKey: config.S3_SECRET_KEY,
});
