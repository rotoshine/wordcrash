angular.module('app.controllers', [])

.controller('quizListCtrl', function($scope, $http, $state) {
  $scope.nowQuizLoading = false;
  $scope.quizList = [];

  $scope.loadQuizList = function(){
      $scope.nowQuizLoading = true;
      $http.get('http://demo1895907.mockable.io/quiz')
        .then(function(result){
          $scope.quizList = result.data;
          $scope.nowQuizLoading = false;
        });
  };

  $scope.loadQuizList();

  $scope.moveQuiz = function(quizId){
    $state.go('tabsController.quiz', { quizId: quizId });
  };
})
.controller('quizCtrl', function($scope, $http, $stateParams, $ionicPopup, $ionicBackdrop) {
  $scope.quiz = {};

  $scope.loadQuiz = function(){
    $http.get('http://demo1895907.mockable.io/quiz/1')
      .then(function(result){
        $scope.quiz = result.data
      });
  };

  $scope.loadQuiz();

  $scope.sendQuizResult = function(){
    var confirmPopup = $ionicPopup.confirm({
      title: '문제 제출',
      template: '제출하시겠습니까?'
    });

    confirmPopup.then(function(answer){
      if(answer){
        $ionicBackdrop.retain();
        // server에 보내는 처리 후 퀴즈 푼 목록으로 이동
        setTimeout(function(){
          var alertPopup = $ionicPopup.alert({
            title: '알림',
            template: '제출이 완료되었습니다.'
          });
          $ionicBackdrop.release();
          alertPopup.then(function(){
            // 결과페이지로 이동처리
          });
        }, 3000);
      }
    });
  };
})
.controller('quizResultsCtrl', function($scope) {

})
.controller('loginCtrl', function($scope) {

})
.controller('signupCtrl', function($scope) {

})
.controller('configCtrl', function($scope) {

});
