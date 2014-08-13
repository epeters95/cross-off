TrelloClone.Views.ListNew = Backbone.View.extend({
  template: JST["lists/new"],
  
  events: { "click button.submit" : "addList" },
  
  addList: function(event) {
    event.preventDefault();
    var board = this.model;
    
    // var newList = new TrelloClone.Models.List({
    //   title: $('input#list_title').val(),
    //   board_id: board.id
    // });
    var params = {
        title: this.$el.find("#list_title").val(),
        board_id: board.id
    }
    var newList = new TrelloClone.Models.List(params);
    // newList.save({}, {
    //   success: function() {
    //     board.lists().add(newList);
    //     console.log("Added list! :")
    //     console.log(newList);
    //     console.log("fetching...");
    //     var thatList = newList
    //     board.fetch( {
    //       success: function() {
    //         console.log(thatList);
    //       }
    //     });
    //   }
    // });
    board.lists().create(newList)
    this.$el.find("#list_title").val('');
    debugger;
  },
  
  render: function() {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  }
})