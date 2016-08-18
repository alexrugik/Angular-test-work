module.exports = Home;

Home.$inject = ['App', '$auth', '$state', '$http', 'Test', 'User'];

function Home(App, $auth, $state, $http, Test, User) {
  var $ctrl = this;
  let url = 'http://test-api.live.gbksoft.net/api/v1/profile?token=' + $auth.getToken();

  initPage();

  $ctrl.saveChanges = function() {
    updateUser();
  }

  function initPage() {
    checkAuth();
    $ctrl.user = {};
    getUser();
  }


  function checkAuth() {
    if (!$auth.isAuthenticated()) {
      $state.go('login');
    } else {
      $ctrl.loginText = 'Logout';
      $ctrl.logout = function() {
        $state.go('login');
        return $auth.logout().then(function() {})
      }
    }
  }

  function getUser() {
    $http.get(url)
      .then(function(response) {
        $ctrl.user = angular.fromJson(response.data.result);
        console.log($ctrl.user);
      })
  }

  function updateUser() {
    $http.post(url, $ctrl.user)
      .then(function(result) {
        if (result.status == 200) {
          $state.go('map');
        } else {
          alert('Can not save data!');
        }
      })
  }


}
