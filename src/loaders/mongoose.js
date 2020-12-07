const mongoose = require('mongoose');
const { DB_URL, DB_CONNECTION, DB_DISCONNECTION } = require('../constants');

module.exports = async () => {
  try {
    const connection = await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    console.log(DB_CONNECTION);
  } catch (err) {
    console.log(DB_DISCONNECTION, err);
  }
};
