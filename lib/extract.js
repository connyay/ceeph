'use strict';

var Q = require('q'),
    tar = require('tar'),
    zlib = require('zlib'),
    fs = require('fs');

module.exports = extract;

function extract(path, uuid) {
    var dfd = Q.defer();

    function onError(err) {
        console.error('An error occurred:', err);
        dfd.reject();
    }

    function onEnd() {
        console.log('Extracted!');
        dfd.resolve();
    }
    var extractor = tar.Extract({
            path: './' + uuid,
            strip: 1
        })
        .on('error', onError)
        .on('end', onEnd);

    fs.createReadStream('./' + path)
        .pipe(zlib.createGunzip())
        .on('error', onError)
        .pipe(extractor);

    return dfd.promise;
}