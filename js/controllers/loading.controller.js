(function(){
  'use strict';

  angular.module('aha')
    .controller('LoadingController', LoadingController);

  LoadingController.$inject = ['$rootScope', '$window'];
  function LoadingController($rootScope, $window) {
    $rootScope.$on('loading-start', function(event) {
      $('.loader-mask').show().find('.loader').show();
    });
    $rootScope.$on('loading-end', function(event) {
      $('.loader-mask').hide().find('.loader').hide();
      $window.scrollTo(0,0);
    });
  }
})();
