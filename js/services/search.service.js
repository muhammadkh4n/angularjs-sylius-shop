(function(){
  'use strict';

  angular.module('aha')
    .service('Search', SearchService);

  SearchService.$inject = ['$http', 'Auth',  'APP_CONFIG'];
  function SearchService($http, Auth, C) {
    var self = this;
    
    var setHeaders = function () {
      self.headers = {
        'Content-Type': undefined,
        'Authorization': 'Bearer SampleToken'
      };
    };

    self.searchByImage = function(data) {
      setHeaders();
      var base64 = data.replace('data:image/png;base64,', '');
      var binary = window.atob(base64);
      var buffer = new ArrayBuffer(binary.length);
      var array = new Uint8Array(buffer);

      for (var i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
      }

      var b = new Blob([array], {type: 'application/octet-stream'});
      
      return $http.post(C.apiUrl+'/api/v1/search/upload?uploadType=simple', b, {
        headers: self.headers
      });
    };

    return self;
  }
})();
