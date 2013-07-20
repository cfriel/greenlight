Package.describe({
  summary: "greenlight forms site template"
});

Package.on_use(function (api, where) {
    api.add_files('forms.js', 'client' );
});

Package.on_test(function (api) {
    api.add_files('forms_tests.js', 'client');
});
