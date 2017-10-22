(function(){
  'use strict';

  angular.module('aha')
    .service('Recommend', RecommendService);

  RecommendService.$inject = ['$http', 'Auth', 'APP_CONFIG'];
  function RecommendService($http, Auth, CONFIG) {
    var service = this;
    this.headers = {};
    var lang = JSON.parse(localStorage.lang);

    var setHeaders = function () {
      service.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+Auth.getToken()
      };
    };

    service.getUserRecommended = function () {
      setHeaders();
      return $http.get(CONFIG.apiUrl+
                       '/shop-api/account/recommendations?channel='+
                       lang.ch+'&locale='+lang.loc, {headers: this.headers});
    };

    service.getRecommended = function () {
      return $http.get(CONFIG.apiUrl+'/shop-api/recommendations?channel='+
                       lang.ch+'&locale='+lang.loc);
    };

    return service;
  }
})();
