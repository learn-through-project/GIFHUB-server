
module.exports = function(originalName, format) {
  const newName = originalName.split('.')[0];
  return `${newName}.${format}`
}
