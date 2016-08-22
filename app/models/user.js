module.exports = User;

User.$inject = ['restmod'];

function User(restmod) {
  return restmod.model('users').mix({
    $hooks: {
      'before-save': function (params) {
        params.method = 'POST';
      },
      'after-fetch': function () {
        if(this.userName) {
          let [firstName, lastName] = this.userName.split(/\s/);

          angular.extend(this, { firstName, lastName });
        }
      }
    },
    $extend: {
      Model: {},
      Record: {}
    }
  });
}
