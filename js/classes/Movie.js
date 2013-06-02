var Movie = Object.create(null);
Movie.attributes = {title: 'untitled movie'};
Movie.observers = [];

Movie.play = function(){
  this.notifyObservers('play', 'Playing ' + this.get('title') + '...');
  console.log('playing');
};

Movie.stop = function(){
  this.notifyObservers('stop', 'Stopped ' + this.get('title') + '...');
  console.log('stopped');
};

Movie.set = function(attributeName, value){
  this.attributes[attributeName] = value;
};

Movie.get = function(attributeName){
  return this.attributes[attributeName];
};

Movie.addObserver = function(eventName, fn){
  var eventObservers = this.observers[eventName];
  if (!eventObservers){
    this.observers[eventName] = [fn];
  }
  else{
    this.observers[eventName].push(fn);
  }
};

Movie.notifyObservers = function(eventName, message){
  var eventObservers = this.observers[eventName];

  for (var i = 0; eventObservers && i < eventObservers.length; i++) {
    eventObservers[i](message);
  }
};

/*
--------------------------------------------------------------------------------
*/

var MovieModule = (function(){
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
})();