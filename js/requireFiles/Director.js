/**
* Definition of Director module for require.js
*/
define(function(){
  function Director(directorName){
    var attributes = {name: 'unnamed director',
                      quotes: []};

    if (!!directorName) {
      attributes.name = directorName;
    }

    var set = function(attributeName, value){
        attributes[attributeName] = value;
    };

    var get = function(attributeName){
      return attributes[attributeName];
    };

    var speak = function(){
      if (attributes.quotes.length <= 0){
        return attributes.name + ' has nothing to say.';
      }

      var randomIndex = Math.floor(Math.random() * attributes.quotes.length);

      return attributes.quotes[randomIndex];
    };

    return {
      set: set,
      get: get,
      speak: speak
    };
  }

  return Director;
});