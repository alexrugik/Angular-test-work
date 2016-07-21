module.exports = Base;

Base.$inject = ['restmod'];

function Base(restmod) {
  return restmod.mixin({
    $extend: {
      Model: {},
      Record: {},
      Collection: {},
      List: {}
    }
  });
}
