var MovieObserver = function(){

};

MovieObserver.prototype.update = function(message){
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
});