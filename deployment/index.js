const express = require('express');
const path = require('path');

const app = express();
console.log('Starting express...');

const radixEnvironment = process.env.RADIX_ENVIRONMENT;

console.log(`Environment: ${radixEnvironment}`);

app.use(express.static(path.join(__dirname, 'build', radixEnvironment)));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', radixEnvironment, 'index.html'));
});

app.listen(3000);
