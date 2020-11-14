const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
  {
    typeOfData: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
