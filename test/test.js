describe('bdpincode directive tests', function() {

  var $rootScope,
    $scope,
    $compile,
    el,
    $body = $('body'),
    ngModelCtrl,
    bdPincode = '<bd-pincode ng-model="test.model" digits="4" hide-digits="test.hide_digits" hide-time="500" valid="test.valid" class="test"/>',
    bdKeypad = '<bd-keypad ng-model="test.model"></bd-keypad>';
  beforeEach(module('bdPincode'));
  beforeEach(
    inject(function($compile, $rootScope) {
      scope = $rootScope.$new();
      compile = $compile;
    }));

  function createbdpincode() {
    var el, compel;
    el = bdPincode;
    compel = compile(el)(scope);
    scope.$digest();
    ngModelCtrl = compel.controller('ngModel');
    return compel;
  }

  function createbdkeypad() {
    var el, compel;
    el = bdKeypad;
    compel = compile(el)(scope);
    scope.$digest();
    return compel;
  }

  it("should have a class called test", function() {
    var el = createbdpincode();
    var isolatescope = el.isolateScope();
    isolatescope.test = {
      model: '1234',
      hide_digits: true,
      valid: true
    };
    isolatescope.$apply();
    expect(el.hasClass('test')).toBeTruthy();
  });


  //TODO:should have 4 digits
  //TODO:should hide/show digits
  //TODO:should be valid/invalid
  //TODO:should hide after x time

  //TODO:should clear ngModel
  //TODO:should add number
  //TODO:should delete last digit




});
