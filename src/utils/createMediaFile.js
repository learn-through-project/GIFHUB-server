const { PassThrough, Readable } = require('stream');
const ffmpeg = require('fluent-ffmpeg');

module.exports = async function(mainFile, query, videoStream, imageFile) {
  console.log('exec')
  try {
    const { format } = query;
    let command;

    const outputOptions = [ '-movflags isml+frag_keyframe' ];
    if (format === 'gif') outputOptions.push('-pix_fmt yuv420p');

    if (!imageFile) {
      command = trimVideoFile(mainFile, query, outputOptions, videoStream)
    } else {
      const imageStream = handleImageFile(imageFile);
      command = trimFileAndAddImage(mainFile, query, outputOptions, videoStream, imageStream);
    }

    command.on('error', function(err) {
      console.log('an error happened: ' + err.message);
    });
    command.on('progress', function(progress) {
        console.log('Processing: ' + progress.percent + '% done');
    });
    command.on('end', function() {
      console.log('Processing finished !');
    });
  } catch (err) {
    console.log('Error in create mediaFile util', err);
  }
};

function handleImageFile(imageFile) {
  const imageStream = new PassThrough();

  const buffer = Buffer.from(imageFile.buffer);
  const readable = new Readable()
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  readable.pipe(imageStream);

  return imageStream;
}

function trimVideoFile(mainFile, query, outputOptions, videoStream) {
  const { format, startTime, duration } = query;

  return ffmpeg()
    .input(mainFile)
    .setStartTime(startTime)
    .setDuration(duration)
    .outputOptions(outputOptions)
    .toFormat(format)
    .pipe(videoStream, {end: true})
}

function trimFileAndAddImage(mainFile, query, outputOptions, videoStream, imageStream) {
  const {
    width,
    height,
    top,
    left,
    format,
    startTime,
    duration
  } = query;

  return ffmpeg()
    .input(mainFile)
    .setStartTime(startTime)
    .setDuration(duration)
    .input(imageStream)
    .complexFilter(
      [
        `[1:v]scale=${width}:${height}[img]`,
        {
          'filter': 'overlay',
          'options': {
            'x': `${left}`,
            'y': `${top}`
          },
          'inputs': '[0:v][img]',
          'outputs': 'tmp'
        }
      ], 'tmp')
    .outputOptions(['-movflags isml+frag_keyframe'])
    .outputOptions(outputOptions)
    .toFormat(format)
    .pipe(videoStream, {end: true})
}
