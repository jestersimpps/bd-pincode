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

  var moduleName = 'bdPincode';
  var mod = angular.module(moduleName, []);


  /**
   * @desc output directive for pincode.
   * @example <bd-pincode ng-model="pin.code" digits="4" hide-digits="pin.hide" hide-time="pin.hide_time" valid="pin.valid"/>
   */
  mod.directive('bdPincode', ['$timeout', function($timeout) {
    return {
      restrict: 'E',
      replace: true,
      require: 'ngModel',
      template: '<div ng-class="bdPincodeClass">' +
        '<span ng-repeat="digit in digits track by $index" >{{digit}}</span>' +
        '</div>',
      scope: {
        hideDigits: '=',
        valid: '=',
        ngModel: '=',
      },
      link: function(scope, element, attributes, ngModelCtrl) {

        //declare directive variables
        //check if attribute exists, if not, pass default values.
        //get the values from the element attributes object in case it does exist
        //convert them to integers or if they are blank, pass default values
        var amount_digits = attributes.digits ? parseInt(attributes.digits || 4) : 4;
        var hide_time = attributes.hideTime ? parseInt(attributes.hideTime || 500) : 500;

        //get the class attribute of the element and apply the class to the template
        scope.bdPincodeClass = attributes.class;

        //implode the digit array back to a string
        var toModel = function(val) {
          return Array.prototype.slice.call((val || []), 0).join('')
        };

        //generates a formatter for ngModelCtrl
        //converts a series of characters to a digit array used by this directive
        //restricts the array size to 'amount_digits'
        var toView = function(val) {
          //return input state
          scope.valid = validator(val);
          //formatter logic
          return (val || '').split('').slice(0, amount_digits);
        };

        //check if input has amount_digits and all are numbers
        var validator = function(val) {
          return val.length === amount_digits && !isNaN(parseFloat(val)) && isFinite(val);
        }

        //executed every time ngModel changes
        var modelWatcher = function() {
          //assign the converted directive viewvalue to ngModel
          scope.ngModel = toModel(ngModelCtrl.$viewValue);
        }

        //executed every time hideDigits changes
        //if hideDigits == true, convert all digits to dots
        //if hideDigits == false, leave as is
        var hideWatcher = function() {
          scope.digits = scope.hideDigits ? ngModelCtrl.$viewValue.map(function(d) {
            return "\u2022"
          }) : ngModelCtrl.$viewValue;
        }

        //render function called after ngModel view formatter conversion
        var render = function() {
          //get the length of the new pin code
          var newlen = ngModelCtrl.$viewValue.length;
          //get the length of the old pin code
          var curlen = scope.digits ? scope.digits.length : 0;

          //hide last character later
          //triggers a timeout that converts all digits to dots after 'hide_time'
          //skip timeout if scope.hideDigits == false
          scope.hideDigits && $timeout(function() {
            scope.digits = ngModelCtrl.$viewValue.map(function(d) {
              return "\u2022"
            });
          }, hide_time);

          //show now
          //show last pin character if new pin length > old pin length
          //leave as is if scope.hideDigits == false
          scope.digits = ngModelCtrl.$viewValue.map(function(v, i) {
            return ((i === newlen - 1 && curlen < newlen) || !scope.hideDigits ? ngModelCtrl.$viewValue[i] : "\u2022")
          })
        }

        //push the view formatter to the ngModelController
        ngModelCtrl.$formatters.push(toView);
        //trigger the render function of the ngModelController
        ngModelCtrl.$render = render;
        //watchers for external changes
        scope.$watch('ngModel', modelWatcher);
        scope.$watch('hideDigits', hideWatcher);

      }
    }
  }]);



  /**
   * @desc draws a keypad on the screen, sends numbers to bdPincode directive
   * @example<bd-keypad ng-model="pin.code"/>
   */
  mod.directive('bdKeypad', ['$timeout', function($timeout) {
    return {
      restrict: 'E',
      template: '<table ng-keyDown="keyPress($event)">' +
        '<tr ng-repeat="row in numpad">' +
        '<td ng-repeat="number in row">' +
        '<button type="button" ng-click="clickNumber(number)">{{number}}</button>' +
        '</td>' +
        '</tr>' +
        '</table>',
      scope: {
        ngModel: '=',
      },
      link: function(scope, element, attribute) {

        //scope function called when buttons are clicked
        scope.clickNumber = function(number) {
          //assign the transformed pincode to ngModel
          scope.ngModel = transformPin(scope.ngModel, number);
        }

        // //on keypress, modify ngModel
        // scope.keyPress = function(e) {
        //   e.preventDefault();
        //   var key = e.code.substr(e.code.length - 1);
        //   switch (key) {
        //     case 'e':
        //       scope.ngModel = transformPin(scope.ngModel, '<');
        //       break;
        //     default:
        //       scope.ngModel = transformPin(scope.ngModel, key);
        //   }
        // }

        //uses the input of the keypad to transform the pincode data
        //returns the transformed data
        var transformPin = function(pin, number) {
          switch (number) {
            case 'C':
              return '';
            case '<':
              return pin.substring(0, pin.length - 1);
            default:
              return (pin + number);
          }
        }

        //array that draws the keypad
        scope.numpad = [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          ['C', 0, '<']
        ];

      }
    }
  }]);



  return moduleName;


}));
