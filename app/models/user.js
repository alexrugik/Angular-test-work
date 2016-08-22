module.exports = User;

User.$inject = ['restmod', '$auth'];

function User(restmod, $auth) {
  return restmod.model('users').mix({
    $hooks: {
      'before-save': function(params) {

      },
      'after-fetch': function(result) {
        if (this.userName) {
          let [firstName, lastName] = this.userName.split(/\s/);

          angular.extend(this, {
            firstName,
            lastName
          });
        }
      },
      'before-request': function(req) {
        if (req.params) {
          req.url = req.url + '/' + req.params;
        }
      },
      'after-request': function(response) {

      }
    },
    $extend: {
      Model: {},
      Record: {}
    }
  });
}
