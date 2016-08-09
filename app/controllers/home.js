module.exports = Home;

Home.$inject = ['App', '$auth', '$state', '$http', 'Test', '$rootScope', 'User'];

function Home(App, $auth, $state, $http, Test, $rootScope, User) {
    var $ctrl = this;
    $ctrl.user = {};

    if ($auth.isAuthenticated()) {
      $ctrl.user = App.user;
      
      $ctrl.saveChanges = function() {
        User.$new($ctrl.user.id).$extend($ctrl.user).$save().$then(function () {
          $ctrl.user.$extend(this);
          $state.go('map');
        });
      }

    } else {
      $state.go('login');
    }
}
