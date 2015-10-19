myListId = -1;
Template.flogin.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
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
