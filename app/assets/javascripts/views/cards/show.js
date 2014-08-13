TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST["cards/show"],
  
  events: {
    "click button.destroy-card" : "destroy",
    "click button.crossoff" : "crossoff",
    "click button.crossed" : "uncross"
  },
  
  destroy: function (event) {
    event.preventDefault();
    this.model.destroy();
  },

  crossoff: function (event) {
    var that = this;
    this.model.save({ description: "crossed" }, { success: function() {
      that.render();
    }});
  },

  uncross: function (event) {
    var that = this;
    this.model.save({ description: "uncrossed" }, { success: function() {
      that.render();
    }});
  },
  
  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  }
});