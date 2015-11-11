var _ = require('lodash');
var geocoder = require('geocoder');
var async = require('async');
var reducedTrees = require('../data/trees.reduced.json');
var helpers = require('./helpers');

getAndWriteGeocodesToFile(reducedTrees);


function getAndWriteGeocodesToFile(trees){

  async.mapSeries(
      trees,
      geocodeAsync,
      function(err, geocodeResults){
        var fullGeosByTreeUID;

        if(!_.isEmpty(err)){
          helpers.writeToJSON('geocoding.errors', err);
        }
        if(!_.isEmpty(geocodeResults)){
          fullGeosByTreeUID = _.zipObject(_.pluck(trees, 'ID Main Table'), geocodeResults);

          _.each(trees, _.partial(setLatLngOnTree, geocodeResults));

          helpers.writeToJSON('geocode.results', fullGeosByTreeUID);
          helpers.writeToJSON('trees.reduced.geocoded', trees);
        }

      }
    )
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


function geocodeAsync(tree, callback){
  return _.delay(getGeocodeAsync, 200);

  function getGeocodeAsync(){
    var address = getAddress(tree);
    geocoder.geocode(address, function(err, data){
      if (err) {
        callback(err);
      } else {
        callback(null, formatGeocodeResult(data, address));
      }
    });
  }
}

function formatGeocodeResult(result, query){
  return _.extend({}, result, {query: query});
}

function getAddress(tree){
  return _(tree).pick('Street Number', 'Street', 'City', 'State', 'Zip').values().value().join(' ').trim();
}