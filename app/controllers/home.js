module.exports = Home;

Home.$inject = ['App', '$auth', '$state', '$http', 'Test', 'User'];

function Home(App, $auth, $state, $http, Test, User) {
  var $ctrl = this;
  $ctrl.user = App.user;

  initPage();

  $ctrl.saveChanges = function() {
    $ctrl.user.$save().$then(function() {
      $state.go('map');
    });
  }

  $ctrl.getAvatar = function() {
    let file = document.getElementById('foto').files;
    if (file.length === 0 || file[0].type !== 'image/jpeg') {
      alert('Is not correct avatar format or no image! Please use image/jpeg');
      return;
    }
    updateUserImage(file);
  }

  function initPage() {
    checkAuth();
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

  function updateUserImage(files) {
    const url = 'http://test-api.live.gbksoft.net/api/v1/';
    let userUrl = url + 'profile?token=' + $auth.getToken();
    let fd = new FormData();
    fd.append("image", files[0]);
    $http.post(userUrl, fd, {
        withCredentials: true,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      })
      .then(function(response) {
        if (response.data.code !== 200 && response.data.status !== 'succcess') {
          alert('Can not save image data for User!');
          return;
        }
      })
  }

}
