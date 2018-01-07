require('dotenv').config();

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      router = express.Router(),
      port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: process.env.CORS_ORIGIN}));

router.use(async (req, res, next) => {
    const start = Date.now();
    await next();
    const responseTime = Date.now() - start;
    console.info(`${req.method} ${res.statusCode} ${req.url} - ${responseTime} ms`);
});

router.use(async (req, res, next) =>{
    try {
        await next();
    } catch (err) {
        req.status = err.status;
        req.body = err.message;
        console.error(`Request Error ${req.url} - ${err.message}`);
    }
});

const devices = require('./controllers/devices');

router.route('/devices')
    .post(devices.create_device)
    .get(devices.get_all_devices);

router.route('/devices/:id')
    .get(devices.get_device)
    .put(devices.update_device)
    .delete(devices.delete_device);

router.route('/devices/name/:name')
    .get(devices.get_devices_by_name)
    .put(devices.update_by_name)
    .delete(devices.delete_device_by_name);

router.route('/devices/room/:room')
    .get(devices.get_devices_by_room)
    .put(devices.update_by_room)
    .delete(devices.delete_device_by_room);

router.route('/devices/:room/:name')
    .get(devices.get_device_by_room_and_name)
    .put(devices.update_device_by_room_and_name)
    .delete(devices.delete_device_by_room_and_name);

app.use('/api', router);

app.listen(port);
console.log('Server running on port ' + port);