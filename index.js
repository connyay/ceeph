'use strict';
var root = require('./lib/root');
var args = process.argv.slice(2);
var uploadPath = args[0],
    targetDir = args[1];

function bootstrap() {
    require('./lib/bootstrap');
}

if (!uploadPath || !targetDir) {
    console.error('Missing path or target directory');
    process.exit(1);
}
root.set('./' + targetDir);

var extractor = require('./lib/extract');
extractor(uploadPath)
    .then(bootstrap)
    .catch(function (err) {
        console.log('Error Extracting File', err);
    });
