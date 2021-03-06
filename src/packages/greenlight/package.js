Package.describe({
  summary: "Greenlight core"
});

Npm.depends({mongodb: "1.3.4"});

Package.on_use(function (api, where) {

    api.use('router', ['client', 'server']);
    api.use(['templating'], 'client');
    api.use('deps', ['client','server']);
    api.use('npm', ['server']);

    api.add_files('lib/sprintf.js', 'client');
    api.add_files('lib/sprintf.js', 'server');
    
    api.add_files('client/greenlight.js', 'client');
    api.add_files('server/greenlight.js', 'server');

    api.add_files('client/greenlight.entity.js', 'client');
    api.add_files('server/greenlight.entity.js', 'server');

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

    api.add_files('client/greenlight.user.js', 'client');
    api.add_files('server/greenlight.user.js', 'server');

    api.add_files('client/greenlight.helpers.js', 'client');
    api.add_files('server/greenlight.helpers.js', 'server');

    api.add_files('client/greenlight.search.js', 'client');
    api.add_files('server/greenlight.search.js', 'server');

    api.add_files('client/greenlight.endpoint.js', 'client');
    api.add_files('server/greenlight.endpoint.js', 'server');

    api.add_files('client/greenlight.adapter.js', 'client');
    api.add_files('server/greenlight.adapter.js', 'server');

    api.add_files('client/greenlight.transform.js', 'client');
    api.add_files('server/greenlight.transform.js', 'server');

    api.add_files('client/greenlight.stream.js', 'client');
    api.add_files('server/greenlight.stream.js', 'server');

    api.export('Greenlight', 'client');
    api.export('Greenlight', 'server');
    
    api.export('Data', 'client');
    api.export('Data', 'server');

});

Package.on_test(function (api) {
    api.add_files('greenlight_tests.js', 'client');
});
