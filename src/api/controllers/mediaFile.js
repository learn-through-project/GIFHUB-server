const { PassThrough } = require('stream');
const { s3 } = require('../../config');
const { controllerErrors, S3_BUCKET_NAME2 } = require('../../constants');
const MediaFileService = require('../../services/mediaFile');
const createMediaFile = require('../../utils/createMediaFile');

const mediaFileService = new MediaFileService();

exports.saveMediaFile = async (req, res, next) => {
  console.log('123')
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

    const { size, key } = await mediaFileService.findMediaFileById(req.params.file_id);

    const chunkSize = 10 ** 6 / 2;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, size - 1);

    const contentLength = end - start + 1;
    const headers = {
     'Content-Range': `bytes ${start}-${end}/${size}`,
     'Accept-Range': 'bytes',
     'Content-Length': contentLength,
     'Content-Type': 'video/mp4',
    }

    const params = {
      Bucket: S3_BUCKET_NAME2,
      Key: key,
      Range: `bytes=${start}-${end}`
     };

    res.writeHead(206, headers);
    const videoStream = s3.getObject(params).createReadStream();
    videoStream.pipe(res);

  } catch(err) {
    console.log(err, 'err');
  }
};

exports.createFinalFile = async (req, res, next) => {
  const videoStream = new PassThrough();
  const { location } = await mediaFileService.findMediaFileById(req.params.file_id);
  
  createMediaFile(location, req.query, videoStream, req.file)

  const params = {
    Bucket: S3_BUCKET_NAME2,
    Key: `s3Test102.${req.query.format}`,
    Body: videoStream,
    };

  s3.upload(params, (err, data) => {
    console.log(data, 'data')
    
  })

};
