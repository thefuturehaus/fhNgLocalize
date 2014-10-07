(function() {
  'use strict';
  angular.module('fhLocalize', []);

  angular.module('fhLocalize').provider('l10n', function () {
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

  angular.module('fhLocalize').filter('l10n', function($rootScope, l10n) {
    return function(input) {
      return input[l10n.lang] || input[l10n.defaultLang];
    };
  });
})();
