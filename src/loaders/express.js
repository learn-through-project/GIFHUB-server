const express = require('express');
const cors = require('cors');
const apiRoutes = require('../api');
const { ROOT_ROUTE } = require('../constants');

module.exports = async app => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(require('morgan')('dev'));
  app.use(cors());
  app.use(ROOT_ROUTE, apiRoutes());
};
