Package.describe({
  summary: "Greenlight sample data"
});

Npm.depends({"csv": "0.3.3", "mongodb": "1.3.4"});

Package.on_use(function (api, where) {
    console.log("loaded sample data package");
    api.add_files('sample_data.js', 'server');
    api.add_files('zips/zips.js', 'server');
    api.add_files('people/people.js', 'server');
    api.add_files('crunchbase/crunchbase.js', 'server');
});

Package.on_test(function (api) {
    api.add_files('sample_data_tests.js', 'server');
});
