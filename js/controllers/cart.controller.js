(function(){
  'use strict';

  angular.module('aha')
    .controller('CartController', CartController);

  CartController.$inject = ['Cart', '$rootScope', '$scope', '$stateParams'];
  function CartController(Cart, $rootScope, $scope, $stateParams) {
    var ctrl = this;
    ctrl.decQuantity = decQuantity;
    ctrl.incQuantity = incQuantity;
    ctrl.updateCartItems = updateCartItems;
    ctrl.deleteCartItem = deleteCartItem;
    ctrl.quantities = [];
    
    activate();
    return;
    ///////////////////////////////

    function activate() {
      getCartItems();
    }

    function decQuantity(index) {
      if (ctrl.quantities[index].quantity <= 1) return;
      ctrl.quantities[index].quantity--;
    }

    function incQuantity(index) {
      ctrl.quantities[index].quantity++;
    }

    function deleteCartItem(itemId) {
      Cart.deleteCartItem(itemId)
        .then(function(res) {
          var items = Cart.cart.items;
          for (var i = 0; i < items.length; i++) {
            if (items[i].id === itemId) {
              items.splice(i, 1);
              break;
            }
          }
          console.log(res.data);
        })
        .catch(function(err){
          console.log(err.data);
        });
    }


    function updateCartItems() {
      Cart.updateCartItems(ctrl.quantities)
        .then(function(res){
          console.log(res);
        })
        .catch(function(err){
          console.log(err);
        });
    }

    function getCartItems() {
      $rootScope.$broadcast('loading-start');
      Cart.getCartItems(Cart.getCartToken())
        .then(function(res){
          loadQuantities(res.data.items);
          $scope.cart = res.data;
          $rootScope.$broadcast('loading-end');
        })
        .catch(function(err){
          console.log("CART ERROR", err);
          $rootScope.$broadcast('loading-end');
        });
    }

    function loadQuantities(items) {
      angular.forEach(items, function(value){
        ctrl.quantities.push({
          id: value.id,
          quantity: value.quantity
        });
      });
    }
  }
})();
