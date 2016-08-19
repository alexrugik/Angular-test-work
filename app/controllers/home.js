module.exports = Home;

Home.$inject = ['App', '$auth', '$state', '$http', 'Test', 'User'];

function Home(App, $auth, $state, $http, Test, User) {
  var $ctrl = this;
  let url = 'http://test-api.live.gbksoft.net/api/v1/profile?token=' + $auth.getToken();

  initPage();

  $ctrl.saveChanges = function() {
    updateUser();
    $state.go('map');
  }

  $ctrl.getAvatar = function() {
    let file = document.getElementById('foto').files;
    if (file[0] && !file[0].type === 'image/jpeg') {
      alert('Is not correct avatar format! Please use image/jpeg');
      return;
    }
    UpdateUserImage(file);
  }

/*  function previewFile(file) { 
    let reader  = new FileReader();
    reader.addEventListener("load", function(e) {  
      $ctrl.user.image = e.target.result;
      UpdateUserImage()
    }, false); 
    if (file) {  
      reader.readAsDataURL(file); 
    }
  }*/

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
        if (result.status == 200) {} else {
          alert('Can not save data!');
        }
      })
  }

  function UpdateUserImage(files) {
    let fd = new FormData();
    console.log(fd);
    fd.append("image", files[0]);
    $http.post(url, fd, {
        withCredentials: true,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      })
      .then(function(result) {
        if (result.status == 200) {} else {
          alert('Can not save data!');
        }
      })
  }


}
