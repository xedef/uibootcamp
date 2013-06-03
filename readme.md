Globant HTML5 Bootcamp
======================

#Topic 3: Design Patterns and OOP in Javascript

##Exercises
1. Create a Movie object:

    Movie
    -attributes : hashmap

    + play()
    + stop()
    + set(attr:string, value)
    + get(attr:string)

1. Instantiate some of your favourite movies and play with them in the console.
1. Add a MovieObserver class that listens for “playing” and “stopped” events.
1. Publish “playing” event on Movie.play().
You should be able to do something like this in the console:
```
var terminator = new Movie();
terminator.set('title', 'Terminator');
...
terminator.play(); //output: Playing Terminator...
```

1. Publish “stopped” event on Movie.stop().
1. Log to console when each event is fired.
1. Refactor Movie class as a Module keeping your previous code for reference.
1. Create a DownloadableMovie that extends from Movie adding a download method.
1. Create a  mixin object called Social with the methods: share(friendName) and like().
1. Apply the mixin to Movie object and play with the console output.
You should be able to do something like this in the console:
```
var ironman2 = new Movie();
ironman2.set('title', 'Iron Man 2');
...
ironman2.share(‘V. Rivas’); //output: Sharing Iron Man 2 with V. Rivas
```
1. Create an Actor class and create some actors from one of your favorite movies.
1. Show how you would add an array of actors to a Movie object.


### (C)2013 - Federico Emanuel Freire
