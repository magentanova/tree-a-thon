var fs = require('fs');
var path = require('path');
var helpers = {
  writeToJSON: writeToJSON
};

function writeToJSON(filename, data){
  fs.writeFile(path.resolve(__dirname, '../data/' + filename + '.json'), JSON.stringify(data));
}

module.exports = helpers;
