(function(){
  'use strict';

  angular.module('aha')
    .factory('RedirectInterceptor', RedirectInterceptor);

  RedirectInterceptor.$inject = ['$q', '$injector'];
  function RedirectInterceptor($q, $injector) {
    return {
      responseError: function (response) {
        console.log(response);
        if (response.status == 302) {
          var url = response.headers['Location'].match(/\d+$/);
          console.log(url);
          if (url && url[0]) {
            response.status = 200;
            response.headers['Location'] = undefined;
            response.data = {
              imageId: parseInt(url[0])
            };
            return $q.resolve(response);
          }
        }
        return response;
      }
    };
  }

  angular.module('aha')
    .config(Config);

  Config.$inject = ['$httpProvider'];
  function Config($httpProvider) {
    $httpProvider.interceptors.push('RedirectInterceptor');
  }
})();
