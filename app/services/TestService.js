module.exports = TestService;

TestService.$inject = ['$state', '$auth'];


function TestService($state, $auth) {
  if (!$auth.isAuthenticated) {
    $state.go("login");
  } else {
    console.log("hello all is ok");
  }
}
