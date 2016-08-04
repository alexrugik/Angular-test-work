module.exports = Home;

Home.$inject = ['App', '$auth', '$state', '$http', 'Test', '$rootScope'];

function Home(App, $auth, $state, $http, Test, $rootScope) {

    console.log($auth);
    console.log($state);
    console.log(App);

    $ctr = this;
    $ctr.user = {};

    if ($auth.isAuthenticated) {

      $ctr.saveChanges = function() {
        $rootScope.user = $ctr.user;
        $state.go("map");
      }

      $http({
        method: "GET",
        url: "data/user.json"
      }).then(function successCallback(response) {
          console.log("successCallback");
          console.log(response);

          var userFullName = response.data.username.split(" ");
          $ctr.user.name = userFullName[0];
          $ctr.user.surName = userFullName[1];
          $ctr.user.imageLink = response.data.image;
          $ctr.user.gender = response.data.gender;
      }, function errorCallback(response) {
          console.log("errorCallback = ", response);
      });

    } else {
      $state.go("login");
    }
}
