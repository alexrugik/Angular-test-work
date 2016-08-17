module.exports = routes;

routes.$inject = [
  'AppProvider',
  '$stateProvider',
  '$urlRouterProvider',
  '$urlMatcherFactoryProvider'
];

function routes(AppProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
  $urlMatcherFactoryProvider.strictMode(false)

  $urlRouterProvider.otherwise(function($injector) {
    var $state = $injector.get('$state');
    $state.go('error', null, {
      location: false
    });
  });

  $stateProvider
    .state('error', {
      url: '/error',
      templateUrl: AppProvider.viewPath('error')
    })

  .state('login', {
    url: '/',
    templateUrl: AppProvider.viewPath('login'),
    controller: 'LoginCtrl',
    controllerAs: '$ctrl'
  })

  .state('map', {
    url: '/map',
    templateUrl: AppProvider.viewPath('map'),
    controller: 'MapCtrl',
    controllerAs: '$ctrl'
  })

  .state('home', {
      url: '/home',
      templateUrl: AppProvider.viewPath('home'),
      controller: 'HomeCtrl',
      controllerAs: '$ctrl'
    })
    .state('user', {
      url: '/map/:userId',
      templateUrl: AppProvider.viewPath('user'),
      controller: 'UserCtrl',
      controllerAs: '$ctrl'
    });
}
