(function(){
  'use strict';

  angular.module('aha')
    .service('Auth', AuthService);

  AuthService.$inject = ['$http', 'APP_CONFIG'];
  function AuthService($http, CONFIG) {
    var auth = this;

    this.loggedIn = function() {
      return this.getToken() ? true : false;
    };

    this.getToken = function() {
      var token = localStorage.getItem('token');
      return token;
    };

    this.registerUser = function (user) {
      var headers = {
        'Content-Type': 'application/json'
      }
      return $http.post(CONFIG.apiUrl + '/shop-api/register', user, {headers: headers});
    };

    this.loginUser = function (user) {
      var headers = {
        'Content-Type': 'application/json'
      };
      return $http.post(CONFIG.apiUrl + '/shop-api/login-check', user, {headers: headers});
    };

    this.getProfile = function () {
      var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.getToken()
      };
      return $http.get(CONFIG.apiUrl+'/shop-api/me', {headers: headers});
    }

    this.storeAuth = function (auth) {
      localStorage.setItem('token', auth.token);
      localStorage.setItem('refresh_token', auth.refresh_token);
      return this.getToken() ? true : false;
    }

    this.storeUser = function (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return localStorage.user ? true : false;
    }

    this.logout = function () {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      return true;
    }

    return auth;
    ///////////////////

  }

})();
