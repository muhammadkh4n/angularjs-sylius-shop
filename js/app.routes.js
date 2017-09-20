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
    var productsBySlug = {
      name: 'productsBySlug',
      url: '/category/:slug?page&limit',
      templateUrl: 'templates/catalog.html',
      resolve: {
        products: ['Product', '$stateParams', '$rootScope', function (Product, $stateParams, $rootScope) {
          $rootScope.$broadcast('loading-start');
          return Product.getProducts($stateParams.slug, $stateParams.page, $stateParams.limit);
        }],
        category: ['Product', '$stateParams', function (Product, $stateParams){
          return Product.getTaxon($stateParams.slug);
        }]
      },
      controller: 'ProductsController as ctrl'
    };
    var productsByImage = {
      name: 'productsByImage',
      templateUrl: 'templates/catalog.html',
      url: '/search-by-image/:imageId?page&limit',
      controller: 'ProductsController as ctrl',
      resolve: {
        products: ['Search', '$stateParams', '$rootScope', function(Search, $stateParams, $rootScope) {
          $rootScope.$broadcast('loading-start');
          return Search.getProductsByImage($stateParams.imageId, $stateParams.page, $stateParams.limit);
        }],
        category: function() {
          return {};
        }
      }
    };
    var productDetails = {
      name: 'productDetails',
      url: '/product/:slug',
      templateUrl: 'templates/product.html',
      resolve: {
        product: ['Product', '$stateParams', '$rootScope', function (Product, $stateParams, $rootScope) {
          $rootScope.$broadcast('loading-start');
          return Product.getProductDetails($stateParams.slug);
        }]
      },
      controller: 'ProductController as ctrl'
    }
    var cart = {
      name: 'cart',
      url: '/cart',
      templateUrl: 'templates/cart.html',
      controller: 'CartController as ctrl'
    }
    var checkout = {
      name: 'checkout',
      url: '/checkout',
      templateUrl: 'templates/checkout.html',
      controller: 'CheckoutController as ctrl'
    }
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
      .state(productsBySlug)
      .state(productsByImage)
      .state(productDetails)
      .state(cart)
      .state(checkout)
      .state(about)
      .state(faq)
      .state(contact)
      .state(login)
      .state(error404);

    $urlRouterProvider.otherwise('/');
  }
})();
