const { PassThrough, Readable } = require('stream');
const ffmpeg = require('fluent-ffmpeg');

module.exports = async (mainFile, query, videoStream, imageFile) => {
  try {
    const { format } = query;
    let command;

    const outputOptions = [ '-movflags isml+frag_keyframe' ];
    if (format === 'gif') outputOptions.push('-pix_fmt yuv420p');

    if (!imageFile) {
      command = trimVideoFile(mainFile, query, outputOptions, videoStream);
    } else {
      command = trimFileAndAddImage(mainFile, query, outputOptions, videoStream, imageFile.location);
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

const trimVideoFile = (mainFile, query, outputOptions, videoStream) => {
  const { format, startTime, duration } = query;

  return ffmpeg()
    .input(mainFile)
    .setStartTime(startTime)
    .setDuration(duration)
    .outputOptions(outputOptions)
    .toFormat(format)
    .pipe(videoStream, {end: true});
};

const trimFileAndAddImage = (mainFile, query, outputOptions, videoStream, imageUrl)  => {
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
    .input(imageUrl)
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
    .pipe(videoStream, {end: true});
};
