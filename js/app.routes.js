(function(){
  'use strict';

  angular.module('aha')
    .config(Routes);

  Routes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
  function Routes($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    var home = {
      name: 'home',
      url: '/',
      templateUrl: 'templates/home.html'
    };
    var login = {
      name: 'login',
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController as ctrl'
    };
    var about = {
      name: 'about',
      url: '/about',
      templateUrl: 'templates/about.html'
    };
    var faq = {
      name: 'faq',
      url: '/faq',
      templateUrl: 'templates/faq.html'
    };
    var contact = {
      name: 'contact',
      url: '/contact',
      templateUrl: 'templates/contact.html'
    };
    var error404 = {
      name: 'error404',
      url: '/404',
      templateUrl: 'templates/404.html'
    };

    
    $stateProvider
      .state(home)
      .state(about)
      .state(faq)
      .state(contact)
      .state(login)
      .state(error404);

    $urlRouterProvider.otherwise('/');
  }
})();
