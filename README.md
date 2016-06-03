#bd pincode

A pin code directive that hides the last input digit after a preset amount of time.
A keypad directive that draws a simple keypad on the screen.

##Usage:

###Inject the `bdPincode` dependency in your angular app
```
angular.module('example', ['bdPincode']);
```
###In the DOM
```
<bd-pincode
  ng-model="pin.code"
  digits="{{pin.digits}}"
  hide-digits="pin.hide"
  hide-time="{{pin.hide_time}}"
  valid="pin.valid"
  class="">
</bd-pincode>

<bd-keypad
  ng-model="ec.pin.code">
</bd-keypad>
```

###In the controller
```
angular.module('example', ['bdPincode'])
  .controller('exampleController', ['$scope',function ($scope) {

    this.pin = {
      code: '',
      hide: true,
      digits: 4,
      hide_time: 500,
      valid: false
    };

  }
]);
```

###Styling and positioning

Use the class attribute on the directive.

##Example

Running example in example folder

![example](https://github.com/jestersimpps/bd-pincode/blob/master/example/bd-pincode.png)
