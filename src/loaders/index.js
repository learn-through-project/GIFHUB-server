const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

exports.init = async app => {
  await mongooseLoader();
  await expressLoader(app);
};
