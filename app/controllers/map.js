module.exports = Map;

Map.$inject = ['App', '$auth', '$state', '$http', '$rootScope', 'User', 'uiGmapGoogleMapApi', '$timeout'];

function Map(App, $auth, $state, $http, $rootScope, User, uiGmapGoogleMapApi, $timeout) {
  var $ctrl = this;

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
      refresh: function() {
        return true;
      },
    },
  };

  initPage();

  uiGmapGoogleMapApi.then(function(maps) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let coordinats = position.coords;

        $ctrl.user.lat = coordinats.latitude;
        $ctrl.user.lon = coordinats.longitude;
        $ctrl.user.$save();
        angular.extend($ctrl.currentUserMarker, {
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });

        $ctrl.map.center.latitude = coordinats.latitude + '';
        $ctrl.map.center.longitude = coordinats.longitude + '';
        google.maps.event.trigger($ctrl.map, 'resize');
      });
    }
  });

  function initPage() {
    $ctrl.showMap = false;
    checkAuth();
    $ctrl.user = App.user;
    $ctrl.users = User.$search();
    $ctrl.markers = [];
    $ctrl.currentUserMarker = {};
    initMap();
    $timeout(function() {
      $ctrl.showMap = true;
    }, 500);
  }

  function initMap(property) {

    if (property) {
      angular.extend($ctrl.map, property);
    }

    $ctrl.user.$then(function() {
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
          labelContent: this.first_name,
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

    $ctrl.users.$then(function(resp) {
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

  function handleClickForUser() {
    $state.go('home');
  }

  function handleClickForUsers(e) {
    $state.go('user', {
      userId: e.key
    });
  }

}
