(function(){
  "use strict";

  angular.module('aha', ['ui.router', 'uiCropper', 'ngFileUpload'])
    .run(Runtime);

  Runtime.$inject = ['$state', '$rootScope', 'Auth', '$trace', '$transitions'];
  function Runtime($state, $rootScope, Auth, $trace, $transitions) {
    $rootScope.$state = $state;
    $rootScope.locale = 'en_US';
    $rootScope.channel = 'US_WEB';
    $trace.enable('TRANSITION');

    $transitions.onError({}, function(trans) {
      $rootScope.$broadcast('loading-end');
    });
  }
})();
