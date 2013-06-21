define(['views/movieListItem', 'backbone'], function(MovieListItemView){

  var MovieListView = Backbone.View.extend({

    el: '.movies',

    tagname: 'ul',

    render: function(){
      var $el = $(this.el);

      this.collection.each(function( movie ) {
        var item = new MovieListItemView( { model: movie } );
        $el.append(item.render().el);
      });

      return this;
    }
  });

  return MovieListView;
});