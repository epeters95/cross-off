TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: "/api/boards",
  
  model: TrelloClone.Models.Board,
  
  getOrFetch: function(id) {
    var board;
    var boards = this;
    if (board = this.get(id)) {
      board.fetch();
      return board;
    } else {
      board = new TrelloClone.Models.Board({id: id});
      board.fetch({
        success: function() { boards.add(board); }
      });
      return board;
    }
  }
});