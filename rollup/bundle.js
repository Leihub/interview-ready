(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var MathHandle =
  /*#__PURE__*/
  function () {
    function MathHandle(x, y) {
      _classCallCheck(this, MathHandle);

      this.x = x;
      this.y = y;
    }

    _createClass(MathHandle, [{
      key: "add",
      value: function add() {
        return this.x + this.y;
      }
    }]);

    return MathHandle;
  }(); // es5 构造函数写法


  function MathHandle2(x, y) {
    this.x = x;
    this.y = y;

    this.walk = function () {
      console.log(this);
    };
  }

  MathHandle2.prototype.add = function () {
    return this.x + this.y;
  };

  var a = new MathHandle2(1, 2);
  var b = new MathHandle(1, 2);
  console.log(a.walk());
  console.log("b.__proto__ === MathHandle.prototype?".concat(b.__proto__ === MathHandle.prototype));
  console.log("MathHandle.prototype.constructor === MathHandle?".concat(MathHandle.prototype.constructor === MathHandle));
  console.log("".concat(typeof MathHandle === 'function'));

}));
