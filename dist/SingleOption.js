"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SingleOption =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SingleOption, _React$Component);

  function SingleOption(props) {
    var _ref, _this$props$disabled, _ref2, _this$props$selected, _this$props$focused;

    var _this;

    _classCallCheck(this, SingleOption);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SingleOption).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOptionMouseEnter", function () {
      _this.props.onFocus && _this.props.onFocus.call(_assertThisInitialized(_assertThisInitialized(_this)), _this.props.option);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOptionMouseLeave", function () {
      _this.props.onBlur && _this.props.onBlur.call(_assertThisInitialized(_assertThisInitialized(_this)), _this.props.option);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOptionClick", function () {
      _this.props.onClick && _this.props.onClick.call(_assertThisInitialized(_assertThisInitialized(_this)), _this.props.option);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setDisabled", function () {
      var disabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      disabled !== null && _this.setState({
        disabled: !!disabled
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setSelected", function () {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      selected !== null && _this.setState({
        selected: !!selected
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setFocused", function () {
      var focused = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      focused !== null && _this.setState({
        focused: !!focused
      });
    });

    _this.state = {
      disabled: (_ref = (_this$props$disabled = _this.props.disabled) !== null && _this$props$disabled !== void 0 ? _this$props$disabled : _this.props.option.disabled) !== null && _ref !== void 0 ? _ref : false,
      selected: (_ref2 = (_this$props$selected = _this.props.selected) !== null && _this$props$selected !== void 0 ? _this$props$selected : _this.props.option.selected) !== null && _ref2 !== void 0 ? _ref2 : false,
      focused: (_this$props$focused = _this.props.focused) !== null && _this$props$focused !== void 0 ? _this$props$focused : false
    };
    return _this;
  }

  _createClass(SingleOption, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      prevProps.disabled !== this.props.disabled && this.props.disabled !== this.state.disabled && this.setDisabled(this.props.disabled);
      prevProps.selected !== this.props.selected && this.props.selected !== this.state.selected && this.setSelected(this.props.selected);
      prevProps.focused !== this.props.focused && this.props.focused !== this.state.focused && this.setFocused(this.props.focused);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          option = _this$props.option,
          className = _this$props.className,
          style = _this$props.style,
          styleFocused = _this$props.styleFocused,
          styleSelected = _this$props.styleSelected,
          styleDisabled = _this$props.styleDisabled,
          disabledProp = _this$props.disabled,
          selectedProp = _this$props.selected,
          focusedProp = _this$props.focused,
          _this$state = this.state,
          disabled = _this$state.disabled,
          selected = _this$state.selected,
          focused = _this$state.focused;

      var optionClassNames = "EzSelect-option" + (className ? " " + className : "") + (focused ? " EzSelect-focused" : "") + (selected ? " EzSelect-selected" : "") + (disabled ? " EzSelect-disabled" : ""),
          optionStyles = _objectSpread({}, style, focused && styleFocused, selected && styleSelected, disabled && styleDisabled);

      return _react.default.createElement("div", {
        key: "option_".concat(option.value),
        className: optionClassNames,
        onMouseEnter: this.handleOptionMouseEnter,
        onMouseLeave: this.handleOptionMouseLeave,
        onClick: disabled ? null : this.handleOptionClick,
        style: optionStyles,
        ref: function ref(_ref3) {
          return _this2.element = _ref3;
        }
      }, option.label);
    }
  }]);

  return SingleOption;
}(_react.default.Component);

exports.default = SingleOption;

_defineProperty(SingleOption, "propTypes", {
  option: _propTypes.default.shape({
    value: _propTypes.default.any.isRequired,
    label: _propTypes.default.any.isRequired,
    disabled: _propTypes.default.bool,
    selected: _propTypes.default.bool
  }).isRequired,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  styleFocused: _propTypes.default.object,
  styleDisabled: _propTypes.default.object,
  styleSelected: _propTypes.default.object,
  focused: _propTypes.default.bool,
  selected: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func
});

_defineProperty(SingleOption, "defaultProps", {
  noDefaultStyles: false,
  disabled: false,
  selected: false,
  focused: false
});