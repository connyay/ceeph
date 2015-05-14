'use strict';

var VULNERABLE_BASH_DETECTED = require('./_Rule')('VULNERABLE_BASH_DETECTED');

var BAD_PACKAGES_SET = [
    'bash-3.0-19.7.el4_7.1',
    'bash-3.0-21.el4',
    'bash-3.0-21.el4_8.1',
    'bash-3.0-21.el4_8.2',
    'bash-3.0-23.el4',
    'bash-3.0-24.el4',
    'bash-3.0-25.el4',
    'bash-3.0-26.el4',
    'bash-3.0-27.el4.2',
    'bash-3.0-27.el4.3',
    'bash-3.2-19.el5',
    'bash-3.2-20.el5',
    'bash-3.2-21.el5',
    'bash-3.2-22.el5',
    'bash-3.2-23.el5',
    'bash-3.2-24.1.el',
    'bash-3.2-24.1.el5sjis',
    'bash-3.2-24.2.el5sjis',
    'bash-3.2-24.el5',
    'bash-3.2-24.el5_6.1',
    'bash-3.2-25.el5',
    'bash-3.2-26.el5',
    'bash-3.2-27.el5',
    'bash-3.2-28.el5',
    'bash-3.2-29.el5',
    'bash-3.2-30.el5',
    'bash-3.2-31.el5',
    'bash-3.2-32.el5',
    'bash-3.2-32.el5_9.1',
    'bash-3.2-32.el5_9.1.sjis.1',
    'bash-3.2-32.el5_9.2',
    'bash-3.2-32.el5.sjis.1',
    'bash-3.2-33.el5',
    'bash-3.2-33.el5.1',
    'bash-3.2-33.el5_11.1.sjis.1',
    'bash-3.2-33.el5_11.3',
    'bash-4.0.28-1.el6',
    'bash-4.0.33-1.el6',
    'bash-4.0.35-2.el6',
    'bash-4.0.35-3.el6',
    'bash-4.1.2-12.el6',
    'bash-4.1.2-13.el6',
    'bash-4.1.2-14.el6',
    'bash-4.1.2-14.el6_4.sjis.1',
    'bash-4.1.2-15.el6_4',
    'bash-4.1.2-15.el6_4.1',
    'bash-4.1.2-15.el6_4.1.sjis.1',
    'bash-4.1.2-15.el6_4.sjis.1',
    'bash-4.1.2-15.el6_5.1',
    'bash-4.1.2-15.el6_5.1.sjis.1',
    'bash-4.1.2-22.el6',
    'bash-4.1.2-24.el6',
    'bash-4.1.2-25.el6',
    'bash-4.1.2-26.el6',
    'bash-4.1.2-27.el6',
    'bash-4.1.2-28.el6',
    'bash-4.1.2-2.el6',
    'bash-4.1.2-3.el6',
    'bash-4.1.2-5.el6',
    'bash-4.1.2-6.el6',
    'bash-4.1.2-7.el6',
    'bash-4.1.2-8.el6',
    'bash-4.1.2-8.el6.sjis.1',
    'bash-4.1.2-9.el6',
    'bash-4.1.2-9.el6_2',
    'bash-4.1.2-9.el6_2.1',
    'bash-4.1.2-9.el6_2.sjis.1',
    'bash-4.2.10-4.el7',
    'bash-4.2.24-1.el7',
    'bash-4.2.24-2.el7',
    'bash-4.2.28-1.el7',
    'bash-4.2.36-2.el7',
    'bash-4.2.37-3.el7',
    'bash-4.2.37-6.el7',
    'bash-4.2.39-1.el7',
    'bash-4.2.39-2.el7',
    'bash-4.2.39-3.el7',
    'bash-4.2.42-1.el7',
    'bash-4.2.42-2.el7',
    'bash-4.2.42-3.el7',
    'bash-4.2.45-1.el7',
    'bash-4.2.45-1.el7.sjis.1',
    'bash-4.2.45-2.el7',
    'bash-4.2.45-2.el7.sjis.1',
    'bash-4.2.45-3.el7',
    'bash-4.2.45-4.el7',
    'bash-4.2.45-5.el7',
    'bash-4.2.45-5.el7_0.1',
    'bash-4.2.45-5.el7_0.2',
    'bash-4.2.46-10.el7',
    'bash-4.2.46-4.el7',
    'bash-4.2.46-7.el7',
    'bash-4.2.46-8.el7',
    'bash-4.2.46-9.el7'
];

VULNERABLE_BASH_DETECTED.addMapper({
    file: 'installed-rpms'
}, function (context) {
    var _ = this.utils._;
    var response = null;
    _.forEach(context.content, function (line) {
        if (_.startsWith(line, 'bash')) {
            var package_no_arch;
            try {
                package_no_arch = line.split()[0].rsplit('.', 1)[0];
            } catch (e) {
                return;
            }
            if (_.includes(BAD_PACKAGES_SET, package_no_arch)) {
                response = this.makeResponse({
                    'package': line.split()[0]
                });
                return false;
            }
        }
    }, this);
    return response;
});

VULNERABLE_BASH_DETECTED.addReducer(function (data) {
    console.log('lolwut', data);
});

module.exports = VULNERABLE_BASH_DETECTED;
