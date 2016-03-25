(function (angular) {
    "use strict";

    angular.module("GeoFormApp", ['esri.map'])
      .controller('FeatureLayerCtrl', function ($scope, esriLoader) {
          $scope.onMapLoad = function (map) {
              esriLoader.require(['esri/geometry/Extent',
                  'esri/layers/FeatureLayer',
                  'dojo/_base/array',
                  'dojo/on'],
                  function (Extent,
                      FeatureLayer,
                      array,
                      on) {
                      var layer = new FeatureLayer("http://services.arcgis.com/emS4w7iyWEQiulAb/arcgis/rest/services/EsriNL_GeoForm/FeatureServer/0", {
                          outFields: ["*"]
                      });
                      layer.on('load', function (loadedLayer) {
                          var fields = array.map(layer.fields, function (field) {
                              if (field.name !== 'OBJECTID') {
                                  return {
                                      fieldName: field.name,
                                      fieldAlias: field.alias
                                  };
                              }
                          });
                          fields = array.filter(fields, function (field) { return field !== undefined; });
                          console.log(fields);

                          $scope.$apply(function () {
                              $scope.fields = fields;
                          });
                      });

                      map.addLayer(layer);
                  });
          };
      });
})(angular);
