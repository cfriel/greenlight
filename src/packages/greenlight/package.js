Package.describe({
  summary: "Greenlight core"
});

Package.on_use(function (api, where) {

    api.use('router', ['client', 'server']);
    api.use(['templating'], 'client');
    
    api.add_files('client/greenlight.js', 'client');
    api.add_files('server/greenlight.js', 'server');

    api.add_files('client/greenlight.site.js', 'client');
    api.add_files('server/greenlight.site.js', 'server');

    api.add_files('client/greenlight.activity.js', 'client');
    api.add_files('server/greenlight.activity.js', 'server');

    api.add_files('client/greenlight.package.js', 'client');
    api.add_files('server/greenlight.package.js', 'server');

    api.add_files('client/greenlight.notification.js', 'client');
    api.add_files('server/greenlight.notification.js', 'server');

    api.add_files('client/greenlight.server.js', 'client');
    api.add_files('server/greenlight.server.js', 'server');

    api.add_files('client/greenlight.service.js', 'client');
    api.add_files('server/greenlight.service.js', 'server');

    api.add_files('client/greenlight.entitlement.js', 'client');
    api.add_files('server/greenlight.entitlement.js', 'server');

    api.add_files('client/greenlight.audience.js', 'client');
    api.add_files('server/greenlight.audience.js', 'server');

    api.add_files('client/greenlight.dataset.js', 'client');
    api.add_files('server/greenlight.dataset.js', 'server');

    api.add_files('client/greenlight.process.js', 'client');
    api.add_files('server/greenlight.process.js', 'server');


});

Package.on_test(function (api) {
    api.add_files('greenlight_tests.js', 'client');
});
