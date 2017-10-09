(function(){
  'use strict';

  angular.module('aha')
    .service('Search', SearchService);

  SearchService.$inject = ['$http', 'Auth',  'APP_CONFIG', '$rootScope'];
  function SearchService($http, Auth, C, $rootScope) {
    var self = this;
    var lang = JSON.parse(localStorage.lang);
    
    var setHeaders = function () {
      self.headers = {
        'Content-Type': undefined
      };
    };

    self.searchByImage = function(data) {
      setHeaders();
      var base64 = data.replace(/data:image\/.*;base64,/, '');
      var binary = window.atob(base64);
      var buffer = new ArrayBuffer(binary.length);
      var array = new Uint8Array(buffer);
      
      for (var i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
      }

      var b = new Blob([array], {type: 'application/octet-stream'});
      
      return $http.post(C.apiUrl+'/shop-api/search/upload?uploadType=simple&channel='+lang.ch, b, {
        headers: self.headers
      });
    };

    self.getProductsByImage = function(imageId, page, limit) {
      setHeaders();
      return $http.get(C.apiUrl+'/shop-api/search/by-image/'+imageId+'?channel='+lang.ch+'&page='+page+'&limit='+limit, {headers: self.headers});
    }

    return self;
  }
})();
