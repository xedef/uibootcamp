define(['requireFiles/Movie', 'requireFiles/Director'], function(Movie, Director){

  function Topic4(){
    var movie;
    var init = function(){
      movie = new Movie();
      movie.set('title', 'Alien');

      var ridleyScott = new Director('Ridley Scott');
      ridleyScott.set('quotes', ["Sex is boring unless you're doing it.",
                                "I'm a moviemaker, not a documentarian. I try to hit the truth.",
                                "The fundamental of anything as a director is material, material, material - script, script, script - once you have the script everything else is straightforward.",
                                "Never let yourself be seen in public unless they pay for it.",
                                "I think movies are getting dumber, actually. Where it used to be 50/50, now it's 3% good, 97% stupid.",
                                "I'm curious about doing a sequel. There's something in the android that lived. (On \"Blade Runner\")"]);
      movie.set('director', ridleyScott);

      $('#show-director-quote').bind('click', onShowDirectorQuote);
    };

    var onShowDirectorQuote = function(){
      $('#quote-dialog > div > h1').html(movie.get('director').get('name') + ' says...');
      $('#quote-text').html(movie.get('director').speak());
    };

    return {init: init};
  }

  return Topic4;
});