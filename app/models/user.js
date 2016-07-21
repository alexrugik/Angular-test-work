module.exports = User;

User.$inject = ['restmod'];

function User(restmod) {
  return restmod.model('users').mix({
    name: { init: 'Guest' },
    $extend: {
      Model: {},
      Record: {}
    }
  });
}
