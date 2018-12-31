var ramalMain = angular
    .module('mainApp');

ramalMain.controller('RamalController', function ($scope, $http) {
   console.log("ENTREI AQUI");
   $scope.ButtonNameModal = function (pessoa) {
       console.log(pessoa);
   } 
});