const mongoose = require('mongoose');

const MediaFileSchema = new mongoose.Schema(
  {
    original_name: String,
    encoding: String,
    content_type: String,
    size: Number,
    location: String,
    key: String,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('MediaFile', MediaFileSchema);
