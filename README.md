Usage
=====

```javascript
var app = angular.module('app', ['l10n']);

app.config(function(l10nProvider) {
  l10nProvider.setDefaultLang('en');
  l10nProvider.setLang('es');
});

app.controller('homeCtrl', ['$scope', function($scope) {
  var ctrl = this;
  ctrl.content = {'title': {'en': 'Hello World', 'es': 'Hola mundo'}};
}]);
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>fhNgLocalize</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-rc.4/angular.min.js"></script>
</head>
<body ng-app="app">
    <div ng-controller="homeCtrl as ctrl">
        {{ctrl.content.title|l10n}}
    </div>
</body>
</html>
```