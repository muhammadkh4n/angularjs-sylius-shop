(function(){
  'use strict';

  angular.module('aha')
    .service('Checkout', CheckoutService);

  CheckoutService.$inject = ['$http', 'Cart', 'Auth', 'APP_CONFIG'];
  function CheckoutService($http, Cart, Auth, C) {
    var self = this;

    var setHeaders = function () {
      self.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+Auth.getToken()
      };
    };
    
    self.getCheckout = function() {
      setHeaders();
      return $http.get(C.apiUrl+'/shop-api/checkout/'+Cart.getCartToken(), {headers: self.headers});
    };
  }
})();
