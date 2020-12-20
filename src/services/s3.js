const { s3 } = require('../config');
const { serviceMessages } = require('../constants');

module.exports = class {
  constructor(bucketName) {
    this.params = {
      Bucket: bucketName
    };
  }

  async upload(key, body) {
    try {
      const params = { ...this.params, Key: key, Body: body };
      return await s3.upload(params).promise();
    } catch (err) {
      console.log(serviceMessages.S3_UPLOAD_ERROR, err);
      throw new Error(err.message);
    }
  }

  async getObject(key, range, videoStream) {
    try {
      const params = { ...this.params, Key: key, Range: range };
      const stream = s3.getObject(params).createReadStream();
      stream.pipe(videoStream);
    } catch (err) {
      console.log(serviceMessages.S3_GET_OBJECT_ERROR, err);
      throw new Error(err.message);
    }
  }

  async deleteObject(key) {
    try {
      const params = { ...this.params, Key: key };
      return await s3.deleteObject(params).promise();
    } catch (err) {
      console.log(serviceMessages.S3_DELETE_OBJECT_ERROR, err);
      throw new Error(err.message);
    }
  }
};
