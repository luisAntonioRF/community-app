(function() {
  require.config({
    paths: {
      'jquery':           '../lib/jquery/jquery-1.10.2',
      'jquery-ui':        '../lib/jquery-ui/jquery-ui-1.10.3.custom',
      'data-tables':      '../lib/data-tables/jquery.dataTables',
      'blockUI':          '../lib/blockUI/jquery.blockUI',
      'angular':          '../lib/angular/angular',
      'angular-resource': '../lib/angular/angular-resource',
      'angular-mocks':    '../lib/angular/angular-mocks',
      'angularui':        '../lib/angularui/ui-bootstrap-0.4.0',
      'angularuitpls':    '../lib/angularui/ui-bootstrap-tpls-0.5.0',
      'underscore':       '../lib/underscore/underscore',
      'webstorage':       '../lib/angular-webstorage',
      'require-css':      '../lib/require-css',
      'require-less':     '../lib/require-less',
      'styles':           '../stylesheets',
      'test':             '../test/functional',
    },
    shim: {
      'angular': { exports: 'angular' },
      'angular-resource': { deps: ['angular'] },
      'angularui': { deps: ['angular'] },
      'angularuitpls': { deps: ['angular' ,'angularui' ] },
      'angular-mocks': { deps: ['angular'] },
      'webstorage': { deps: ['angular'] },
      'jquery-ui': { deps: ['jquery'] },
      'mifosX': {
        deps: [
          'angular',
          'angular-resource',
          'angularui',
          'angularuitpls',          
          'webstorage',
          'data-tables',
          'blockUI',
          'jquery-ui'
        ],
        exports: 'mifosX'
      }
    },
    packages: [
      {
        name: 'css',
        location: '../lib/require-css',
        main: 'css'
      },
      {
        name: 'less',
        location: '../lib/require-less',
        main: 'less'
      }
    ]
  });

  require(['mifosXComponents', 'mifosXStyles'], function() {
    require(['test/testInitializer'], function(testMode) {
      if (!testMode) {
        angular.bootstrap(document, ["MifosX_Application"]);
      }
    });
  });
}());
