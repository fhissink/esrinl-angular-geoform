(function(angular) {
  "use strict";

  angular.module("GeoFormApp", ['esri.map'])
    // .controller("GeoFormCtrl", function($scope) {
    //   $scope.message = "Hello from controller";
    // })
    .controller('FeatureLayerCtrl', function(esriLoader) {
      var self = this;
      esriLoader.require(['esri/Map'], function(Map) {
        self.map = new Map({
          basemap: 'streets'
        });
      });
    });

})(angular);
