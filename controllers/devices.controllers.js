const Device = require('../models/device');
const Data = require('../models/data');

exports.createDevice = (req, res) => {
  const creator = req.userData.userId;
  const device = new Device({
    sensorType: req.body.sensorType,
    creator,
  });
  device
    .save()
    .then((device) => {
      if (device) {
        res
          .status(201)
          .json({ message: 'Device created successfully', device });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'Failed to create device ' + error.message });
    });
};

exports.getUserDevices = (req, res) => {
  const creator = req.userData.userId;
  Device.find({ creator })
    .then((devices) => {
      if (devices.length > 0) {
        res
          .status(200)
          .json({ message: 'Devices fetched succesfully', devices });
      } else {
        res.status(200).json({ message: 'No devices yet.' });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'Failed to fetch data', error: error.message });
    });
};

exports.addDeviceData = (req, res) => {
  const device = req.params.deviceId;
  const creator = req.userData.userId;
  const { typeOfData, value } = req.body;
  const data = new Data({
    typeOfData,
    value,
    creator,
    device,
  });
  data
    .save()
    .then((storedData) => {
      if (storedData) {
        res
          .status(201)
          .json({ message: 'Device data added succesfully', storedData });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'Failed to add the data' + error.message });
    });
};

exports.getDeviceData = (req, res) => {
  const creator = req.userData.userId;
  const device = req.params.deviceId;
  Data.find({ creator, device })
    .populate({
      path: 'device',
      select: 'sensorType',
    })
    .then((deviceData) => {
      if (deviceData.length > 0) {
        res.status(200).json({
          message: 'Success',
          deviceData,
        });
      } else {
        res.status(200).json({
          message: 'No Data yet.',
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Failed to get data',
      });
    });
};
