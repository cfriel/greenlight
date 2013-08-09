Template.packages_page.packages = function()
{
    return SiteTemplates.find();
}

Template.packages_page.rendered = function()
{
    Holder.run();
}
