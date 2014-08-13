TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards/index"],
  
  initialize: function() {
    this.listenTo(
      TrelloClone.boards, "sync add", this.render
    );
  },
  
  render: function() {

    var index = this.template({
      boards: TrelloClone.boards
    });
    this.$el.html(index);
    
    var form = new TrelloClone.Views.BoardNew();
    this.$el.find($(".board-new")).html(form.render().$el);
    
    return this;
  }
});