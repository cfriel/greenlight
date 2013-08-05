Package.describe({
  summary: "Greenlight core"
});

Package.on_use(function (api, where) {

    api.use('router', ['client', 'server']);
    api.use(['templating'], 'client');
    
    api.add_files('client/greenlight.js', 'client');
    api.add_files('server/greenlight.js', 'server');
});

Package.on_test(function (api) {
    api.add_files('greenlight_tests.js', 'client');
});
