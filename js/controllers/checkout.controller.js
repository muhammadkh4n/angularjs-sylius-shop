(function(){
  'use strict';

  angular.module('aha')
    .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['$rootScope', '$scope', 'Auth', 'Checkout'];
  function CheckoutController($rootScope, $scope, Auth, Checkout) {
    var ctrl = this;
    ctrl.updateCheckoutState = updateCheckoutState;
    
    activate();
    return;

    function activate() {
      $rootScope.$broadcast('loading-start');
      getCheckout();
      getPayments();
      getShippings();
      $scope.payment = null;
    }

    function placeOrder() {
      
    }

    function getCheckout(isNew) {
      Checkout.getCheckoutFromService(isNew, function(err, checkout){
        $rootScope.$broadcast('loading-end');
        if (err) {
          console.log("CHECKOUT ERROR", err);
        } else {
          ctrl.checkout = checkout;
          if (checkout.billingAddress) {
            $scope.billing = checkout.billingAddress;
            $scope.shipping = checkout.shippingAddress;
          } else {
            $scope.shipping = {};
            $scope.billing = Auth.getUser();
          }
          console.log("CHECKOUT", checkout);
        }
      });
    }

    function getShippings() {
      Checkout.getShippings()
        .then(function(res){
          ctrl.shippings = res.data.shipments;
          console.log("SHIPPINGS", res.data);
        })
        .catch(function(err){
          console.log("SHIP ERROR", err.data);
        });
    }
    
    function getPayments() {
      Checkout.getPayments()
        .then(function(res){
          ctrl.payments = res.data.payments[0].methods;
          console.log("PAYMENTS", res.data);
        })
        .catch(function(err){
          console.log("PAYMENT ERROR", err.data);
        })
    }

    function updateCheckoutState() {
      if (!$scope.shippingDifferent) {
        $scope.shipping = $scope.billing;
      }
      var address = {
        shippingAddress: $scope.shipping,
        billingAddress: $scope.billing
      };
      if (ctrl.checkoutForm.$valid) {
        Checkout.updateCheckoutState(address)
          .then(function(res){
            $scope.msg = "Address Set Successfully";
            getCheckout(true);
            console.log("CHECKOUT", res);
          })
          .catch(function(err){
            $scope.error = "Address Setting Error";
            console.log("CHECKOUT ERROR", err);
          });
      }
    }
  }
})();
