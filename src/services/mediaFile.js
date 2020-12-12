const MediaFile = require('../models/mediaFile');
const { serviceErrors } = require('../constants');

module.exports = class {
  async saveMediaFile(mediaFile) {
    try {
      const { originalname, contentType } = mediaFile;
      return await MediaFile.create({
        ...mediaFile,
        original_name: originalname,
        content_type: contentType,
      });
    } catch (err) {
      console.log(SAVE_MEDIA_FILE, err);
      throw new Error(SAVE_MEDIA_FILE);
    }
  }

  async findMediaFileById(id) {
    try {
      return await MediaFile.findById(id);
    } catch (err) {
      console.log('Error in findMediaFileById:', err);
      next(err);
    }
  }
};
