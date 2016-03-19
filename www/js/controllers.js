var serverUrl = 'http://localhost:9000';

angular.module('app.controllers', [])

.controller('quizListCtrl', function($scope, $http, $state) {
  $scope.nowQuizLoading = false;
  $scope.quizList = [];

  $scope.loadQuizList = function(){
      $scope.nowQuizLoading = true;
      $http.get(`${serverUrl}/api/quiz`)
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
.controller('quizCtrl', function($scope, $http, $state, $stateParams, $ionicPopup, $ionicBackdrop) {
  $scope.quiz = {};

  $scope.loadQuiz = function(){
    $http.get(`${serverUrl}/api/quiz/${$stateParams.quizId}`)
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
        var form = {
          user: '56e5413826bae6af1609a053',
          quiz: $scope.quiz._id,
          answerTexts: {}
        };

        $scope.quiz.questions.forEach(function(question){
          form.answerTexts[question._id] = {
            answerText: question.answer
          };
        });

        $http.post(`${serverUrl}/api/quiz-results`, form)
          .then(function(){
            var alertPopup = $ionicPopup.alert({
              title: '알림',
              template: '제출이 완료되었습니다.'
            });
            $ionicBackdrop.release();
            alertPopup.then(function(){
              $state.transitionTo('tabsController.quizList', {}, {
                reload: true
              });
            });
          })
          .catch(function(){
            var alertPopup = $ionic.alert({
              title: '알림',
              template: '채점 중 오류가 발생했습니다. 개발자에게 문의해주세요.'
            });
            $ionicBackdrop.release();
            alertPopup.then(function(){
              $state.transitionTo('tabsController.quizList', {}, {
                reload: true
              });
            });
          });
      }
    });
  };
})
.controller('quizResultsCtrl', function($scope, $http) {
  $scope.quizResults = [];
  $http.get(`${serverUrl}/api/quiz-results`)
    .then(function(result){
      $scope.quizResults = result.data;

      // 정답률 구하기
      $scope.quizResults.forEach(function(quizResult){
        quizResult.currectRating
        var currectCount = 0;
        quizResult.answers.forEach(function(answer){
          if(answer.isCurrect){
            currectCount = currectCount + 1;
          }
        });

        if(currectCount > 0){
          quizResult.currectRating = 100 * (currectCount / quizResult.answers.length);
          quizResult.currectRating = quizResult.currectRating.toFixed(0);
        }
      });
    });
})
.controller('loginCtrl', function($scope) {

})
.controller('signupCtrl', function($scope) {

})
.controller('configCtrl', function($scope) {

});
