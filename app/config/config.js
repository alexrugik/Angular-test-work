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
  console.log(AppProvider.config.apiUrl);
  $authProvider.baseUrl = AppProvider.config.apiUrl;
  $authProvider.tokenRoot = 'result';
  $authProvider.loginUrl = 'login';
  
  $authProvider.facebook({
    clientId: '1991845311041561',
    responseType: 'token'
  });

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCJJbjNdOwkVDHmp6Nyr-AK_Q5G8yEFEvc',
    //v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
}
