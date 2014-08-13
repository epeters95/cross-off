TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  events: {
    "click button.destroy" : "destroy",
    "sortstop" : "saveLists"
  },
  
  destroy: function() {
    this.model.destroy();
    Backbone.history.navigate("#", { trigger: true });
  },
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addListView);
    this.listenTo(this.model.lists(), "remove", this.removeList);
    
    var view = this;
    this.model.lists().each(function (list) {
      var listView = new TrelloClone.Views.ListShow({
        model: list
      });
      view.addSubview(".lists", listView);
    });
  },
  
  addListView: function (obj) {
    var listView = new TrelloClone.Views.ListShow({
      model: obj
    });
    this.addSubview(".lists", listView);
  },
  
  render: function() {
    var content = this.template({
      board: this.model
    });
    this.$el.html(content);

    this.model.lists().each(this.addListView.bind(this));
    this.$(".lists").sortable();

    var listNew = new TrelloClone.Views.ListNew({
      model: this.model
    });
    this.addSubview(".list-new", listNew);

    return this;
  },
  
  removeList: function(list) {
    var listView;
    var that = this;
    _(this.subviews(".lists")).each(function(subview) {
      if (subview.model.id === list.id) {
        that.removeSubview(".lists", subview);
      }      
    })
    this.render();
  },

  saveLists: function(event) {
    event.stopPropagation();
    var lists = this.$(".show-list"),
    collection = this.model.lists();
    lists.each(function(index, element) {
      var $listElement = $(element),
          listId = $listElement.data("list-id"),
          list = collection.get(listId);
      if (list.get('ord') === index) {
        return;
      }
      list.save({ord: index}, { silent: true });
    });
  }
});