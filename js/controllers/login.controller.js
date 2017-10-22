(function(){
  'user strict';

  angular.module('aha')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['Auth', '$state', '$rootScope', 'Cart'];
  function LoginController(Auth, $state, $rootScope, Cart) {
    var ctrl = this;
    ctrl.user = {
      subscribedToNewsletter: false,
      user: {
        plainPassword: {}
      }
    };
    ctrl.login = {};
    ctrl.registerUser = registerUser;
    ctrl.loginUser = loginUser;
    ctrl.errors = null;
    ctrl.msg = null;
    ctrl.logMsg = null;
    ctrl.regSuccess = null;
    ctrl.logSuccess = null;
    
    return;
    ///////////////////////////////////////////

    function loginUser() {
      $rootScope.$broadcast('loading-start');
      Auth.loginUser(ctrl.login)
        .then(function (res) {
          if (Auth.storeAuth(res.data)) {
            $state.go('home');
          }
          if (ctrl.remember) {
            Auth.rememberUser(true);
          }
          ctrl.logMsg = null;
          $rootScope.$broadcast('loading-end');
          $rootScope.$broadcast('login-success');
        })
        .catch(function (err) {
          console.log(err);
          ctrl.logSuccess = null;
          ctrl.logMsg = err.data.message;
          $rootScope.$broadcast('loading-end');
        });
    }
    
    function registerUser() {
      Auth.registerUser(ctrl.user)
        .then(function (res) {
          ctrl.regSuccess = "Registration Successful, Please check your email and verify to login.";
          ctrl.msg = null;
          ctrl.errors = null;
        })
        .catch(function (err) {
          console.log(err.data, err.status);
          ctrl.errors = validationErrors(err.data.errors);
          ctrl.msg = err.data.message;
        });
    }

    function validationErrors(errors) {
      var err = null;
      if (errors && errors.children) {
        err = {};
        var em = errors.children.email.errors;
        var fn = errors.children.firstName.errors;
        var ln = errors.children.lastName.errors;
        var dob = errors.children.birthday.errors;
        var p1 = errors.children.user.children.plainPassword.children.first.errors;
        var p2 = errors.children.user.children.plainPassword.children.second.errors;
        if (em) err.email = em;
        if (fn) err.firstName = fn;
        if (ln) err.lastName = ln;
        if (dob) err.birthday = dob;
        if (p1) err.password = p1;
        if (p2) err.confirmPassword = p2;
      }
      return err;
    }
  }
})();
