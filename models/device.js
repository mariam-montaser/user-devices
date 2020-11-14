const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  sensorType: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
