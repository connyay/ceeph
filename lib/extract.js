'use strict';

var Q = require('q');
var tar = require('tar');
var zlib = require('zlib');
var rimraf = require('rimraf');
var target = require('./root');
var fs = require('fs');

module.exports = extract;

function extract(path) {
    var extractDir = target.get();
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
                path: extractDir,
                strip: 1
            })
            .on('error', onError)
            .on('end', onEnd);

        fs.createReadStream('./' + path)
            .pipe(zlib.createGunzip())
            .on('error', onError)
            .pipe(extractor);
    }
    rimraf('./' + extractDir, _extract);

    return dfd.promise;
}
