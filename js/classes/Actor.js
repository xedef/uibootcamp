/* Actor class is created following the Module patter at once. */

var Actor = function(initialAttributes){
    var attributes = {};

    if (initialAttributes){
        attributes = $.extend(attributes, initialAttributes);
    }

    var get = function(attributeName){
        return attributes[attributeName];
    };

    var set = function(attributeName, value){
        return attributes[attributeName];
    };
    return {
        get: get,
        set: set
    };
};



var A = (function(){
    var play = function(){
        return 'play';
    };

    var returnObject = {
        play: play
    };

    return $.extend(parent, returnObject);
});


var B = (function(){

    var parent = new A();

    var stop = function(){
        return 'stop';
    };

    var play = function(){
        return 'play B';
    };

    var returnObject = {
        stop: stop,
        play: play
    };

    return $.extend(parent, returnObject);

});