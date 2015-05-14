'use strict';

var CVE_2014_0006 = require('./_Rule')('DETECTED_CVE_2014_0006');

var VULNERABLE_SWIFT_VERSIONS = [
    'openstack-swift-1.10.0-2.el6ost', // OpenStack 4
    'openstack-swift-1.8.0-7.el6ost', // OpenStack 3 ...
    'openstack-swift-1.8.0-6.el6ost',
    'openstack-swift-1.8.0-3.el6ost',
    'openstack-swift-1.8.0-2.el6ost'
];

CVE_2014_0006.addMapper({
    file: 'installed-rpms'
}, function (context) {
    var _ = this.utils._;
    var response = null;
    _.forEach(context.content, function (line) {
        if (_.startsWith(line, 'openstack-swift')) {
            var pkg = this.utils.get_package_nvr(line);
            if (_.includes(VULNERABLE_SWIFT_VERSIONS, pkg)) {
                response = this.makeResponse({
                    rpm: pkg
                });
                return false;
            }
        }
    }, this);
    return response;
});

CVE_2014_0006.addReducer(function (data) {
    console.log('lolwut', data);
});

module.exports = CVE_2014_0006;
