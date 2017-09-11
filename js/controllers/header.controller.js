(function(){
  'use strict';

  angular.module('aha')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', 'Auth', '$state'];
  function HeaderController($scope, Auth, $state) {
    var ctrl = this;
    ctrl.logout = logout;
    ctrl.user = null;

    ctrl.loggedIn = function() {
      return Auth.loggedIn();
    };

    activate();
    return;
    ////////////////////////////////

    function activate() {
      Auth.getProfile()
        .then(function(res) {
          ctrl.user = res.data;
          console.log(res.data);
        })
        .catch(function(err) {
          console.log(err.data);
        });
    }
    
    function logout() {
      if (Auth.logout()) {
        $state.go('login');
        console.log("Logged OUT");
      }
    }

    function getProfile() {
      Auth.getProfile()
        
    }
  }
})();
