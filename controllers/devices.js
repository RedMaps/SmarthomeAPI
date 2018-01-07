const mongoose = require('mongoose'),
      Device = require('../models/devices');

// POST REQUESTS
// ==============================================

exports.create_device = function (req, res) {
    let device = new Device({
        name: req.body.name,
        room: req.body.room,
        description: req.body.description,
        model: req.body.model,
        brand: req.body.brand,
        ip: req.body.ip,
        mac: req.body.mac
    });

    device.save(function (err, device) {
        if (err)
            res.send(err);
        res.json({ message: 'Device '+ device.name +' created!' });
    });
};

// GET REQUESTS
// ==============================================

exports.get_all_devices = function (req, res) {
    Device.find({}, function (err, device) {
        if (err)
            res.send(err);
        res.json(device);
    })
};

exports.get_device = function (req, res) {
    Device.findById(req.params.id, function (err, device) {
        if (err)
            res.send(err);
        res.json(device);
    })
};

exports.get_devices = function (req, res) {
    Device.findById(id, function (err, device) {
        if (err)
            res.send(err);
        res.json(device);
    })
};

exports.get_devices_by_name = function (req, res) {
    Device.find({ 'name': req.params.name }, function (err, device) {
        if (err)
            res.send(err);
        res.json(device);
    })
};

exports.get_devices_by_room = function (req, res) {
    Device.find({ 'room': req.params.room }, function (err, device) {
        if(err)
            res.send(err);
        res.json(device);
    })
};

exports.get_device_by_name = function (req, res) {
    Device.findOne({ 'name': req.params.name }, function (err, device) {
        if (err)
            res.send(err);
        res.json(device);
    })
};

exports.get_device_by_room = function (req, res) {
    Device.findOne({ 'room': req.params.room }, function (err, device) {
        if(err)
            res.send(err);
        res.json(device);
    })
};

exports.get_device_by_room_and_name = function (req, res) {
    Device.find({ 'room': req.params.room, 'name': req.params.name }, function (err, device) {
        if(err)
            res.send(err);
        res.json(device);
    })
};

// PUT REQUESTS
// ==============================================

exports.update_device = function (req, res) {
    Device.findById(req.params.id, function (err, device) {
        if (err)
            res.send(err);
        device[req.body.var] = req.body.val;
        device.save(function (err, device) {
            if (err) return res.send(err);
            res.json({ message: device.name + ' updated!' });
        });
    })
};

exports.update_by_name = function (req, res) {
    Device.findOne({ 'name': req.params.name }, function (err, device) {
        if (err)
            res.send(err);
        device[req.body.var] = req.body.val;
        device.save(function (err, device) {
            if (err) return res.send(err);
            res.json({ message: device.name + ' updated!' });
        });
    })
};

exports.update_by_room = function (req, res) {
    Device.findOne({ 'room': req.params.room }, function (err, device) {
        if (err)
            res.send(err);
        device[req.body.var] = req.body.val;
        device.save(function (err, device) {
            if (err) return res.send(err);
            res.json({ message: device.name + ' updated!' });
        });
    })
};

exports.update_device_by_room_and_name = function (req, res) {
    Device.findOne({ 'room': req.params.room, 'name': req.params.name }, function (err, device) {
        if (err)
            res.send(err);
        device[req.body.var] = req.body.val;
        device.save(function (err, device) {
            if (err) return res.send(err);
            res.json({ message: device.name + ' updated!' });
        });
    })
};

// DELETE REQUESTS
// ==============================================

exports.delete_device = function (req, res) {
    Device.remove({
        _id: req.params.id
    }, function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
};

exports.delete_device_by_name = function (req, res) {
    Device.remove({
        name: req.params.name
    }, function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
};

exports.delete_device_by_room = function (req, res) {
    Device.remove({
        room: req.params.room
    }, function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
};

exports.delete_device_by_room_and_name = function (req, res) {
    Device.remove({
        room: req.params.room,
        name: req.params.name
    }, function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
};