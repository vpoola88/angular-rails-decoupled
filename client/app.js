angular.module('Tinydocs', ['ngResource', 'ui.router'])

.config(function($stateProvider, $httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
  $stateProvider.state('blogs', {
    url: '/blogs',
    templateUrl: 'blogs.html',
    controller: 'MainCtrl'
  }).state('viewBlog',{
    url:'/posts/:id/view',
    templateUrl: 'blog-view.html',
    controller: 'MainCtrl'
  }).state('newBlog', {
    url: 'posts/new',
    templateUrl: 'blog-add.html',
    controller: 'CreateCtrl'
  });
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
})

.factory('Post', function($resource){
  return $resource('http://localhost:3000/posts/:id',
   {id: '@id'}, {
    'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query': {method:'GET', isArray: false},
    'update': {method: 'PUT'}
  });
})

.controller('MainCtrl', function($scope, $state, $stateParams, Post) {

  $scope.posts=Post.query(function(data){});

  $scope.post = Post.get({id: $stateParams.id});

})

.controller('CreateCtrl', function($scope, $state, $stateParams, Post){

    $scope.post = new Post();

    $scope.addPost = function(){
      $scope.post.$save(function(){
        $state.go('blogs');
      });
    };

 });
