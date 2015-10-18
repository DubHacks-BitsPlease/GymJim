Template.statusUpdates.onRendered(function() {
  
});

Template.statusUpdates.helpers({
  editing: function() {
    return Session.get(EDITING_KEY);
  },

  todosReady: function() {
    return Router.current().todosHandle.ready();
  },

  todos: function(listId) {
    return Todos.find({listId: listId}, {sort: {createdAt : -1}});
  }
});

var editList = function(list, template) {
  Session.set(EDITING_KEY, true);

  // force the template to redraw based on the reactive change
  Tracker.flush();
  template.$('.js-edit-form input[type=text]').focus();
};

var saveList = function(list, template) {
  Session.set(EDITING_KEY, false);
  Lists.update(list._id, {$set: {name: template.$('[name=name]').val()}});
}