/**
 * Style Guide
 * @link https://github.com/johnpapa/angular-styleguide
 */

module.exports = AppProvider;

AppProvider.$inject = [];

function AppProvider() {
  var provider = this;

  this.config = {};
  this.viewPath = viewPath;
  this.$get = App;

  App.$inject = [
    '$auth',
    'User',
    'toaster',
    '$state'
  ];

  function App($auth, User, toaster, $state) {
    var user = null;
    var app = {
      viewPath: viewPath
    };

    Object.defineProperties(app, {
      config: {
        get: function () {
          return provider.config;
        }
      },
      user: {
        get: function () {
          if (!user && $auth.isAuthenticated()) {
            user = User.single('users/current').$fetch();
          }

          return user;
        }
      }
    });

/*    Object.defineProperties(app, {
      config: {
        get: function() {
          return provider.config;
        }
      },
      user: {
        get: function() {
          return user;
        },
        set: function(_user) {
          user = _user;
        }
      }

    });*/


    /**
     * Check user access
     *
     * @param {string} action
     * @param {object} params
     * @returns {boolean}
     */
    app.can = function (action, params) {
      // Must be implemented by developer
      return false;
    };

    return app;
  }

  /**
   * Get view path
   *
   * @param {string} path
   * @returns {string}
   */
  function viewPath(path) {
    return 'views/' + path + '.html';
  }
}
