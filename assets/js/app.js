/* global angular */
var app = angular.module('peekApp', []);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
}]);

app.controller('feedController', function($scope, $location, $http) {
  $scope.debugMode = false;

  $scope.logMsg = function(input) {
    'use strict';

    if ($scope.debugMode) {

      if (angular.isObject(input) || angular.isArray(input)) {
        angular.forEach(input, function(message) {
          console.log(message);
        });
      } else {
        console.log(input);
      }
    }
  }; // end: $scope.logMsg


  $scope.getFeed = function(feedUrl) {
    'use strict';

    $scope.logMsg('[DEBUG] called getFeed');

    if (!angular.isUndefined(($location.search()).feedUrl)) {
      $scope.logMsg('[DEBUG] feedUrl is:' + feedUrl);

      $http.get(($location.search()).feedUrl)
        .success(function(data, status, headers, config) {
          void data;
          void status;
          void headers;
          void config;

          $scope.logMsg('[DEBUG] HTTP Code is: ' + status);
          $scope.logMsg([data, status, headers, config]);

          // expose remote data to frontend
          $scope.feedData = data;
        })
        .error(function(data, status, headers, config) {
          void data;
          void status;
          void headers;
          void config;

          // reset 'fetch' button to default state
          $scope.logMsg('error getting data');
        });

    } else {
      $scope.logMsg('unhandled error occurred');
    }

  }; // end: $scope.getFeed


});