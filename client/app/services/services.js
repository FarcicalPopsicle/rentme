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
    };
  })
   
  .factory('Item', function ($http, Upload) {
    return {
      addOne: function(item) {
        var data = {
            userid: item.userid,
            name: item.name,
            description: item.description,
            price: item.price,
        };
        if (item.files) {
          data.file = item.files[0];
        }
        return Upload.upload({
          url: '/items/add',
          data: data,
        }).then(function (resp) {
            return resp;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
            return resp;
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
          return resp;
        });
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
        });
      }
    };
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
        $window.location = '/signout';
      }
    }
  });
