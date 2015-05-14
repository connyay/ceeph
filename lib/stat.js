var fs = require('fs');
var _ = require('lodash')
var util = require('util');

function FindFiles(file_names) {
    function statFile (file) {
        console.log("Trying to stat: " + file);
        try {
            var stats = fs.statSync(file);
            if (stats) {
                console.log("overriding");
                console.log(stats);
                file_names[file_name] = file;
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
                statFile(file);
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

module.exports = function (file_names) {
    return new FindFiles(file_names);
}