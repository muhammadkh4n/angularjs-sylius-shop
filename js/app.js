(function(){
  "use strict";

  angular.module('aha', ['ui.router', 'uiCropper'])
    .run(Runtime);

  Runtime.$inject = ['$state', '$rootScope', 'Auth'];
  function Runtime($state, $rootScope, Auth) {
    $rootScope.$state = $state;
    $rootScope.locale = 'en_US';
    $rootScope.channel = 'US_WEB';
  }
})();
