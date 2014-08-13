TrelloClone.Views.BoardNew = Backbone.View.extend({
  template: JST["boards/new"],
  
  events: { "click button.submit" : "newForm" },
  
  newForm: function(event) {
    event.preventDefault();
    var newBoard = new TrelloClone.Models.Board({
      title: $('input#board_title').val()
    });
    newBoard.save({}, {
      success: function() {
        TrelloClone.boards.add(newBoard);
        Backbone.history.navigate("#/boards/" + newBoard.id,
          { trigger: true} );
      }
    });
  },
  
  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})