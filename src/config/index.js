const s3 = require('./s3');
const { multerS3, multerMemory } = require('./multer');

module.exports = {
  s3,
  multerS3,
  multerMemory,
};
