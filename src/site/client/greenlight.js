Deps.autorun(function(){
    var gl = Session.get("Greenlight:routes-changed");
    var pg = document.location.pathname;

    console.log(gl + " " + pg);

    Meteor.Router.to(pg);
});