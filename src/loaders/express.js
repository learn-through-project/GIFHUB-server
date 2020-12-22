const express = require('express');
const path = require('path');
const cors = require('cors');
const mediaFileRoute = require('../api/routes/mediaFile');
const { loaderMessages } = require('../constants');

module.exports = async app => {
  try {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use('/mediaFile', mediaFileRoute);
    app.use(express.static(path.join(__dirname, '../public')));
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');

    app.use((req, res, next) => {
      const err = new Error('404 Not Found');
      err.status = 404;
      next(404);
    });

    app.use((err, req, res, next) => {
      if(!err) return;
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      res.status(err.status || 500);
      res.json({
        message: err.message
      });
    });
  } catch (err) {
    console.log(loaderMessages.EXPRESS_LOADER_ERROR, err);
  }
};
