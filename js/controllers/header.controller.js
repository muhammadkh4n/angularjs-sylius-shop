(function(){
  'use strict';

  angular.module('aha')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', 'Auth', '$state', '$rootScope', '$location', 'Product', 'Cart'];
  function HeaderController($scope, Auth, $state, $rootScope, $location, Product, Cart) {
    var ctrl = this;
    ctrl.logout = logout;
    ctrl.user = null;
    ctrl.categories = null;
    ctrl.cart = null;
    ctrl.productsInCart = [];

    ctrl.loggedIn = function() {
      return Auth.loggedIn();
    };

    $scope.$on('login-success', function (event) {
      activate();
    });

    activate();
    return;
    ////////////////////////////////

    function activate() {
      getProfile();
      getCategories();
    }
    
    function logout() {
      Auth.logout();
      $state.go('login');
    }

    function getProfile() {
      Auth.getProfile()
        .then(function(resp) {
          ctrl.user = resp.data;
          getCartItems(ctrl.user.email);
          console.log(resp.data);
        })
        .catch(function(err) {
          if (err.data && err.data.code === 401) {
            Auth.logout();
            $state.go('login');
          }
        });
    }

    function getProductsInCart(items) {
      for (var i = 0; i < items.length; i++) {
        Product.getProductDetails(items[i].productCode)
          .then(function(res){
            ctrl.productsInCart.push(res.data);
          })
          .catch(function(err){
            console.log(err.data);
          });
      }
    }

    function getCategories() {
      Product.getCategories(function(categories) {
        ctrl.categories = categories;
      });
    }

    function getCartItems(token) {
      Cart.getCartItems(token)
        .then(function(res){
          console.log("CART", res.data);
          Cart.storeCartToken(res.data.tokenValue);
          ctrl.cart = res.data;
          getProductsInCart(ctrl.cart.items);
        })
        .catch(function(err){
          console.log("CART ERROR", err.data);
          createCart(token);
        });
    }

    function createCart(token) {
      Cart.createCart(token)
        .then(function(res) {
          console.log("CART", res.data);
          Cart.storeCartToken(res.data.tokenValue);
          ctrl.cart = res.data;
        })
        .catch(function(err){
          console.log("CART ERROR", err.data);
        });
    }

  }
})();
