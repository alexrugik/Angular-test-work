module.exports = Tab;

Tab.$inject = ['App', '$auth', '$state', '$http', '$rootScope', 'User'];

function Tab(App, $auth, $state, $http, $rootScope, User) {
  console.log("test directive");
}
