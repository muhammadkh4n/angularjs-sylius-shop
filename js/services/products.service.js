(function(){
  'use strict';

  angular.module('aha')
    .factory('Product', ProductService);

  ProductService.$inject = ['$http'];
  function ProductService($http) {
    
  }
})();
