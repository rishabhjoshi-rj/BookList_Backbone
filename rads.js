var Book = Backbone.Model.extend({
  defaults: {
    author: "",
    title: "",
    isbn: "",
  },
});

// Backbone Collection

var Books = Backbone.Collection.extend({});

var books = new Books();

// Backbone View for one book
var BookView = Backbone.View.extend({
  model: new Book(),
  tagName: "tr",

  initialize: function () {
    this.template = _.template($(".blogs-list-template").html());
  },
  events: {
    "click .delete-blog": "delete",
  },

  delete: function (e) {
    e.target.parentElement.parentElement.remove();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

// Backbone View for all books

var BooksView = Backbone.View.extend({
  model: books,
  el: $("#book-list"),
  initialize: function () {
    var self = this;
    this.model.on("add", this.render, this);
  },
  render: function () {
    var self = this;
    this.$el.html("");
    _.each(this.model.toArray(), function (book) {
      self.$el.append(new BookView({ model: book }).render().$el);
    });
    return this;
  },
});

var booksView = new BooksView();

$(document).ready(function () {
  $(".add").on("click", function (e) {
    e.preventDefault();

    var book = new Book({
      author: $("#author").val(),
      title: $("#title").val(),
      isbn: $("#isbn").val(),
    });
    $("#author").val("");
    $("#title").val("");
    $("#isbn").val("");

    books.add(book);
  });
});
