(function(){
  'use strict';

  angular.module('aha')
    .factory('Product', ProductService);

  ProductService.$inject = ['$http', 'Auth', 'APP_CONFIG', '$rootScope'];
  function ProductService($http, Auth, C, $rootScope) {
    var product = {};
    this.headers = {};

    var setHeaders = function () {
      product.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+Auth.getToken()
      };
    };

    product.getTaxons = function () {
      setHeaders();
      return $http.get(C.apiUrl+'/shop-api/taxons?locale='+$rootScope.locale, {headers:this.headers});
    };
    
    product.getTaxon = function (slug) {
      setHeaders();
      return $http.get(C.apiUrl+'/shop-api/taxons/'+slug+'?locale='+$rootScope.locale, {headers: this.headers});
    };

    product.getProducts = function (slug, page, limit) {
      setHeaders();
      return $http.get(
        C.apiUrl+'/shop-api/taxon-products-by-slug/'+slug+
          '?locale='+$rootScope.locale+'&limit='+limit+'&page='+page+'&channel='+$rootScope.channel, {headers: this.headers}
      );
    };

    product.getProductDetails = function (productId) {
      setHeaders();
      return $http.get(
        C.apiUrl+'/shop-api/products-by-slug/'+productId+
          '?locale='+$rootScope.locale+'&channel='+$rootScope.channel, {headers: this.headers}
      );
    };

    return product;
  }
})();
