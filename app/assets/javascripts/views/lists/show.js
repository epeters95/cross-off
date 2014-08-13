TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  events: {
    "click button.destroy-list" : "destroy",
    "sortremove" : "removeCard",
    "sortreceive" : "receiveCard",
    "sortstop" : "saveCards"
  },

  orderOptions: {
    modelElement: ".show-card",
    modelName: "card"
  },

  className: "show-list",

  attributes: function() {
    return { 'data-list-id': this.model.id };
  },
  
  destroy: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
  
  initialize: function () {
    this.listenTo(this.model.cards(), "add", this.addCardView);
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "remove", this.removeCardView);

    var view = this;
    this.model.cards().each(function (card) {
      var cardView = new TrelloClone.Views.CardShow({
        model: card
      });
      view.addSubview(".cards", cardView);
    });
  },
  
  addCardView: function (card) {
    var cardView = new TrelloClone.Views.CardShow({
      model: card
    });
    this.addSubview(".cards", cardView);
  },

  receiveCard: function(event, ui) {
    var $cardDisplay = $(ui.item.find(".show-card")[0]),
        cardId = $cardDisplay.data('card-id'),
        newOrd = $cardDisplay.index();
    var cardClone = new TrelloClone.Models.Card({
      id: cardId,
      list_id: this.model.id,
      ord: newOrd
    });
    cardClone.save();

    this.model.cards().add(cardClone, {silent: true});
    this.saveCards(event);
  },

  removeCard: function(event, ui) {
    var $cardDisplay = ui.item,
        cards = this.model.cards(),
        cardToRemove = cards.get($cardDisplay.data('card-id'));

    cards.remove(cardToRemove);
  },
  
  removeCardView: function (card) {
    var cardView;
    var that = this;
    _(this.subviews(".cards")).each(function(subview) {
      if (subview.model.id === card.id) {
        that.removeSubview(".cards", subview);
      }
    });
    this.render();
  },
  
  render: function () {
    var content = this.template({ list: this.model });
    this.$el.html(content);

    this.model.cards().each(this.addCardView.bind(this));
    this.$(".cards").sortable({ connectWith: ".cards" });

    var cardNew = new TrelloClone.Views.CardNew({
      model: this.model
    });
    this.addSubview(".card-new", cardNew);

    return this;
  },

  saveCards: function(event) {
    event.stopPropagation();
    var cards = this.$(".show-card"),
    collection = this.model.cards();
    cards.each(function(index, element) {
      var $cardElement = $(element),
          cardId = $cardElement.data("card-id"),
          card = collection.get(cardId);
      if (card.get('ord') === index) {
        return;
      }
      card.save({ord: index}, { silent: true });
    });
  }
});