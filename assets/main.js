(function(){
  var TreesMap = React.createClass({
    displayName: 'TreesMap',
    shouldComponentUpdate: React.addons.PureRenderMixin.shouldComponentUpdate,
    render: function() {
      return React.createElement(GoogleMapReact, {
        defaultCenter: {lat: 29.7604, lng: -95.3698},
        defaultZoom: 13
      }, this.props.children);
    }
  });

  var TreeMarker = React.createClass({
    displayName: 'TreeMarker',
    shouldComponentUpdate: React.addons.PureRenderMixin.shouldComponentUpdate,
    render: function() {
      return React.createElement('div', {className: 'tree-marker', 'data-desc': this.props.desc});
    }
  });

  var treesMap = ReactDOM.render(
    React.createElement(TreesMap),
    document.getElementById('map')
  );
  getTrees();

  function getTrees(){

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "./data/trees.reduced.geocoded.json");
    oReq.send();

    function reqListener () {
      var trees = _.map(JSON.parse(this.responseText), function(tree){
        var props = _.pick(tree, 'lat', 'lng');

        if(_.isEmpty(props)){
          return null;
        } else {
          if(tree['Tree Species Breakdown'].trim().length){
            props.desc = tree['Tree Species Breakdown']            
          }
          return React.createElement(TreeMarker, props);
        }

      });

      treesMap.setProps({children: _.compact(trees)});
    }
  }


}());