const fs = require('fs');
const { PassThrough, Readable } = require('stream');
const ffmpeg = require('fluent-ffmpeg');
const { s3 } = require('../../config');
const { controllerErrors, S3_BUCKET_NAME2 } = require('../../constants');
const MediaFileService = require('../../services/mediaFile');

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
  const { location } = await mediaFileService.findMediaFileById(req.params.file_id);

  const videoStream = new PassThrough();
  const imageStream = new PassThrough();

  const buffer = Buffer.from(req.file.buffer);
  const readable = new Readable()
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  readable.pipe(imageStream);

  ffmpeg()
    .input(location)
    .setStartTime(req.query.startTime)
    .setDuration(req.query.duration)
    .input(imageStream)
    .complexFilter(
      [
        {
          'filter': 'overlay',
          'options': {
            'x': '25',
            'y': '25'
          },
          'inputs': '[0:v][1:v]',
          'outputs': 'tmp'
        }
      ], 'tmp')
    .outputOptions(['-movflags isml+frag_keyframe'])
    .outputOptions(['-c:v libx264', '-pix_fmt yuv420p'])
    .toFormat('mp4')
    .pipe(videoStream, {end: true})
    .on('error', function(err) {
      console.log('an error happened: ' + err.message);
    })
    .on('progress', function(progress) {
        console.log('Processing: ' + progress.percent + '% done');
    })
    .on('end', function() {
      console.log('Processing finished !');
    })

  const params = {
    Bucket: S3_BUCKET_NAME2,
    Key: 's3Test72.mp4',
    Body: videoStream,
    ContentType: 'application/octet-stream'
    };

  s3.upload(params, (err, data) => {
    if (err) console.log(err, 'err')
    console.log(data,'data')
  });
};
