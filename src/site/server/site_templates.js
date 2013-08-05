SiteTemplates = new Meteor.Collection("site_templates");

Meteor.startup(function(){
   
    Meteor.publish("site_templates", function(){
	return SiteTemplates.find();
    });
    
});