Template.packages_page.packages = function()
{
    return SiteTemplates.find({}, {sort: {name: 1}});
}

Template.packages_page.rendered = function()
{
    Holder.run();
}