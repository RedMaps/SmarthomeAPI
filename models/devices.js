const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let Device = new Schema({
    name: { type: String, required: 'Please enter a name for the device' },
    room: { type: String, required: 'Please enter the room the device is located in' },
    description: String,
    model: { type: String, required: 'Please enter the device model' },
    brand: String,
    ip: { type: String, required: 'Please enter the device\'s IP adress', unique: 'There\'s already a device with this IP in the database' },
    mac: String
});

Device.index({ name: 1, room: 1 }, { unique: true });

module.exports = mongoose.model('Device', Device);