const { PassThrough } = require('stream');
const { v4: uuidv4 } = require('uuid');
const { MediaFileService, S3Service } = require('../../services');
const { createFinalMediaFile, handleRange, createFileName } = require('../../utils');
const { controllerErrors, S3_BUCKET_NAME2 } = require('../../constants');

const mediaFileService = new MediaFileService();
const s3Service = new S3Service(S3_BUCKET_NAME2);

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
    const {
      location,
      key,
      original_name: fileName,
    } = await mediaFileService.findMediaFileById(mediaFileId);
    createFinalMediaFile(location, req.query, videoStream, req.file);

    const newFileName = createFileName(fileName, req.query.format);
    const s3Upload = await s3Service.upload(`${uuidv4()}_${newFileName}`, videoStream);
    const savedMediaFile = await mediaFileService.saveMediaFile(s3Upload);

    await s3Service.deleteObject(key);
    await mediaFileService.deleteMediaFileById(mediaFileId);

    return res.status(200).json(savedMediaFile);
  } catch (err) {
    console.log('Error in createFinalFile controller: ', err);
    next(err)
  }
};

exports.getMediaFiles = async (req, res, next) => {
  const list = await mediaFileService.getAllMediaFile();
  return res.status(200).json(list);
};
