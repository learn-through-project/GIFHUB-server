
module.exports = function(range, size, contentType) {

  if (!range) return;

  const chunkSize = 10 ** 6;
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + chunkSize, size - 1);

  const contentLength = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${size}`,
    'Accept-Range': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': contentType,
  }

  const s3Range = `bytes=${start}-${end}`;
  return [headers, s3Range];
}
