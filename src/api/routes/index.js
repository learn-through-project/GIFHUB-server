const { Router } = require('express');
const { getMediaFiles } = require('../controllers/mediaFile');

route = Router();

route.get(
  '/',
  getMediaFiles
);

module.exports = route;
