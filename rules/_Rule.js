'use strict';
var utils = require('../utils');

function Rule(ERROR_KEY) {
    this.ERROR_KEY = ERROR_KEY;
    this.mappers = [];
    this.reducers = [];
    this.utils = utils;
}

Rule.prototype.addMapper = function (args, fn) {
    var mapper = {
        rule: this,
        fn: fn
    };
    if (args.file) {
        mapper.file = args.file;
    }

    this.mappers.push(mapper);
};

Rule.prototype.addReducer = function (fn) {
    this.reducers.push(fn);
};

Rule.prototype.makeResponse = function (args) {
    var reponse = args || {};
    reponse.error_key = this.ERROR_KEY;
    return reponse;
};

module.exports = function (ERROR_KEY) {
    return new Rule(ERROR_KEY);
};
