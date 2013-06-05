Globant HTML5 Bootcamp
======================

#Topic 4: AMD + RequireJS

##Exercises
1. Create a new index.html file as you did it the first day.
1. Add RequireJS .
1. Create the same Movie class as in the previous practice, but inside a module; the module will be an external file.
1. Create a Director class inside a module and set it as a dependency on the Movie module.
1. Add Director name:string, and a quotes:array properties, and a speak() methods; calling speak() will return director’s quotes.
1. Add a Director to a Movie. You should be able to do something like this in the console:
  ```
  var alien = new Movie();
  ...
  var ridleyScott = new Director(‘Ridley Scott’); //sets name in constructor
  ridleyScott.set('quotes', ['Cast is everything.', 'Do what ...']);
  alien.set('director', ridleyScott);
  alien.get('director').speak(); //output: Ridley Scott says: 'Cast is...'
  ```
1. Add jQuery as a module (hint: use the shim support).
1. Add jQuery Mobile as a module (hint: use the shim support).
1. Make Movie’s Director speak random quotes inside jQuery Mobile dialogs.

### (C)2013 - Federico Emanuel Freire