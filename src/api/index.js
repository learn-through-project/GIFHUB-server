const express = require('express');
const mediaFile = require('./routes/mediaFile');

module.exports = () => {
  const router = express.Router();
  mediaFile(router);

  return router;
};
