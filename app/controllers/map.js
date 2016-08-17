module.exports = Map;

Map.$inject = ['App', '$auth', '$state', '$http', '$rootScope', 'User', 'uiGmapGoogleMapApi', '$timeout'];

function Map(App, $auth, $state, $http, $rootScope, User, uiGmapGoogleMapApi, $timeout) {
  var $ctrl = this;

  console.log($state);

  if (!$auth.isAuthenticated()) {
    $state.go('login');
    return;
  }

  $ctrl.markers = [];
  $ctrl.user = App.user;
  $ctrl.currentUserMarker = {};
  console.log("user = ", $ctrl.user);
  $ctrl.users = User.$search();
  console.log("users = ", $ctrl.users);

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
        draggable: true
      },
      icon: {
        url: this.image,
        scaledSize: {
          width: 34,
          height: 44
        },
      }
    });

    $ctrl.markers.push($ctrl.currentUserMarker);
  });

  /*  $timeout(() => {
      $ctrl.markers.push({
        id: 1111,
        coords: {
          latitude: 50.5303885,
          longitude: 30.6046767
        },
        options: {
          draggable: true
        },
        show: false,
        options: {
          animation: 2,
        }
      });
    }, 2000);
  */
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
        },
        show: false,
        icon: {
          url: user.image,
          scaledSize: {
            width: 34,
            height: 44
          }
        }
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
      mapTypeI: "roadmap",
    },
  };

  uiGmapGoogleMapApi.then(function(maps) {
    console.log("callback api google");

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


}
