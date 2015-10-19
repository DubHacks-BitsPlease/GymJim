Template.myGoals.onRendered(function() {
  
  console.log("crap");
  //  var ref = new Firebase("http://ransome.firebaseio.com/" + Meteor.userId());
    var ref = new Firebase("http://ransome.firebaseio.com/10207164130957518");
            ref.on("value", function(snapshot) {
                var changedPost = snapshot.val();

                if(changedPost >= dataPass){
                    
                  
                      Todos.insert({
                        listId: myListId,
                        text: Meteor.user().services.facebook.name + " ran for " +  changedPost  + " minutes today!",
                        checked: false,
                        createdAt: new Date()
                      });
                      Lists.update(this._id, {$inc: {incompleteCount: 1}});
                    }
              });

});

Template.myGoals.helpers({
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
