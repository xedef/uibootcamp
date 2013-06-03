/* Actor class is created following the Module pattern at once. */

var Actor = (function(initialAttributes){
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
});

/**
* Actors have a list of attributes as Movie class has, accessed by get and set methods.
* Also, you can set a list of properties at once when creating the object by passing them
* in the constructor. Like this:
*
*   var actor = new Actor({name: 'Robert Downey Jr.'});
*
* For adding actors to your movie you have several ways. Here are a few:
*
* 1. Creating the array of Actors and assigning them all at once to the Movie:
*
*   var movie = new MovieModule();
*   var actors = [];
*
*   actors.push(new Actor({name: 'Robert Downey Jr.'}),
*               new Actor({name: 'Ggwyneth Paltrow'}));
*   ...
*   ...
*   actors.push(new Actor({name: 'Jon Favreau'}));
*   ...
*   ...
*   movie.set('actors', actors);
*
* 2. By creating the attribute in the movie object and then adding actors as you need to:
*
*
*   var movie = new MovieModule();
*   movie.set('actors', []);
*   ...
*   ...
*   movie.get('actors').push(new Actor({name: 'Robert Downey Jr.'}),
*                            new Actor({name: 'Ggwyneth Paltrow'}));
*   ...
*   ...
*   movie.get('actors').push(new Actor({name: 'Jon Favreau'}));
*
*
* For retrieving the actors, you can simply get the attribute and treat it like any array:
*   actors = movie.get('actors');
*   for (var i = 0; i < actors.length; i ++){
*     console.log(actors[i].get('name'));
*   }
*/