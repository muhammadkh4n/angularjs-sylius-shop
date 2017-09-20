(function(){
  'use strict';

  angular.module('aha')
    .factory('SessionRecovery', SessionRecoveryFactory);

  SessionRecoveryFactory.$inject = ['$q', '$injector'];
  function SessionRecoveryFactory($q, $injector) {
    var recover = {
      responseError: function (res) {
        if (res.status == 401) {
          var Auth = $injector.get('Auth');
          var $http = $injector.get('$http');
          var $state = $injector.get('$state');
          var $rootScope = $injector.get('$rootScope');
          var deferred = $q.defer();

          if (Auth.rememberUser()) {
            Auth.refreshToken().then(deferred.resolve, deferred.reject);
            return deferred.promise.then(function(resp) {
              Auth.storeAuth(resp.data);
              res.config.headers = {
                'Authorization': 'Bearer '+Auth.getToken()
              };
              return $http(res.config);
            });
          } else {
            Auth.logout();
            $state.go('login');
            $rootScope.$broadcast('loading-end');
          }
        }
        return $q.reject(res);
      }
    };
    return recover;
  }

  angular.module('aha')
    .config(Config);

  Config.$inject = ['$httpProvider'];
  function Config($httpProvider) {
    $httpProvider.interceptors.push('SessionRecovery');
  }
})();
