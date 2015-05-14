'use strict';
var fs = require('fs');
var _ = require('lodash');
var Q = require('q');
var registry = require('./registry');

var mappers = registry.mappers;
var reducers = registry.reducers;

var data = {};

function startMapper(mapper) {
    var dfd = Q.defer();
    fs.readFile(mapper.file, {
        encoding: 'utf-8'
    }, function (err, content) {
        var context = {
            content: content.split(/\r?\n/)
        };
        _.forEach(mapper.fns, function (fn) {
            var response = fn(context);
            if (response && response.error_key) {
                data[response.error_key] = response;
            } else if (response) {
                data[response] = true;
            }
        });
        dfd.resolve();
    });
    return dfd.promise;
}

var mapperDfds = [];

for (var m in mappers) {
    mapperDfds.push(startMapper(mappers[m]));
}

Q.all(mapperDfds)
    .then(function () {
        console.log('mappers complete', data);
    });
