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
  });
})

.factory('Blog', function($resource){
  return $resource('http://localhost:3000/posts/:id',
   {id: '@id'}, {
    'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query': {method:'GET', isArray: false}
  });
})

.controller('MainCtrl', function($scope, $state, $stateParams, Blog) {


  $scope.posts=Blog.query(function(data){});

  $scope.post = Blog.get({id: $stateParams.id});

  $scope.post.$promise.then(function(data){
    console.log(data.post);
  })


})
