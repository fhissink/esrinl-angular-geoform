(function (angular) {
    "use strict";

    angular.module("GeoFormApp", ['esri.map'])
      .controller("GeoFormCtrl", function ($scope) {
          $scope.message = "Hello from controller";
      })
      .controller('FeatureLayerCtrl', function (esriLoader) {
          var self = this;
          esriLoader.require(['esri/Map', 'esri/layers/FeatureLayer', 'dojo/domReady!'], function (Map, FeatureLayer) {
              var sampleLayer = new FeatureLayer({
                  url: "http://services.arcgis.com/emS4w7iyWEQiulAb/arcgis/rest/services/EsriNL_GeoForm/FeatureServer/0"
              });

              self.map = new Map({
                  basemap: 'streets',
                  layers: [sampleLayer]
              });


          });
      });

})(angular);
