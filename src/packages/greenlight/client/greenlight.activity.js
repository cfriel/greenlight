/**
 *
 * The activity class provides functionlity supporting activity
 * streams.  Activities start and end, and can be updated
 * throughout their duration with additional information.  An
 * example of an activity is a user viewing a page, or editing
 * a piece of information.  Activities can be filtered by type
 * or audience and shown in an activity stream.
 *
 **/
greenlight.prototype.Activity = function()
{
    var start = null;
    var end = null;
    var description = null;
    var audience = null;
    var source = null;
    var updates = [];
};

greenlight.prototype.Activity.prototype.start = function()
{
};

greenlight.prototype.Activity.prototype.end = function()
{
};

greenlight.prototype.Activity.prototype.watch = function()
{
};

greenlight.prototype.Activity.prototype.update = function()
{
};

greenlight.prototype.Activity.prototype.destroy = function()
{
};

