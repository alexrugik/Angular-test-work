module.exports = Map;

Map.$inject = ['App', '$auth', '$state', '$http', '$rootScope', 'User'];

function Map(App, $auth, $state, $http, $rootScope, User) {
  $ctr = this;
  $ctr.users = [];
  console.log("rootScope = ", $rootScope );

  if ($auth.isAuthenticated) {

    $ctr.user = $rootScope.user;
    console.log($ctr.user);
    $http({
      method: "GET",
      url: "data/users.json"
    }).then(function successCallback(response) {
      console.log("successCallback");
      console.log(response);
      $ctr.users = angular.fromJson(response.data);
      $rootScope.users = $ctr.users;
      console.log($ctr.users);
    }, function errorCallback(response) {
      console.log("errorCallback = ", response);
    });


  } else {
    $state.go("login");
  }


}
