// conf.js
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html',
  cleanDestination: false,
  showSummary: false,
  showConfiguration: false,
  reportTitle: null
});


exports.config = {
  framework: 'jasmine',
  seleniumServerJar: './node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.3.1.jar',
  geckoDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.15.0',
  // seleniumAddress: 'http://localhost:4444/wd/hub',

  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  suites: {
    ensuite: 'tests/ensuite/*spec.js',
    search: ['tests/e2e/contact_search/**/*Spec.js',
      'tests/e2e/venue_search/**/*Spec.js']
  },

  capabilities: {
          browserName: 'chrome',
          // count: 2,
          shardTestFiles: true,
          maxInstances: 2,
      },

  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  },

   // onPrepare: function() {
   //    jasmine.getEnv().addReporter(
   //      new Jasmine2HtmlReporter({
   //        savePath: 'target/screenshots',
   //        // takeScreenshots: true,
   //        // takeScreenshotsOnlyOnFailures: true,
   //        // fixedScreenshotName: true,
   //        cleanDestination: false
   //      })
   //    );
   // }

  // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance
  onPrepare: function() {
    jasmine.getEnv().addReporter(reporter);
  },

  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
  
};