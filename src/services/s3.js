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
      this.params.Key = key;
      this.params.Body = body;
      return await s3.upload(this.params).promise();
    } catch (err) {
      console.log('Error in s3service upload: ', err);
    }
  }

  async getObject(key, range, videoStream) {
    this.params.Key = key;
    this.params.Range = range;
    const stream = s3.getObject(this.params).createReadStream();
    stream.pipe(videoStream);
  }

  async deleteObject(key) {
    try {
      this.params.Key = key;
      return await s3.deleteObject(this.params).promise();
    } catch (err) {
      console.log('Error in s3service delete: ', err);
    }
  }
}
