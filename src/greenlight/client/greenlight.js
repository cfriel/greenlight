Sites = new Meteor.Collection("sites");

if (Meteor.isClient) {

    Template.user_logged_in.events({
	'click #logout' : function(e,t)
	{
	    Meteor.logout();
	}
    });

    Template.login.events({
	
	'submit #login-form' : function(e, t){

	    e.preventDefault();
	    var email = t.find('#login-email').value;
            var password = t.find('#login-password').value;
	    
            Meteor.loginWithPassword(email, password, function(err){
		if (err)
		{
		}
		else
		{
		}
	    });
            return false; 
	}
    });

    Template.register.events({
	'submit #register-form' : function(e, t) {
	    e.preventDefault();
	    var email = t.find('#account-email').value;
	    var password = t.find('#account-password').value;
	    
	    Accounts.createUser({email: email, password : password}, function(err){
		if (err) {
		} else {
		}
		
            });
	    
	    return false;
	}
    });    
    
    Meteor.startup(function(){
	
    });
    

}

