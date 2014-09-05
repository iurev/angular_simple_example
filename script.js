/*global angular, console, _*/
angular.module('tcsApp', [])
  .controller('tcsController', ['$scope', '$filter', '$timeout',
    function($scope, $filter, $timeout) {
      $scope.values = [
        ['первый', 'второй', 'третий', 'четвертый'],
        [23, 54, 21, 54],
        [67, 9, 56, 34],
        [23, 54, 45, 9],
        [35, 2, 56, 78]
      ];
      $scope.titles = $scope.values.shift();
      $scope.clickCoords = {};
      var sortByCol = null;

      $scope.up = function(row, col) {
        $scope.clickCoords = { row: row, col: col };

        $timeout(function() {
          var i, values = $scope.values, length = values[row].length;

          for (i = 0; i < length; i++) {
            values[row][i] += 1;
          }
          values[row][col] += 1;
        }, 100);

        $timeout(function() {
          $scope.clickCoords = {};
        }, 200);
      };

      $scope.sort = function(col) {
        var values = _.sortBy($scope.values, function(el) {
                    return el[col];
                  });

        if(col === sortByCol) {
          values.reverse();
          sortByCol = null;
        } else {
          sortByCol = col;
        }

        $scope.values = values;
      };

      $scope.mustSlideUp = function(row, col) {
        return ($scope.clickCoords.row === row);
      };

      $scope.mustIncreaseFont = function(row, col) {
        return (($scope.clickCoords.row === row) && ($scope.clickCoords.col === col));
      };
    }
  ]);
