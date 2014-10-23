(function() {
  'use strict';
  angular.module('fhNgLocalize', []);

  angular.module('fhNgLocalize').provider('l10n', function () {
    var defaultLang;
    var lang;
    return {
      setDefaultLang: function(value) {
        defaultLang = value;
      },
      setLang: function(value) {
        lang = value;
      },
      $get: function () {
        return {
          defaultLang: defaultLang,
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
        $log.error('fhNgLocalize: error localizing input', err);
      }
      return null;
    };
  }]);
})();
