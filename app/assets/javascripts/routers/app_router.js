TrelloClone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "boardsIndex",
    "boards/:id" : "boardShow"
  },
  
  boardsIndex: function() {
    TrelloClone.boards.fetch();
    var index = new TrelloClone.Views.BoardsIndex();
    this._swapView(index);
  },
  
  boardShow: function(id) {
    var board = TrelloClone.boards.getOrFetch(id);
    var show = new TrelloClone.Views.BoardShow({
      model: board
    });
    this._swapView(show);
  },
  
  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    $('#main').html(newView.render().$el);
  }
});