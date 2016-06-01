/*
    bd-pincode
    Author: Jester Simpps
    Copyright (c) 2016 Jester Simpps - jestersimpps.github.io , released under the MIT license.
*/

/* bd-pincode. Creates an input panel for pincodes that autohides characters after a preset time interval */

(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['angular'], factory);
  } else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    module.exports = factory(require('angular'));
  } else {
    return factory(root.angular);
  }
}(this, function(angular) {
  'use strict';

  //style additions:
  // var s = document.createElement("style");
  // s.type = "text/css";
  // s.innerHTML = '';
  // s&&document.body.appendChild(s);

  // <bd-pincode ng-model="pin.code" digits="pin.digits" hide-digits="pin.hide" hide-time="pin.hide_time" valid="pin.valid"/>
  // <bd-keypad ng-model="pin.code"/>


  var moduleName = 'bdPincode';
  var mod = angular.module(moduleName, []);

  mod.directive('bdPincode', ['$timeout', function($timeout) {
    return {
      restrict: 'E',
      template: '<input type="text">',
      link: function(scope, element, attributes, controller) {
        var digits = parseInt(attributes.digits);
        var hide_time = parseInt(attributes.hideTime);

        function autoHide(timeOut) {
          $timeout(function() {

          }, timeOut);
        }
      }
    }
  }]);


  mod.directive('bdKeypad', [function() {
    return {
      restrict: 'E',
      template: '<table>' +
        '<tr ng-repeat="row in numpad">' +
        '<td ng-if="row.length < 3"></td>' +
        '<td ng-repeat="number in row">' +
        '<button type="button" name="button" class="btn btn-default" ng-click="addNumber(number)">{{number}}</button>' +
        '</td>' +
        '</tr>' +
        '</table>',
      link: function(scope, element, attributes, controller) {
        scope.numpad = [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          [0]
        ];
        scope.addNumber = function(number) {
          console.log(number);
        }
      }
    }
  }]);



  return moduleName;


}));
