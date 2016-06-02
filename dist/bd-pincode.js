!function(e,i){"use strict";if("function"==typeof define&&define.amd)define(["angular"],i);else{if("undefined"==typeof module||"object"!=typeof module.exports)return i(e.angular);module.exports=i(require("angular"))}}(this,function(e){"use strict";var i="bdPincode",t=e.module(i,[]);return t.directive("bdPincode",["$timeout",function(e){return{restrict:"E",replace:!0,require:"ngModel",template:'<div ng-class="bdPincodeClass"><span ng-repeat="digit in digits track by $index" >{{digit}}</span></div>',scope:{hideDigits:"=",valid:"=",ngModel:"="},link:function(i,t,n,r){var u=n.digits?parseInt(n.digits||4):4,d=n.hideTime?parseInt(n.hideTime||500):500;i.bdPincodeClass=n["class"];var o=function(e){return Array.prototype.slice.call(e||[],0).join("")},a=function(e){return(e||"").split("").slice(0,u)},c=function(){i.ngModel=o(r.$viewValue)},s=function(){i.digits=i.hideDigits?r.$viewValue.map(function(e){return"•"}):r.$viewValue},l=function(){var t=r.$viewValue.length,n=i.digits?i.digits.length:0;i.hideDigits&&e(function(){i.digits=r.$viewValue.map(function(e){return"•"})},d),i.digits=r.$viewValue.map(function(e,u){return u===t-1&&t>n||!i.hideDigits?r.$viewValue[u]:"•"})};r.$formatters.push(a),r.$render=l,i.$watch("ngModel",c),i.$watch("hideDigits",s)}}}]),t.directive("bdKeypad",["$timeout",function(e){return{restrict:"E",template:'<table ng-keyDown="keyPress($event)"><tr ng-repeat="row in numpad"><td ng-repeat="number in row"><button id="bdKeypadBtn_{{number}}" type="button" ng-click="clickNumber(number)">{{number}}</button></td></tr></table>',scope:{ngModel:"="},link:function(e,i,t){e.clickNumber=function(i){e.ngModel=n(e.ngModel,i)};var n=function(e,i){switch(i){case"C":return"";case"<":return e.substring(0,e.length-1);default:return e+i}};e.numpad=[[1,2,3],[4,5,6],[7,8,9],["C",0,"<"]]}}}]),i});