(function(){
  'use strict';

  angular.module('aha')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', 'Auth', '$state', '$rootScope', '$location', 'Product'];
  function HeaderController($scope, Auth, $state, $rootScope, $location, Product) {
    var ctrl = this;
    ctrl.logout = logout;
    ctrl.user = null;
    ctrl.categories = null;

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
        .then(function(res) {
          ctrl.user = res.data;
          console.log(res.data);
        })
        .catch(function(err) {
          if (err.data && err.data.code === 401) {
            Auth.logout();
            $state.go('login');
          }
        });
    }

    function getCategories() {
      Product.getTaxon('category')
        .then(function(res) {
          console.log(res.data);
          ctrl.categories = res.data.self.children;
        })
        .catch(function(err) {
          console.log(err.data);
        });
    }

  }
})();
