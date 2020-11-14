const express = require('express');

const {
  createDevice,
  getUserDevices,
  getDeviceData,
  addDeviceData,
} = require('../controllers/devices.controllers');

const router = express.Router();

// devices api
router.post('/', createDevice);
router.get('/', getUserDevices);
router.post('/:deviceId', addDeviceData);
router.get('/:deviceId', getDeviceData);

module.exports = router;
