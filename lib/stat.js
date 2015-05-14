var fs = require('fs');
var _ = require('lodash')
var util = require('util');
var file_names = require('./maps/files');
var command_names = require('./maps/commands');
var root = require('./root').get() + '/';

function mangleCommandNames() {
    for(var command in command_names) {
        mangledname = command_names[command].replace(RegExp("^/(usr/|)(bin|sbin)/", "g"), "");
        mangledname = mangledname.replace(RegExp("[^\\w\\-\\.\\/]+", "g"), "_");
        mangledname = mangledname.replace(RegExp("/", "g"), ".");
        mangledname = mangledname.replace(RegExp("(\\s*|-*|_*)+$"), "");
        mangledname = mangledname.substr(0, 255);
        command_names[command] = 'insights_commands/' + mangledname;
    }
}

function FindFiles(file_names) {
    function statFile (file) {
        try {
            var stats = fs.statSync(root + file);
            if (stats) {
                file_names[file_name] = root + file;
                return true;
            }
        } catch (e) {
            //File does not exist
            return false;
        }
    }

    for (var file_name in file_names) {
        if (util.isArray(file_names[file_name])) {
            _.some(file_names[file_name], function (file, index) {
                var rc = statFile(file);
                if (rc) {
                    return rc;
                }
                if (file_names[file_name].length -1 === index) {
                    file_names[file_name] = null;
                }
            });
        } else {
            if (!statFile(file_names[file_name])) {
                file_names[file_name] = null;
            }
        }
    }
    return file_names;
}

mangleCommandNames();
module.exports = FindFiles(_.merge({}, file_names, command_names));
