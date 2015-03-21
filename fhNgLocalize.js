(function() {
  'use strict';
  angular.module('fhNgLocalize', []);

  angular.module('fhNgLocalize').provider('l10n', function () {
    var translations;
    var reverseMap;
    var verbose;
    var defaultLang;
    var lang;
    var setLang = function(value) {
      lang = value;
    };
    var invert = function(obj) {
      var inverted = {};
      for (var key in obj) {
        inverted[obj[key]] = key;
      }
      return inverted;
    };
    var setTranslations = function(value, fallbackValue) {
      translations = value;
      reverseMap = invert(fallbackValue);
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
          lang: lang,
          isDefaultLang: function() { return lang === defaultLang; },
          setTranslations: setTranslations,
          getTranslations: function() { return translations; },
          "_": function(fallbackString) {
            try {
              var key = reverseMap[fallbackString];
              return translations[key] || fallbackString;
            } catch (e) {
              return fallbackString;
            }
          }
        };
      }
    };
  });

  angular.module('fhNgLocalize').directive('l10n', ['$log', 'l10n', function($log, l10n) {
    return {
      restrict: 'A',
      link: function ($scope, element, attrs) {
        var key = attrs.l10n;
        if (!key) {
          $log.warn("l10n attribute found with no value");
        }

        var translations = l10n.getTranslations();
        if (translations) {
          var item = l10n.getTranslations()[key];
          if (item) {
            element.html(item);
          }
          else {
            $log.warn("Missing translation for " + key);
          }
        }
        else if (!l10n.isDefaultLang()) {
          $log.error("No translations loaded. Did you call l10n.setTranslations(translated, default)?");
        }
      }
    };
  }]);

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
