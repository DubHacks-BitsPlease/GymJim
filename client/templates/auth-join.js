var ERRORS_KEY = 'joinErrors';

Template.join.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.join.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.join.events({
  'submit': function(event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=confirm]').val();

    var errors = {};

    if (! email) {
      errors.email = 'Email required';
    }

    if (! password) {
      errors.password = 'Password required';
    }

    if (confirm !== password) {
      errors.confirm = 'Please confirm your password';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    Accounts.createUser({
      email: email,
      password: password
    }, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }

      if(Lists.find({userId: Meteor.userId(), name: "My Statuses"}).count() < 1) {
                var statusList = {name: 'My Statuses', incompleteCount: 0};
                statusList._id = Lists.insert(statusList);
                Lists.update(statusList._id, {$set: {userId: Meteor.userId()}});
      }

      if(Lists.find({userId: Meteor.userId(), name: "My Goals"}).count() < 1) {
          var goalsList = {name: 'My Goals', incompleteCount: 0};
          goalsList._id = Lists.insert(goalsList);
          myListId = goalsList._id;
          Lists.update(goalsList._id, {$set: {userId: Meteor.userId()}});
      }

      if(Lists.find({userId: Meteor.userId(), name: "My Friend's Goals"}).count() < 1) {
          var goalsList = {name: "My Friend's Goals", incompleteCount: 0};
          goalsList._id = Lists.insert(goalsList);
          Lists.update(goalsList._id, {$set: {userId: Meteor.userId()}});
      }

      if(Lists.find({userId: Meteor.userId(), name: "Ransome Pot"}).count() < 1) {
          var ransomeList = {name: 'Ransome Pot', incompleteCount: 0};
          ransomeList._id = Lists.insert(ransomeList);
          Lists.update(ransomeList._id, {$set: {userId: Meteor.userId()}});
      }

      Router.go('home');
    });
  }
});
