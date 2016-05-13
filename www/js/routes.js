angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('registro', {
    url: '/registro',
    templateUrl: 'templates/registro.html',
    controller: 'registroCtrl'
  })

  .state('eventos', {
    url: '/eventos',
    templateUrl: 'templates/eventos.html',
    controller: 'eventosCtrl',
    authRequired: true
  })

  .state('evento', {
    url: 'evento/:idEvento',
    templateUrl: 'templates/cursos.html',
    controller: 'cursosCtrl',
    authRequired: true
  })

  $urlRouterProvider.otherwise('/login');
});