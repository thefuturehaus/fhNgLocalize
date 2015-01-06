(function() {
  'use strict';
  angular.module('fhNgLocalize', []);

  angular.module('fhNgLocalize').provider('l10n', function () {
    var verbose;
    var defaultLang;
    var lang;
    var setLang = function(value) {
      lang = value;
    };
    return {
      setDefaultLang: function(value) {
        defaultLang = value;
      },
      setLang: setLang,
      setVerbose: function(value) {
        verbose = value;
      },
      $get: function () {
        return {
          defaultLang: defaultLang,
          setLang: setLang,
          lang: lang
        }
      }
    }
  });

  angular.module('fhNgLocalize').filter('l10n', ['$rootScope', 'l10n', '$log', function($rootScope, l10n, $log) {
    return function(input) {
      try {
        return input[l10n.lang] || input[l10n.defaultLang];
      }
      catch (err) {
        if (l10n.verbose) {
          $log.error('fhNgLocalize: error localizing input', err);
        }
      }
      return null;
    };
  }]);
})();
