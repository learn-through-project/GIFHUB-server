const MediaFile = require('../models/mediaFile');

module.exports = class {
  async saveMediaFile(mediaFile) {
    try {
      const { originalname, contentType, Location, location } = mediaFile;
      return await MediaFile.create({
        ...mediaFile,
        original_name: originalname,
        content_type: contentType,
        location: `${Location || location}` ,
      });
    } catch (err) {
      console.log('err', err);
      throw new Error('err');
    }
  }

  async findMediaFileById(id) {
    try {
      return await MediaFile.findById(id);
    } catch (err) {
      console.log('Error in findMediaFileById:', err);
    }
  }

  async deleteMediaFileById(id) {
    try {
      return await MediaFile.findByIdAndDelete(id);
    } catch (err) {
      console.log('Error in delete media file from db: ', err);
    }
  }

  async getAllMediaFile() {
    try {
      return await MediaFile.find({});
    } catch (err) {
      console.log('Error in get all media file: ', err);
    }
  }
};
