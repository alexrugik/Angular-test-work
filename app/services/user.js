module.exports = visitor;

visitor.$inject = [];

var visitor = new User();

function User() {
  var usr = {};
  return {
    setUser: function(user) {
      usr = user;
    },
    getUser: function() {
      return usr;
    }
  }
}
