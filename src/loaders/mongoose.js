const mongoose = require('mongoose');
const { DBURL } = require('../constants');

module.exports = async () => {
  try {
    const connection = await mongoose.connect(DBURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    console.log('database connected');
  } catch (err) {
    console.error(`database connection error: ${err}`);
  }
};
