define(['backbone'], function(){
  var MovieListItemView = Backbone.View.extend({
    tagname: 'li',

    className: 'movie-item',

    render: function(){
      $(this.el).html(this.model.get('name'));

      return this;
    }
  });

  return MovieListItemView;
});