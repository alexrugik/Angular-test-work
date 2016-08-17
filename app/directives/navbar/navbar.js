module.exports = navbar;

navbar.$inject = ['App'];

function navbar(App) {
  return {
    restrict: 'AE',
    replace: 'true',
    //template: '<h3>Hello World!!</h3>',
    templateUrl: App.viewPath('directives/navbar/navbar'),
  };
}
