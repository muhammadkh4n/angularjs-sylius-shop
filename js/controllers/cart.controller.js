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
          var totals = Cart.cart.totals;
          for (var i = 0; i < items.length; i++) {
            if (items[i].id === itemId) {
              totals.items -= items[i].total;
              totals.total -= items[i].total;
              items.splice(i, 1);
              break;
            }
          }
          $scope.cart = Cart.cart;
        })
        .catch(function(err){
          console.log("DELETE ERROR", err.data);
        });
    }


    function updateCartItems() {
      Cart.updateCartItems(ctrl.quantities)
        .then(function(res){
          Cart.cart = res[0].data
          $scope.cart = Cart.cart;
          $rootScope.$broadcast('added-to-cart');
        })
        .catch(function(err){
          console.log(err);
        });
    }

    function getCartItems() {
      $rootScope.$broadcast('loading-start');
      Cart.getCart(Cart.getCartToken(), function (err, cart) {
        if (err) {
          console.log("CART ERROR", err);
          return;
        }
        loadQuantities(cart.items);
        $scope.cart = Cart.cart;
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
