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
      var $handlebarsElement = $( 'script#handlebars-content' ),
          template,
          parent = $handlebarsElement.parent();

      if ( $handlebarsElement.length === 0 ) {
        return;
      }

      template = Handlebars.compile( $handlebarsElement.html() );
      parent.html( template( myProfile ) );
    };

    var showUnderscoreProfile = function() {
      var $underElement = $( 'script#underscore-content' ),
          parent = $underElement.parent();

      if ( $underElement.length === 0 ) {
        return;
      }

      var html = _.template( $underElement.html(), myProfile );

      parent.html(html);
    };

    var showDustProfile = function() {
      var $dustElement = $( 'script#dust-content' ),
          parent = $dustElement.parent();

      if ( $dustElement.length === 0 ) {
        return;
      }

      var compiled = dust.compile( $dustElement.html(), 'dustContent' );

      dust.loadSource( compiled );

      dust.render( 'dustContent', myProfile, function( err, out ) {
        parent.html( out );
      });

    };

    return {
      init: init
    };
  }

  return Topic5;
});