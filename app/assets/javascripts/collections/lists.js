TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: "/api/lists/",
  
  model: TrelloClone.Models.List,
  
  comparator: function(collection) {
    return collection.get("ord");
  },
  
  initialize: function (models, options) {
    this.board = options.board;
  }
});