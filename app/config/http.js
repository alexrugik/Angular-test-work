module.exports = HttpProviderConfig;

HttpProviderConfig.$inject = ['$httpProvider'];

function HttpProviderConfig($httpProvider) {
  $httpProvider.interceptors.push(Interceptor);
}

Interceptor.$inject = ['$injector'];

function Interceptor($injector) {
  return {
    request: function (config) {
      if (/\.html$/.test(config.url)) {
        return config;
      }

      if (!config.params) {
        config.params = {};
      }

      if (!config.params.token && $injector.get('$auth').getToken()) {
        config.params.token = $injector.get('$auth').getToken();
      }

      return config;
    }
  };
}
