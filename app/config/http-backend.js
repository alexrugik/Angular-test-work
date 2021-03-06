module.exports = HttpBackend;

HttpBackend.$inject = [
  '$httpBackend'
];
var coords = [{
  lat: 49.86720,
  lon: 27.60429
}, {
  lat: 50.34633,
  lon: 32.78983
}, {
  lat: 48.86561,
  lon: 37.09647
}, {
  lat: 49.86720,
  lon: 27.60429
}, {
  lat: 46.68053,
  lon: 32.78983
}, {
  lat: 48.45926,
  lon: 28.35136
}, {
  lat: 49.86720,
  lon: 28.26347
}, {
  lat: 50.43039,
  lon: 33.62479
}, {
  lat: 48.60476,
  lon: 33.53690
}, {
  lat: 51.37263,
  lon: 31.95487
}, {
  lat: 45.30676,
  lon: 34.15214
}];

function user(id) {
  var user = {
    id: +id,
    email: 'jonh.doe.' + id + '@example.com',
    first_name: 'John ' + id,
    last_name: 'Doe ' + id,
    age: 25 + id,
    latlon: coords[id].lat + "," + coords[id].lon,
    gender: 'male',
    image: '../img/avatar.jpg',
  };

  Object.defineProperty(user, 'withProfile', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function() {
      this.profile = profile(this.id);

      return this;
    }
  })

  Object.defineProperty(user, 'withPermissions', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function() {
      this.permissions = permissions();

      return this;
    }
  })

  return user;
}

function profile(id) {
  return {
    id: +id,
    user_id: +id,
    country: 'Ukraine',
    city: 'Kiev',
    phone: '+38 (050) 111 22 33'
  };
}

function permissions() {
  return {
    view: false,
    delete: true,
    update: true,
    reject: true,
    approve: false
  };
}

function HttpBackend($httpBackend) {
  // Login
  $httpBackend
    .when('POST', /^\/?api\/users\/login$/)
    .respond(function() {
      return [200, {
        code: 200,
        result: {
          token: 'access_token'
        }
      }];
    });

  // Users
  $httpBackend
    .whenGET('/api/users')
    .respond(function(method, url, data, headers, params) {
      return [200, {
        code: 200,
        result: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(user)
      }];
    });

  // Current user
  $httpBackend
    .whenGET('/api/users/current')
    .respond(function(method, url, data, headers, params) {
      return [200, {
        code: 200,
        result: {
          id: 1,
          userName: "Alex Ruzhinskiy",
          email: "alexruzhinskiy@gmail.com",
          image: "http://activecollab.gbksoft.net/public/avatars/144.256x256.png",
          lat: 11000,
          lon: 11111,
          gender: "male",
        }
      }];
    });

  // Single user
  $httpBackend
    .when('GET', /^\/api\/users\/([\d]+)$/, undefined, undefined, ['id'])
    .respond(function(method, url, data, headers, params) {
      return [200, {
        code: 200,
        result: user(params.id).withProfile().withPermissions()
      }];
    });

  // Update user
  $httpBackend
    .when('PUT', /^\/api\/users\/([\d]+)$/, undefined, undefined, ['id'])
    .respond(function(method, url, data, headers, params) {
      return [200, {
        code: 200,
        result: {
          id: params.id,
          email: params.email
        }
      }];
    });

  // User profile
  $httpBackend
    .when('GET', /^\/api\/users\/([\d]+)\/profile$/, undefined, undefined, ['id'])
    .respond(function(method, url, data, headers, params) {
      return [200, {
        code: 200,
        result: profile(params.id)
      }];
    });

  // User permissions
  $httpBackend
    .when('GET', /^\/api\/users\/([\d]+)\/permissions$/, undefined, undefined, ['id'])
    .respond(function(method, url, data, headers, params) {
      return [200, {
        code: 200,
        result: permissions()
      }];
    });

  // User reject
  $httpBackend
    .when('POST', /^\/api\/users\/([\d]+)\/reject$/, undefined, undefined, ['id'])
    .respond(function(method, url, data, headers, params) {
      return [200, {
        code: 200,
        result: null
      }];
    });

  // User approve
  $httpBackend
    .when('POST', /^\/api\/users\/([\d]+)\/approve$/, undefined, undefined, ['id'])
    .respond(function(method, url, data, headers, params) {
      return [200, {
        code: 200,
        result: null
      }];
    });

  // Pass all other requests
  $httpBackend.when('GET', /.*/).passThrough();
  $httpBackend.when('POST', /.*/).passThrough();
  $httpBackend.when('PUT', /.*/).passThrough();
  $httpBackend.when('PATCH', /.*/).passThrough();
  $httpBackend.when('DELETE', /.*/).passThrough();
  $httpBackend.when('HEAD', /.*/).passThrough();
  $httpBackend.when('OPTIONS', /.*/).passThrough();
}
