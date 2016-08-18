module.exports = config;

config.$inject = [
  'AppProvider',
  '$locationProvider',
  '$authProvider',
  'restmodProvider',
  'uiGmapGoogleMapApiProvider'
];

function config(AppProvider, $locationProvider, $authProvider, restmodProvider, uiGmapGoogleMapApiProvider) {
  //--------- $locationProvider ----------------------------------------------
  $locationProvider.html5Mode({
    enabled: true
  }).hashPrefix('!');

  //--------- $authProvider --------------------------------------------------
  $authProvider.baseUrl = AppProvider.config.apiUrl;
  $authProvider.tokenRoot = 'result';
  $authProvider.loginUrl = 'users/login';
  $authProvider.facebook({
    clientId: '1991845311041561'
  });

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCJJbjNdOwkVDHmp6Nyr-AK_Q5G8yEFEvc',
    //v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });

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
    popupOptions: {
      width: 580,
      height: 400
    }
  });

  restmodProvider
      .rebase('DefaultPacker', 'Base', {
        $extend: {
          Model: {
            encodeUrlName: function (_name) {
              return _name.toLowerCase();
            }
          }
        },
        $config: {
          style: 'GBKSOFT',
          urlPrefix: AppProvider.config.apiUrl,
          jsonRoot: 'result',
          primaryKey: 'id',
          jsonMeta: '_meta'
        }
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
