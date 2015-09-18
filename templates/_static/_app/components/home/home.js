'use strict';
 
angular.module('<%= name %>.home', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/components/home/home.html',
        controller: 'HomeCtrl'
    });
}])
 
.controller('HomeCtrl', function($scope, $http) {

});
