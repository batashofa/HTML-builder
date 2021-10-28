const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');

const readable = fs.createReadStream(filePath, 'utf-8');
readable.on('data', (chunk) => {process.stdout.write(chunk);});

