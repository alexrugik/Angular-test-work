module.exports = config;

config.$inject = [
  'AppProvider',
  '$locationProvider',
  '$authProvider',
  'restmodProvider'
];

function config(AppProvider, $locationProvider, $authProvider, $restmodProvider) {
  //--------- $locationProvider ----------------------------------------------
  $locationProvider.html5Mode({ enabled: true }).hashPrefix('!');

  //--------- $authProvider --------------------------------------------------
  $authProvider.baseUrl = AppProvider.config.apiUrl;
  $authProvider.tokenRoot = 'result';
  $authProvider.loginUrl = 'users/login';
  $authProvider.facebook({
   clientId: '1991845311041561'//"1637129439866047"//'1991845311041561'
  });


  //
  $authProvider.facebook({
    name: 'facebook',
    url: 'login-web',
    authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
    redirectUri: window.location.origin + '/',
    requiredUrlParams: ['display', 'scope'],
    scope: ['email'],
    scopeDelimiter: ',',
    display: 'popup',
    type: '2.0',
    popupOptions: { width: 580, height: 400 }
});
}

/*module.exports = config;

config.$inject = [
  'AppProvider',
  '$locationProvider',
  '$authProvider',
  'restmodProvider'
];

function config(AppProvider, $locationProvider, $authProvider, $restmodProvider) {
  //--------- $locationProvider ----------------------------------------------
  $locationProvider.html5Mode({ enabled: true }).hashPrefix('!');

  //--------- $authProvider --------------------------------------------------
  $authProvider.baseUrl = AppProvider.config.apiUrl;
  $authProvider.tokenRoot = 'result';
  $authProvider.loginUrl = 'users/login';
  $authProvider.facebook({
   clientId: '1637129439866047'//'1991845311041561'
  });

//
 // http://test-api.live.gbksoft.net/api/v1/login-web?code=

  $authProvider.facebook({ // ?client_id=&scope=email,public_profile&
    name: 'facebook',
    url: 'login-web',
    authorizationEndpoint: 'https://www.facebook.com/dialog/oauth',
    redirectUri: 'http://test-api.live.gbksoft.net/api/v1/login-web',
    requiredUrlParams: ['display', 'scope'],
    scope: ['email', 'public_profile'],
    scopeDelimiter: ',',
    display: 'popup',
    type: '2.0',
    popupOptions: { width: 580, height: 400 }
});
}*/
