const fs = require('fs');
const MediaFileService = require('../../services/mediaFile');
const { s3 } = require('../../config');
const { controllerErrors, S3_BUCKET_NAME2 } = require('../../constants');

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

exports.streamMediaFile = async (req, res, next) => {
  try {
  const mediaFileId = req.query.id;
  const { size, key } = await mediaFileService.findMediaFileById(mediaFileId);

  const s3BucketParams = {
    Bucket: S3_BUCKET_NAME2,
    Key: key
  }

  const videoStream = s3.getObject(s3BucketParams).createReadStream();
  videoStream.pipe(res);

  } catch (err) {
    console.log(err);
    next(err);
  }

};
