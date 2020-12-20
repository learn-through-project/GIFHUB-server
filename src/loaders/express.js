const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('../api');
const { loaderMessages } = require('../constants');

module.exports = async app => {
  try {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(require('morgan')('dev'));
    app.use(cors());
    app.use('/', apiRoutes());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use((req, res, next) => {
      next(createError(404));
    });

    app.use((err, req, res) => {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      res.status(err.status || 500);
      res.render('error');
    });
  } catch (err) {
    console.log(loaderMessages.EXPRESS_LOADER_ERROR, err);
  }
};
