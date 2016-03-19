angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('tabsController.quizList', {
    url: '/quiz-list',
    views: {
      'quizTab': {
        templateUrl: 'templates/quiz-list.html',
        controller: 'quizListCtrl'
      }
    }
  })

  .state('tabsController.quiz', {
    url: '/quiz/:quizId',
    views: {
      'quizTab': {
        templateUrl: 'templates/quiz.html',
        controller: 'quizCtrl'
      }
    }
  })

  .state('tabsController.quizResults', {
    url: '/quiz-results',
    views: {
      'quizResultsTab': {
        templateUrl: 'templates/quiz-results.html',
        controller: 'quizResultsCtrl'
      }
    }
  })

  .state('tabsController.config', {
    url: '/config',
    views: {
      'configTab': {
        templateUrl: 'templates/config.html',
        controller: 'configCtrl'
      }
    }
  })
  .state('tabsController', {
    url: '/wordcrash',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })


$urlRouterProvider.otherwise('/login')



});
