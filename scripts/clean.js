var _ = require('lodash');
var treeData = require('../data/trees.json');
var helpers = require('./helpers');

var wantedColumns = ['ID Main Table', 'ID Site Name', 'Tree Planted Qty', 'Tree Species Breakdown', 'Tree Size', 'Street Number', 'Street', 'City', 'State', 'Zip']

var cleanedTrees = _.map(treeData, cleaner);

helpers.writeToJSON('trees.reduced', cleanedTrees);

function cleaner(tree){
  return _.pick(tree, wantedColumns);
}
