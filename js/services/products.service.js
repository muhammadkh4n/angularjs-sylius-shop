(function(){
  'use strict';

  angular.module('aha')
    .factory('Product', ProductService);

  ProductService.$inject = ['$http', 'Auth', 'APP_CONFIG', '$rootScope'];
  function ProductService($http, Auth, C, $rootScope) {
    var product = {};
    this.headers = {};
    product.categories = null;
    var lang = JSON.parse(localStorage.lang);

    var setHeaders = function () {
      product.headers = {
        'Content-Type': 'application/json'
      };
    };

    product.getTaxons = function () {
      setHeaders();
      return $http.get(C.apiUrl+'/shop-api/taxons?locale='+lang.loc, {headers:this.headers});
    };
    
    product.getTaxon = function (slug) {
      setHeaders();
      return $http.get(C.apiUrl+'/shop-api/taxons/'+slug+'?locale='+lang.loc, {headers: this.headers});
    };

    product.getProducts = function (slug, page, limit) {
      setHeaders();
      return $http.get(
        C.apiUrl+'/shop-api/taxon-products-by-slug/'+slug+
          '?locale='+lang.loc+'&limit='+limit+'&page='+page+'&channel='+lang.ch, {headers: this.headers}
      );
    };

    product.getSimilarProducts = function(slug, page, limit) {
      return $http.get(
        C.apiUrl+'/shop-api/search/by-product/'+slug+
          '?locale='+lang.loc+'&limit='+limit+'&page='+page+'&channel='+lang.ch, {headers: this.headers}
      );
    };

    product.getProductDetails = function (productId) {
      setHeaders();
      return $http.get(
        C.apiUrl+'/shop-api/products-by-slug/'+productId+
          '?locale='+lang.loc+'&channel='+lang.ch, {headers: this.headers}
      );
    };

    product.getProductDetailsTranslation = function (productId) {
      setHeaders();
      return $http.get(C.apiUrl+'/shop-api/products/'+productId+'/translation', {headers: this.headers});
    }

    return product;
  }
})();
