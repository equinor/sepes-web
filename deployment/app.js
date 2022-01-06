const express = require('express');
const app = express();
const router = express.Router();
const sqrl = require('squirrelly');
const { config } = require('./config');
const fs = require('fs');

const isWin = process.platform === 'win32';
const env = process.env.RADIX_ENVIRONMENT || 'local';
const path = env === 'local' && isWin ? __dirname + '\\..\\public\\' : __dirname + '/';
const port = 3000;

app.set('view engine', 'squirrelly');

sqrl.defaultTags(['%', '%']);
const template = fs.readFileSync(path + 'index.html', 'utf8');
const compiled = sqrl.Compile(template);
const data = { ...config[env], PUBLIC_URL: process.env.PUBLIC_URL || '' };
const result = compiled(data, sqrl);

// Writes the new index.html
fs.writeFile(path + 'index.html', result, 'utf-8', function (err, data) {
    if (err) console.log(err);
});

// Define routes
router.get('*', function (req, res) {
    res.sendFile(path + 'index.html');
});

app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
    console.log('Sepes is running on port 3000');
    console.log('Environment variables:');
    console.log(data);
});

// TODO: Add 'pino', 'morgan' or 'winston' logging
