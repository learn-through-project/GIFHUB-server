const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('../api');
const { ROOT_ROUTE } = require('../constants');

module.exports = async app => {
  try {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(require('morgan')('dev'));
    app.use(cors());
    app.use(ROOT_ROUTE, apiRoutes());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(function(req, res, next) {
      next(createError(404));
    });

    app.use(function(err, req, res, next) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      res.status(err.status || 500);
      res.render('error');
    });
  } catch (err) {
    console.log('Error in express loader: ', err);
  }
  
};
