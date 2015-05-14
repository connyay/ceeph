'use strict';

var CVE_2014_0004 = require('./_Rule')('DETECTED_CVE-2014-0004');

var VULNERABLE_UDISKS_VERSIONS = [
    'udisks-1.0.1-4.el6',
    'udisks-1.0.1-2.el6'
];

CVE_2014_0004.addMapper({
    file: 'installed-rpms'
}, function (context) {
    var _ = this.utils._;
    var response = null;
    _.forEach(context.content, function (line) {
        if (_.startsWith(line, 'udisks')) {
            var pkg = this.utils.get_package_nvr(line);
            if (_.includes(VULNERABLE_UDISKS_VERSIONS, pkg)) {
                response = this.makeResponse({
                    bad_version: pkg
                });
                return false;
            }
        }
    }, this);
    return response;
});

CVE_2014_0004.addReducer(function (data) {
    console.log('lolwut', data);
});

module.exports = CVE_2014_0004;
