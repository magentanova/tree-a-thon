var _ = require('lodash');
var geocoder = require('geocoder');
var reducedTrees = require('../trees.reduced.json');

var fs = require('fs');
var path = require('path');


getAndWriteGeocodesToFile(reducedTrees);


function getAndWriteGeocodesToFile(trees){

  var geocodePromises = getGeocodePromises(trees);

  Promise
    .all(geocodePromises)
    .then(function(geocodeResults){
      var fullGeosByTreeUID = _.zipObject(_.pluck(trees, 'ID Main Table'), geocodeResults);

      _.each(trees, _.partial(setLatLngOnTree, geocodeResults));

      writeToJSON('geocode.results', fullGeosByTreeUID);
      writeToJSON('trees.reduced.geocoded', trees);

    })
    .catch(function(geocodeErrors){
      writeToJSON('geocoding.errors', geocodeErrors);
    });
}

function writeToJSON(filename, data){
  fs.writeFile(path.resolve(__dirname, '../data/' + filename + '.json'), JSON.stringify(data));
}

function setLatLngOnTree(datas, tree, index){

  if(_.isUndefined(datas[index]) ||
    _.isUndefined(datas[index].results) ||
    _.isUndefined(datas[index].results[0]) ||
    _.isUndefined(datas[index].results[0].geometry) ||
    _.isUndefined(datas[index].results[0].geometry.location)
  ){
    return;
  }

  tree.lat = datas[index].results[0].geometry.location.lat;
  tree.lng = datas[index].results[0].geometry.location.lng;
}

function getGeocodePromises(trees){
  return _.map(trees, function( tree ){
    return geocodePromise( getAddress( tree ) );
  });
}


function geocodePromise(address){
  return new Promise(function(resolve, reject){

    geocoder.geocode(address, function(err, data){
      if (err) {
        reject(formatGeocodeResult(err, address));

      } else if (!_.isEmpty(data.error_message) || data.status !== "OK"){
        reject(formatGeocodeResult(data, address));

      } else {
        resolve(formatGeocodeResult(data, address));
      }
    });
  });
}

function formatGeocodeResult(result, query){
  return _.extend({}, result, {query: query});
}

function getAddress(tree){
  return _(tree).pick('Street Number', 'Street', 'City', 'State', 'Zip').values().value().join(' ');
}