/**
* Definition of Movie module for require.js
*/
define(['./Director'], function(Director){
  function Movie(){
    var attributes = {title: 'untitled movie'},
      observers = [];

    var get = function(attributeName){
      return attributes[attributeName];
    };

    var notifyObservers = function(eventName, message){
      var eventObservers = observers[eventName];
      for (var i = 0; eventObservers && i < eventObservers.length; i++) {
        eventObservers[i](message);
      }
    };

    return {
      set: function(attributeName, value){
          attributes[attributeName] = value;
      },

      get: get,

      play: function(){
        notifyObservers('play', 'Playing ' + this.get('title') + '...');
        console.log('playing');
      },

      stop: function(){
        notifyObservers('stop', 'Stopped ' + this.get('title') + '...');
        console.log('stopped');
      },

      addObserver: function(eventName, fn){
        var eventObservers = observers[eventName];
        if (!eventObservers){
          observers[eventName] = [fn];
        }
        else{
          observers[eventName].push(fn);
        }
      }
    };
  }

  return Movie;
});