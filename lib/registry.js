'use strict';
var _ = require('lodash');

var bulk = require('bulk-require');
var rules = bulk('./', ['rules/**/!(_Rule).js']).rules;


var mappers = {},
    reducers = [];

function registerMapper(mapper) {
    if (!mappers[mapper.file]) {
        mappers[mapper.file] = {
            file: mapper.file,
            fns: []
        };
    }
    mappers[mapper.file].fns.push(mapper.fn.bind(mapper.rule));
}

for (var r in rules) {
    var rule = rules[r];
    if (rule.mappers.length) {
        _.forEach(rule.mappers, registerMapper);
    }
    if (rule.reducers.length) {
        Array.prototype.push.apply(reducers, rule.reducers);
    }
}



module.exports.mappers = mappers;
module.exports.reducers = reducers;
