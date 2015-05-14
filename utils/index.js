'use strict';
var _ = require('lodash');

// Extending the prototype? Thats a chop
String.prototype.rsplit = function (sep, maxsplit) {
    var split = this.split(sep);
    return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split;
};

exports._ = _;
exports.get_package_nvr = function (installed_rpms_line) {
    return installed_rpms_line.split()[0].rsplit('.', 1)[0];
};
