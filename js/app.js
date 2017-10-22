(function(){
  "use strict";

  angular.module('aha', ['ui.router', 'uiCropper', 'ngFileUpload', 'ngSanitize'])
    .run(Runtime);

  Runtime.$inject = ['$state', '$rootScope', 'Auth', '$trace', '$transitions'];
  function Runtime($state, $rootScope, Auth, $trace, $transitions) {
    $rootScope.$state = $state;
    $trace.enable('TRANSITION');

    if (!localStorage.lang) {
      localStorage.lang = JSON.stringify({ch:'US_WEB', loc: 'en_US', lang: 'EN'});
    }
    
    $transitions.onError({}, function(trans) {
      $rootScope.$broadcast('loading-end');
    });

    $transitions.onFinish({}, function(trans) {
      $rootScope.$broadcast('loading-end');
    });
  }
})();
