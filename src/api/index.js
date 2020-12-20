const express = require('express');
const mediaFile = require('./routes/mediaFile');
const router = express.Router();

module.exports = () => {
  mediaFile(router);
  return router;
};
