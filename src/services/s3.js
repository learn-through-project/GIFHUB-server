const { s3 } = require('../config');
const { promisify } = require('../utils')

module.exports = class {
  constructor(bucketName) {
    this.params = {
      Bucket: bucketName
    }
  }

  async upload(key, body) {
    try {
      const params = { ...this.params, Key: key, Body: body };
      return await s3.upload(params).promise();
    } catch (err) {
      console.log('Error in s3service upload: ', err);
    }
  }

  async getObject(key, range, videoStream) {
    const params = { ...this.params, Key: key, Range: range };
    const stream = s3.getObject(params).createReadStream();
    stream.pipe(videoStream);
  }

  async deleteObject(key) {
    try {
      const params = { ...this.params, Key: key };
      return await s3.deleteObject(params).promise();
    } catch (err) {
      console.log('Error in s3service delete: ', err);
    }
  }
}
