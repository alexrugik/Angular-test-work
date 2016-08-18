module.exports = Map;

Map.$inject = ['App', '$auth', '$state', '$http', '$rootScope', 'User', 'uiGmapGoogleMapApi', '$timeout'];

function Map(App, $auth, $state, $http, $rootScope, User, uiGmapGoogleMapApi, $timeout) {
  var $ctrl = this;
  const url = 'http://test-api.live.gbksoft.net/api/v1/';

  initPage();

  uiGmapGoogleMapApi.then(function(maps) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let coordinats = position.coords;

        UpdateUser({
          lat: coordinats.latitude.toString(),
          lon: coordinats.longitude.toString()
        });

        angular.extend($ctrl.currentUserMarker, {
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });

        $ctrl.map.center.latitude = coordinats.latitude;
        $ctrl.map.center.longitude = coordinats.longitude;
      });
    }
  });

  function initPage() {
    checkAuth();
    $ctrl.user = getUser();
    $ctrl.users = getUsers();
    $ctrl.markers = [];
    $ctrl.currentUserMarker = {};
    initMap();
  }

  function initMap(property) {
    $ctrl.map = {
      center: {
        latitude: 50.4303885,
        longitude: 30.5046767
      },
      zoom: 11,
      bounds: {},
      options: {
        zoomControl: false,
        minZoom: 4,
        maxZoom: 25,
        mapTypeControl: false,
        streetViewControl: false,
        draggable: true,
        panControl: false,
        optimized: true,
        mapTypeI: 'roadmap',
      },
    };

    if (property) {
      angular.extend($ctrl.map, property);
    }

    $ctrl.user.then(function() {
      console.log("user in then = ", $ctrl.user);
      angular.extend($ctrl.currentUserMarker, {
        id: $ctrl.user.id,
        coords: {
          latitude: 50.4303885,
          longitude: 30.5046767
        },
        show: false,
        options: {
          animation: 1,
          draggable: true,
          labelContent: this.firstName,
        },
        icon: {
          url: $ctrl.user.image,
          scaledSize: {
            width: 34,
            height: 44
          },
        },
        click: handleClickForUser
      });

      $ctrl.markers.push($ctrl.currentUserMarker);
    });

    $ctrl.users.then(function() {
      console.log("users in then = ", $ctrl.users);
      $ctrl.users.forEach(user => {
        $ctrl.markers.push({
          id: user.id,
          coords: {
            latitude: user.lat,
            longitude: user.lon
          },
          options: {
            draggable: true,
            animation: 2,
            labelClass: 'img-circle',
            labelContent: user.first_name
          },
          show: false,
          icon: {
            url: user.image,
            scaledSize: {
              width: 24,
              height: 24
            }
          },
          click: handleClickForUsers,
        });
      });
    });
  }

  function checkAuth() {
    if (!$auth.isAuthenticated()) {
      $state.go('login');
    } else {
      $ctrl.loginText = 'Logout';
      $ctrl.logout = function() {
        $state.go('login');
        return $auth.logout().then(function() {})
      }
    }
  }

  function getUser() {
    let userUrl = url + 'profile?token=' + $auth.getToken();
    return $http.get(userUrl)
      .then(function(response) {
        $ctrl.user = angular.fromJson(response.data.result);
        console.log($ctrl.user);
      })
  }

  function UpdateUser(params) {
    if (!params) {
      return;
    }
    let usersUrl = url + 'profile?token=' + $auth.getToken();
    angular.extend($ctrl.user, params);
    $http.post(usersUrl, $ctrl.user)
      .then(function(result) {
        if (result.status == 200) {} else {
          alert('Can not save data!');
        }
      });
  }

  function getUsers() {
    let usersUrl = url + 'users?token=' + $auth.getToken();
    return $http.get(usersUrl)
      .then(function(response) {
        console.log(response);
        $ctrl.users = angular.fromJson(response.data.result);
        console.log($ctrl.users);
      })
  }

  function handleClickForUser() {
    $state.go('home');
  }

  function handleClickForUsers(e) {
    $state.go('user', {
      userId: e.key
    });
  }

}
