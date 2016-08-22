module.exports = HttpProviderConfig;

HttpProviderConfig.$inject = ['$httpProvider'];

function HttpProviderConfig($httpProvider) {
  $httpProvider.interceptors.push(Interceptor);
}

Interceptor.$inject = ['$injector'];

function Interceptor($injector) {
  return {
    request: function(config) {

      if (/\.html$/.test(config.url)) {
        return config;
      }

      if (!config.params) {
        config.params = {};
      }

      if (config.method === 'PUT') {
        config.method = 'POST';
        var formData = new FormData();

        Object.keys(config.data).forEach(function(key) {
          if (typeof config.data[key] == 'object' && !(config.data[key] instanceof File)) {
            formData.append(key, JSON.stringify(config.data[key]));
          } else {
            formData.append(key, config.data[key]);
          }
        });

        angular.extend(config, {
          headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity,
          data: formData
        });
      }

      if (!config.params.token && $injector.get('$auth').getToken()) {
        config.params.token = $injector.get('$auth').getToken();
      }

      return config;
    }
  };
}
