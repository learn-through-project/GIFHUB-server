const { PassThrough } = require('stream');
const { s3 } = require('../../config');
const { controllerErrors, S3_BUCKET_NAME2 } = require('../../constants');
const { MediaFileService, S3Service } = require('../../services');
const { createFinalMediaFile, handleRange } = require('../../utils');

const mediaFileService = new MediaFileService();
const s3Service = new S3Service(S3_BUCKET_NAME2);

exports.saveMediaFile = async (req, res, next) => {
  try {
    console.log(1)
    const savedMediaFile = await mediaFileService.saveMediaFile(req.file);
    return res.status(200).json(savedMediaFile);
  } catch (err) {
    console.log(controllerErrors.SAVE_MEDIA_FILE, err);
    next(err);
  }
};

exports.streamMediaFile = async (req, res, next) => {
  try {
    const range = req.headers.range;

    if (!range) {
      return res.status(400).send('no range');
    }

    const {
      size,
      key,
      content_type
    } = await mediaFileService.findMediaFileById(req.params.file_id);
    const [ headers, s3Range ] = handleRange(range, size, content_type);

    const videoStream = new PassThrough();
    s3Service.getObject(key, s3Range, videoStream);

    res.writeHead(206, headers);
    videoStream.pipe(res);
  } catch(err) {
    console.log(err, 'err');
    next(err);
  }
};

exports.createFinalFile = async (req, res, next) => {
  try {
    const videoStream = new PassThrough();
    const mediaFileId = req.params.file_id;
    const { location, key } = await mediaFileService.findMediaFileById(mediaFileId);
    console.log(location, 'location')
    createFinalMediaFile(location, req.query, videoStream, req.file);

    const s3Upload = await s3Service.upload(`s3Test116.${req.query.format}`, videoStream);
    const s3Delete = await s3Service.deleteObject(key);
    console.log(s3Delete, 'd')
  } catch (err) {
    console.log('Error in createFinalFile controller: ', err);
    next(err)
  }
  
  
};

// const savedMediaFile = await mediaFileService.saveMediaFile(data);
//     const deletePrevMediaFile = await mediaFileService.deleteMediaFileById(mediaFileId);
