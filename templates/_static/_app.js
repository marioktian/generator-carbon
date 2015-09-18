'use strict';
 
angular.module('<%= name %>', [
    'ngRoute',
    '<%= name %>.home',
    '<%= name %>.about'
]).

config(['$routeProvider', function($routeProvider) {

    $routeProvider.otherwise({
        redirectTo: '/'
    });
}])

.controller('MainCtrl', function(){

});