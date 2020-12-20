const express = require('express');
const mediaFile = require('./routes/mediaFile');
const app = express.Router();

module.exports = () => {
  mediaFile(app);
  return app;
};
