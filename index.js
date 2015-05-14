'use strict';

var args = process.argv.slice(2);
var uploadPath = args[0],
    uploadUUID = args[1];

function bootstrap() {
    require('./lib/bootstrap');
}

if (!uploadPath || !uploadUUID) {
    return bootstrap();
}
var extractor = require('./lib/extract');
extractor(uploadPath, uploadUUID)
    .then(bootstrap)
    .catch(function (err) {
        console.log('Error Extracting File', err);
    });
