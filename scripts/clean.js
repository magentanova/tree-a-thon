var _ = require('lodash');
var treeData = require('../data/trees.json');
var fs = require('fs');
var path = require('path');

var wantedColumns = ['ID Main Table', 'ID Site Name', 'Tree Planted Qty', 'Tree Species Breakdown', 'Tree Size', 'Street Number', 'Street', 'City', 'State', 'Zip']

var cleanedTrees = _.map(treeData, cleaner);

fs.writeFile(path.resolve(__dirname, '../data/trees.reduced.json'), JSON.stringify(cleanedTrees));

function cleaner(tree){
  return _.pick(tree, wantedColumns);
}
