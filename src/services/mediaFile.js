const MediaFile = require('../models/mediaFile');
const { serviceMessages } = require('../constants');

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
      console.log(serviceMessages.SAVE_MEDIA_FILE_ERROR, err);
      throw new Error(err.message);
    }
  }

  async findMediaFileById(id) {
    try {
      return await MediaFile.findById(id);
    } catch (err) {
      console.log(serviceMessages.FIND_MEDIA_FILE_BY_ID_ERROR, err);
      throw new Error(err.message);
    }
  }

  async deleteMediaFileById(id) {
    try {
      return await MediaFile.findByIdAndDelete(id);
    } catch (err) {
      console.log(serviceMessages.DELETE_MEDIA_FILE_BY_ID_ERROR, err);
      throw new Error(err.message);
    }
  }

  async getAllMediaFile() {
    try {
      return await MediaFile.find({});
    } catch (err) {
      console.log(serviceMessages.GET_ALL_MEDIA_FILE_ERROR, err);
      throw new Error(err.message);
    }
  }
};
