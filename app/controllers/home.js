module.exports = Home;

Home.$inject = ['App', '$auth', '$state', '$http', 'Test'];

function Home(App, $auth, $state, $http, Test) {

    console.log($auth);
    console.log($state);
    console.log(App);
    console.log(Test);
    $ctr = this;
    $ctr.user = {};

    if ($auth.isAuthenticated) {

      $ctr.saveChanges = function() {
        $state.go("map");
      }

      $http({
        method: "GET",
        url: "/profile"
      }).then(function successCallback(response) {
          console.log("successCallback");
          data = {
            id: 0,
            username: "Alex Ruzhinskiy",
            email: "alexruzhinskiy@gmail.com",
            image: "http://activecollab.gbksoft.net/public/avatars/144.256x256.png",
            lat: 11000,
            lon: 11111,
            gender: "male",
          };
          var userFullName = data.username.split(" ");
          $ctr.user.name = userFullName[0];
          $ctr.user.surName = userFullName[1];
          $ctr.user.imageLink = data.image;
          $ctr.user.gender = data.gender;
      }, function errorCallback(response) {
          console.log("errorCallback = ", response);
      });
    } else {
      $state.go("login");
    }
}
