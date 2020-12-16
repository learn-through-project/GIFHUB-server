const fs = require('fs');
const stream = require('stream');
const MediaFileService = require('../../services/mediaFile');
const { s3 } = require('../../config');
const { controllerErrors, S3_BUCKET_NAME2 } = require('../../constants');
const ffmpeg = require('fluent-ffmpeg');

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
  // console.log(req.query, 'query')
  // console.log(req.params, 'params')
  // console.log(req.file, 'file')
  const { location, contentType, key } = await mediaFileService.findMediaFileById(req.params.file_id);
 
  const videoStream = new stream.PassThrough();

  ffmpeg()
    .input(location)
    .setStartTime(req.query.startTime)
    .setDuration(5)
    .outputOptions(['-movflags isml+frag_keyframe'])
    .toFormat('mp4')
    .on('error', function(err,stdout,stderr) {
        console.log('an error happened: ' + err.message);
        console.log('ffmpeg stdout: ' + stdout);
        console.log('ffmpeg stderr: ' + stderr);
    })
    .on('end', function() {
        console.log('Processing finished !');
    })
    .on('progress', function(progress) {
        console.log('Processing: ' + progress.percent + '% done');
    })
    .pipe(videoStream, {end: true});

  const params = {
    Bucket: S3_BUCKET_NAME2,
    Key: 's3Test8.mp4',
    Body: videoStream,
    ContentType: 'application/octet-stream'
    };

  s3.upload(params, (err, data) => {
    if (err) console.log(err, 'err')
    console.log(data,'data')
  });
};


