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
      templateUrl: 'templates/home.html',
      controller: 'HomeController as ctrl',
      resolve: {
        recommended: ['Auth', 'Recommend', '$rootScope',
                      function(Auth, Recommend, $rootScope) {
                        $rootScope.$broadcast('loading-start');
                        if (Auth.loggedIn()) {
                          return Recommend.getUserRecommended();
                        } else {
                          return Recommend.getRecommended();
                        }
                      }]
      }
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
      url: '/search-by-image/:slug?page&limit',
      controller: 'ProductsController as ctrl',
      resolve: {
        products: ['Search', '$stateParams', '$rootScope', function(Search, $stateParams, $rootScope) {
          $rootScope.$broadcast('loading-start');
          return Search.getProductsByImage($stateParams.slug, $stateParams.page, $stateParams.limit);
        }],
        category: function() {
          return {};
        }
      }
    };
    var productsSimilar = {
      name: 'productsSimilar',
      url: '/similar-products/:slug?page&limit',
      templateUrl: 'templates/catalog.html',
      resolve: {
        products: ['Product', '$stateParams', '$rootScope', function (Product, $stateParams, $rootScope) {
          $rootScope.$broadcast('loading-start');
          return Product.getSimilarProducts($stateParams.slug, $stateParams.page, $stateParams.limit);
        }],
        category: ['Product', '$stateParams', function (Product, $stateParams){
          return {};
        }]
      },
      controller: 'ProductsController as ctrl'
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
    };
    var account = {
      name: 'account',
      url: '/account',
      templateUrl: 'templates/account.html',
      controller: 'ProfileController as ctrl',
      resolve: {
        account: ['Profile', '$rootScope', function(Profile, $rootScope) {
          $rootScope.$broadcast('loading-start');
          return Profile.getAccount();
        }],
        wishlists: ['Profile', '$rootScope', function(Profile, $rootScope) {
          return Profile.getWishlists();
        }],
        brands: ['Product', '$rootScope', function(Product, $rootScope) {
          return Product.getTaxon('brand');
        }],
        favorites: ['Profile', function(Profile) {
          return Profile.getFavoriteBrands();
        }]
      }
    }
    var cart = {
      name: 'cart',
      url: '/cart',
      templateUrl: 'templates/cart.html',
      controller: 'CartController as ctrl'
    };
    var checkout = {
      name: 'checkout',
      url: '/checkout',
      templateUrl: 'templates/checkout.html',
      controller: 'CheckoutController as ctrl'
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
      .state(productsBySlug)
      .state(productsByImage)
      .state(productDetails)
      .state(productsSimilar)
      .state(account)
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
