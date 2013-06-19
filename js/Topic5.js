define(function() {
  function Topic5() {

    // this is where the JSON file that represents my
    // LinkedIn profile is going to be loaded into
    var myProfile;

    var init = function() {
      $( '#show-menu' ).bind( 'click', onShowMenuClick );
      $.getJSON( 'js/json/profile.json', function(loadedFile) {
        myProfile = loadedFile;
      });

      $( '#handlebars-profile' ).on( 'pageshow', showHandlebarsProfile );
      $( '#underscore-profile' ).on( 'pageshow', showUnderscoreProfile );
      $( '#dust-profile' ).on( 'pageshow', showDustProfile );
    };

    var onShowMenuClick = function() {
      $( '#menu-panel' ).panel( 'open' );
    };

    var showHandlebarsProfile = function() {
      var source   = $("#handlebars-content").html(),
          template = Handlebars.compile(source),
          parent = $("#handlebars-content").parent();

      parent.html( template( myProfile ) );
    };

    var showUnderscoreProfile = function() {
      var $underElement = $( '#underscore-content' ),
          parent = $underElement.parent();

      var html = _.template( $underElement.html(), myProfile );

      parent.html(html);
    };

    var showDustProfile = function() {

    };

    return {
      init: init
    };
  }

  return Topic5;
});