(function(){
  'use strict';

  angular.module('aha')
    .controller('LoadingController', LoadingController);

  LoadingController.$inject = ['$rootScope'];
  function LoadingController($rootScope) {
    $rootScope.$on('loading-start', function(event) {
      $('.loader-mask').show().find('.loader').show();
    });
    $rootScope.$on('loading-end', function(event) {
      $('.loader-mask').hide().find('.loader').hide();
    });
  }
})();
