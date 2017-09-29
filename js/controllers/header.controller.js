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
    ctrl.deleteCartItem = deleteCartItem;
    ctrl.selectFile = selectFile;
    ctrl.fileSelected = fileSelected;
    ctrl.setLanguage = setLanguage;

    ctrl.loggedIn = function() {
      return Auth.loggedIn();
    };

    $scope.$on('login-success', function (event) {
      getProfile();
    });

    $scope.$on('added-to-cart', function (event) {
      ctrl.cart = Cart.cart;
    });

    activate();
    return;
    ////////////////////////////////

    function activate() {
      getCategories();
      ctrl.show = false;
      ctrl.lang = 'EN';
    }
    
    function logout() {
      Auth.logout();
      $state.go('login');
    }

    function setLanguage(lang) {
      if (lang === 'EN') {
        $rootScope.channel = "US_WEB";
        $rootScope.locale = "en_US";
        ctrl.lang = 'EN';
      } else {
        $rootScope.channel = "CN_WEB";
        $rootScope.locale = "zh_CN";
        ctrl.lang = 'CN';
      }
      getCategories();
      $state.reload();
    }

    function getProfile() {
      Auth.getProfile()
        .then(function(resp) {
          ctrl.user = resp.data;
          Auth.storeUser(resp.data);
          getCartItems(ctrl.user.email);
          console.log(resp.data);
        })
        .catch(function(err) {
          console.log(err.data);
        });
    }

    function refreshToken() {
      Auth.refreshToken()
        .then(function(res){
          Auth.storeAuth(res.data);
          getProfile();
        })
        .catch(function(err){
          console.log(err.data);
        })
    }

    function getCategories() {
      Product.getCategories(function(categories) {
        ctrl.categories = categories;
      });
    }

    function selectFile() {
      $("#file").click();
    }

    function fileSelected(file) {
      if (!file) {
        return;
      }
      console.log(file);
      ctrl.file = file;
      ctrl.show = true;
    }

    function getCartItems(token) {
      Cart.getCart(token, function(err, cart){
        if (err) {
          console.log("CART ERROR", err);
          return;
        }
        console.log("CART", cart);
        ctrl.cart = Cart.cart;
      });
    }

    function deleteCartItem(itemId) {
      Cart.deleteCartItem(itemId)
        .then(function(res) {
          console.log(Cart.cart.items);
          var items = Cart.cart.items;
          var totals = Cart.cart.totals;
          for (var i = 0; i < items.length; i++) {
            if (items[i].id === itemId) {
              totals.items -= items[i].total;
              totals.total -= items[i].total;
              items.splice(i, 1);
              break;
            }
          }
          console.log("ITEM DELETED", res);
        })
        .catch(function(err){
          console.log(err);
        });
    }

  }
})();
