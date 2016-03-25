(function (angular) {
    "use strict";

    angular.module("GeoFormApp", ['esri.map'])
      .controller('FeatureLayerCtrl', function ($scope, esriLoader) {
          var draw;
          var geometry = {};


          $scope.attributes = {};
          $scope.invalidForm = false;

          $scope.onMapLoad = function (map) {
              esriLoader.require(['esri/geometry/Extent',
                  'esri/layers/FeatureLayer',
                  'esri/graphic',
                  'esri/toolbars/draw',
                  'esri/symbols/SimpleFillSymbol',
                  'esri/symbols/SimpleLineSymbol',
                  'esri/Color',
                  'dojo/_base/array',
                  'dojo/on'],
                  function (Extent,
                      FeatureLayer,
                      Graphic,
                      Draw,
                      SimpleFillSymbol,
                      SimpleLineSymbol,
                      Color,
                      array,
                      on) {
                      var layer = new FeatureLayer("http://services.arcgis.com/emS4w7iyWEQiulAb/arcgis/rest/services/EsriNL_GeoForm/FeatureServer/0", { outFields: ["*"] });
                      layer.on('load', function (loadedLayer) {
                          var fields = array.map(layer.fields, function (field) {
                              if (field.name !== 'OBJECTID') {
                                  return {
                                      fieldName: field.name,
                                      fieldAlias: field.alias,
                                      fieldType: field.type
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

                      draw = new Draw(map);
                      draw.on('draw-end', function (e) {
                          $scope.$apply(function () {
                              addGraphic(e);
                          });
                      });

                      $scope.addFeature = function () {
                          console.log(this.attributes);
                          $scope.invalidForm = false;
                          if (this.geoform.$invalid || !geometry) {
                              $scope.invalidForm = true;
                              return;
                          }
                          var fieldValues = {};
                          for (var name in this.attributes) {
                              fieldValues[name] = this.attributes[name];
                          }
                          var graphic = new Graphic(geometry, null, fieldValues, null);
                          var addFeatures = layer.applyEdits([graphic], null, null);
                          addFeatures.then(function () {
                              console.log('callback complete');
                              layer.refresh();
                          }, function (err) {
                              console.log(err);
                          });
                          map.graphics.clear();
                      };

                      $scope.startDrawing = function (drawMode) {
                          map.disableMapNavigation();
                          map.graphics.clear();
                          draw.activate(drawMode.toLowerCase());
                          $scope.drawingEnabled = true;
                          console.log(drawMode);
                      };

                      function addGraphic(evt) {
                          //deactivate the toolbar and clear existing graphics
                          draw.deactivate();
                          $scope.drawingEnabled = false;
                          map.enableMapNavigation();

                          var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                                new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                                new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]));

                          map.graphics.add(new Graphic(evt.geometry, symbol));
                          geometry = evt.geometry;
                      }

                  });


          };
      });
})(angular);
