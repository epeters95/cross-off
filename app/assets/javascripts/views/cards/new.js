TrelloClone.Views.CardNew = Backbone.View.extend({
  template: JST["cards/new"],
  
  events: {
    "click button.submit" : "addCard"
  },
  
  addCard: function (event) {
    event.preventDefault();
    var list = this.model;
    
    var newCard = new TrelloClone.Models.Card({
      title: this.$el.find($("input#card-title")).val(),
      list_id: list.id,
      description: this.$el.find($("input#card-desc")).val()
    });
    newCard.save({}, {
      success: function () {
        list.cards().add(newCard)
      }
    });
    
    $(".card-new").find("#card-title").val('');
    $(".card-new").find("#card-desc").val('');
  },
  
  render: function () {
    var form = this.template();
    this.$el.html(form);
    return this;
  }
  
});