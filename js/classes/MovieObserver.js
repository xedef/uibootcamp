var MovieObserver = Object.create(null);

MovieObserver.update = function(message){
  console.log(message);
};

/*
--------------------------------------------------------------------------------
*/

var MovieObserverModule = (function(){
  return {
    update: function(message){
      console.log('Module: ' + message);
    }
  };
})();