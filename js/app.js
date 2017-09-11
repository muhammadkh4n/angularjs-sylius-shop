(function(){
  "use strict";

  angular.module('aha', ['ui.router'])
    .run(Runtime);

  Runtime.$inject = ['$state', '$rootScope'];
  function Runtime($state, $rootScope) {
    $rootScope.$state = $state;
  }
})();
