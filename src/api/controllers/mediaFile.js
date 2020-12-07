const MediaFileService = require('../../services/mediaFile');
const { controllerErrors } = require('../../constants');

const mediaFileService = new MediaFileService();

exports.saveMediaFile = async (req, res, next) => {
  try {
    const savedMediaFile = await mediaFileService.saveMediaFile(req.file);
    return res.status(200).json(savedMediaFile);

  } catch (err) {
    console.log(controllerErrors.SAVE_MEDIA_FILE, err);
    next(err);
  }
};
