module.exports = Map;

Map.$inject = ['App', '$auth', '$state', '$http', '$rootScope', 'User', 'uiGmapGoogleMapApi', '$timeout'];

function Map(App, $auth, $state, $http, $rootScope, User, uiGmapGoogleMapApi, $timeout) {
  var $ctrl = this;

  checkAuth();

  $ctrl.markers = [];
  $ctrl.user = App.user;
  $ctrl.currentUserMarker = {};
  $ctrl.users = User.$search();


  $ctrl.user.$then(function() {
    angular.extend($ctrl.currentUserMarker, {
      id: this.id,
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
        url: this.image,
        scaledSize: {
          width: 34,
          height: 44
        },
      },
      click: handleClickForUser
    });

    $ctrl.markers.push($ctrl.currentUserMarker);
  });

  $ctrl.users.$then(function() {
    this.forEach(user => {
      let coords = user.latlon.split(',');
      let latitude = coords[0];
      let longitude = coords[1];
      $ctrl.markers.push({
        id: user.id,
        coords: {
          latitude: latitude,
          longitude: longitude
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

  uiGmapGoogleMapApi.then(function(maps) {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $ctrl.coordinats = position.coords;

        angular.extend($ctrl.currentUserMarker, {
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });

        $ctrl.map.center.latitude = $ctrl.coordinats.latitude;
        $ctrl.map.center.longitude = $ctrl.coordinats.longitude;
      });
    }
  });

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
