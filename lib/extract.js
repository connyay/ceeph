'use strict';

var Q = require('q'),
    tar = require('tar'),
    zlib = require('zlib'),
    rimraf = require('rimraf'),
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
    function _extract() {
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
    }
    rimraf('./' + uuid, _extract);

    return dfd.promise;
}
