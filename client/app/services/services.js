angular.module('e-Commer.services', ['ngFileUpload'])
  
  .factory('Search', function ($http) {
    return {
      // get array of search inputs and return the results
      getAll: function(search) {
        return $http({
          method: 'POST',
          url: '/search',
          data: search
        })
        .then(function (resp) {
          return resp.data;
        });
      },

    }
  })
   
  .factory('Item', function ($http, Upload) {
    return {

      // add an item from a user: zombie code that worked, but didn't sent a bunch of info like blobURL
      // addOne: function(item) {
      //   console.log('Item factory: addOne called with item: ', item);
      //   return $http({
      //     method: 'POST',
      //     url: '/items/add',
      //     data: item
      //   })
      //   .then(function (resp) {
      //     console.log(resp);
      //     return resp;
      //   });
      // },

      addOne: function(item) {
        console.log('inside factory - Item. The item is: ', item);
        Upload.upload({
          url: '/items/add',
          data: {
            file: item.files[0], 
            userid: item.userid,
            name: item.name,
            description: item.description,
            price: item.price,
            }
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
      },

      addImages: function(image) {
        console.log('add Images was called in services.js');
        return $http({
          method: 'POST',
          url: '/items/addItemImage',
          data: image,
        })
        .then(function(res) {
          console.log(res);
          return res;
        });
      },

      deleteOne: function(item) {
        return $http({
          method: 'POST',
          url: '/items/delete'
        })
        .then(function (resp) {
          return resp;
        });
      }     
    }  
  })

  .factory('User', function ($http) {
    // var user = {};
    return {
      user: user,
      getUser: function(){
        return this.user;
      },
      // adds a user to the database
      addOne: function(user) {
        return $http({
          method: 'POST',
          url: '/users/add',
          data: user
        })
        .then(function (resp) {
          // this.user = resp.data;
          return resp;
        })
      },

      //deletes user from database
      deleteOne: function(user) {
        return $http({
          method: 'POST',
          url: '/users/delete'
        })
        .then(function (resp) {
          return resp;
        });
      },

      //returns a user 
      getUser: function(user) {
        return $http({
          method: 'GET',
          url: 'users/get'
        })
        .then(function (resp) {
          return resp.data;
        })
      }
    }
  })

//@Author: Jovani
//factory for Authentication, signup and signin methods
  .factory('Auth', function ($http, $location, $window) {
    var user;
    return {
      user:user,
      getProperty: function () {
          return user;
      },
      setProperty: function(value) {
          user = value;
      },
      //signup method for make a request and send the user info to the server
      signup : function(user) {
        return $http({
          method: 'POST', 
          url: '/signup', 
          data: user
        });
      },
      //signin method for make a request and send the user info to the server
      signin : function (callback) {
        $http({
          method: 'POST',
          url: '/signin'
        })
        .then(function (resp) {
          // resp.data.user[0]
          callback(resp.data);
        })
        .catch(function(err){
          console.log(err);
          return '404';
        });
      },

      isAuth: function () {
        return !!$window.localStorage.getItem('com.e-Commer');
      },
      signout: function () {
        $window.localStorage.removeItem('com.e-Commer');
        $location.path('/homepage');
      }
    }
  });
