"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactEzDropdown = require("react-ez-dropdown");

var _Option = _interopRequireDefault(require("./Option"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultStyles = {
  wrapper: {
    display: "flex",
    position: "relative",
    height: "2em",
    borderRadius: 2,
    border: "1px solid #aaa",
    userSelect: "none",
    boxSizing: "border-box"
  },
  placeholder: {
    padding: ".25em 1em",
    boxSizing: "border-box",
    lineHeight: "1.5em",
    cursor: "default",
    background: "#fff"
  },
  arrow: {
    padding: ".5em",
    cursor: "pointer",
    width: "2em",
    height: "100%",
    color: "#aaa",
    background: "#fff",
    boxSizing: "border-box"
  },
  dropdown: {
    background: "#fff",
    position: "absolute",
    left: "-1px",
    top: "calc(100% + 4px)",
    borderRadius: 2,
    border: "1px solid #aaa",
    minWidth: "100%",
    padding: ".25rem 0"
  }
};

var Select =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    var _this;

    _classCallCheck(this, Select);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderOptions", function () {
      if (!_this.props.options || !_this.props.options.length) {
        return false;
      }

      return _this.props.options.map(function (option) {
        return _react.default.createElement(_Option.default, {
          key: "option_".concat(option.value),
          option: option,
          focused: _this.state.focusedOption === option,
          selected: _this.state.selectedOption === option,
          onFocus: _this.handleOptionFocus,
          onBlur: _this.handleOptionBlur,
          onClick: _this.handleOptionClick,
          noDefaultStyles: _this.props.noDefaultStyles
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOptionFocus", function (option) {
      if (_this.state.focusedOption !== option) {
        _this.setState({
          focusedOption: option,
          focusedOptionIdx: _this.props.options.indexOf(option)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOptionBlur", function (option) {
      if (_this.state.focusedOption === option) {
        _this.setState({
          focusedOption: null,
          focusedOptionIdx: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOptionClick", function (option) {
      if (_this.state.selectedOption !== option) {
        _this.setState({
          value: option.value,
          selectedOption: option,
          selectedOptionIdx: _this.props.options.indexOf(option)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDocumentKeyDown", function (e) {
      switch (e.key) {
        case "ArrowUp":
          _this.dropdownOpened ? _this.focusOption("up") : false;
          break;

        case "ArrowDown":
          _this.dropdownOpened ? _this.focusOption("down") : false;
          break;

        case "Home":
          _this.dropdownOpened && _this.focusOption("first");
          break;

        case "End":
          _this.dropdownOpened && _this.focusOption("last");
          break;

        case "Enter":
          _this.dropdownOpened && _this.setState({
            selectedOption: _this.state.focusedOption,
            selectedOptionIdx: _this.state.focusedOptionIdx
          });
          break;
      }

      e.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDropdownOpen", function () {
      _this.props.onOpen && _this.props.onOpen.call(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.wrapper && _this.wrapper.classList.add("EzSelect-opened");
      _this.dropdownOpened = true;
      document.body.addEventListener("keydown", _this.handleDocumentKeyDown);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDropdownClose", function () {
      _this.props.onClose && _this.props.onClose.call(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.wrapper && _this.wrapper.classList.remove("EzSelect-opened");
      _this.dropdownOpened = false;
      document.body.removeEventListener("keydown", _this.handleDocumentKeyDown);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFocus", function () {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleBlur", function () {});

    _this.dropdownOpened = false;
    _this.state = {
      value: null,
      focusedOption: null,
      focusedOptionIdx: -1,
      selectedOption: null,
      selectedOptionIdx: -1
    };
    return _this;
  }

  _createClass(Select, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener("keydown", this.handleDocumentKeyDown);
    }
  }, {
    key: "focusOption",
    value: function focusOption() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "first";
      var focusedOptionIdx = this.state.focusedOptionIdx;
      var options = this.props.options;
      var idxToFocus;

      switch (direction) {
        case "up":
          idxToFocus = focusedOptionIdx > 0 ? focusedOptionIdx - 1 : options.length - 1;
          break;

        case "down":
          idxToFocus = (focusedOptionIdx + 1) % options.length;
          break;

        case "last":
          idxToFocus = options.length - 1;
          break;

        case "first":
        default:
          idxToFocus = 0;
          break;
      }

      this.setState({
        focusedOptionIdx: idxToFocus,
        focusedOption: options[idxToFocus]
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          removeDropdownOnHide = _this$props.removeDropdownOnHide,
          options = _this$props.options,
          noDefaultStyles = _this$props.noDefaultStyles,
          tagName = _this$props.tagName,
          className = _this$props.className,
          style = _this$props.style,
          tabIndex = _this$props.tabIndex,
          placeholderTagName = _this$props.placeholderTagName,
          placeholderClassName = _this$props.placeholderClassName,
          placeholderStyle = _this$props.placeholderStyle,
          arrowTagName = _this$props.arrowTagName,
          arrowClassName = _this$props.arrowClassName,
          arrowStyle = _this$props.arrowStyle,
          arrowContent = _this$props.arrowContent,
          dropdownTagName = _this$props.dropdownTagName,
          dropdownClassName = _this$props.dropdownClassName,
          dropdownStyle = _this$props.dropdownStyle,
          placeholder = _this$props.placeholder,
          onOpen = _this$props.onOpen,
          onClose = _this$props.onClose,
          onChange = _this$props.onChange,
          props = _objectWithoutProperties(_this$props, ["removeDropdownOnHide", "options", "noDefaultStyles", "tagName", "className", "style", "tabIndex", "placeholderTagName", "placeholderClassName", "placeholderStyle", "arrowTagName", "arrowClassName", "arrowStyle", "arrowContent", "dropdownTagName", "dropdownClassName", "dropdownStyle", "placeholder", "onOpen", "onClose", "onChange"]);

      var wrapperClassNames = "EzSelect" + (className ? " " + className : ""),
          placeholderClassNames = "EzSelect-placeholder" + (placeholderClassName ? " " + placeholderClassName : ""),
          arrowClassNames = "EzSelect-arrow" + (arrowClassName ? " " + arrowClassName : ""),
          dropdownClassNames = "EzSelect-dropdown" + (dropdownClassName ? " " + dropdownClassName : "");

      var wrapperStyles = _objectSpread({}, !noDefaultStyles && defaultStyles.wrapper, style),
          placeholderStyles = _objectSpread({}, !noDefaultStyles && defaultStyles.placeholder, placeholderStyle),
          arrowStyles = _objectSpread({}, !noDefaultStyles && defaultStyles.arrow, arrowStyle),
          dropdownStyles = _objectSpread({}, !noDefaultStyles && defaultStyles.dropdown, dropdownStyle);

      return _react.default.createElement(tagName, _objectSpread({}, props, {
        className: wrapperClassNames,
        style: wrapperStyles,
        ref: function ref(_ref) {
          return _this2.wrapper = _ref;
        },
        key: "EzSelect",
        tabIndex: tabIndex,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        children: _react.default.createElement(_reactEzDropdown.Dropdown, {
          key: "EzSelect-dropdown"
        }, _react.default.createElement(_reactEzDropdown.DropdownTrigger, {
          tagName: placeholderTagName,
          className: placeholderClassNames,
          style: placeholderStyles,
          ref: function ref(_ref2) {
            return _this2.placeholder = _ref2;
          },
          key: "EzSelect-placeholder"
        }, placeholder), _react.default.createElement(_reactEzDropdown.DropdownTrigger, {
          tagName: arrowTagName,
          className: arrowClassNames,
          style: arrowStyles,
          ref: function ref(_ref3) {
            return _this2.arrow = _ref3;
          },
          key: "EzSelect-arrow"
        }, arrowContent), _react.default.createElement(_reactEzDropdown.DropdownContent, {
          tagName: dropdownTagName,
          removeOnHide: removeDropdownOnHide,
          className: dropdownClassNames,
          style: dropdownStyles,
          ref: function ref(_ref4) {
            return _this2.dropdown = _ref4;
          },
          key: "EzSelect-dropdown",
          onShow: this.handleDropdownOpen,
          onHide: this.handleDropdownClose
        }, this.renderOptions()))
      }));
    }
  }]);

  return Select;
}(_react.default.Component);

exports.default = Select;

_defineProperty(Select, "propTypes", {
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.any.isRequired,
    label: _propTypes.default.any.isRequired
  })),
  placeholder: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.element]),
  arrowContent: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.element]),
  removeDropdownOnHide: _propTypes.default.bool,
  noDefaultStyles: _propTypes.default.bool,
  tagName: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  tabIndex: _propTypes.default.string,
  placeholderTagName: _propTypes.default.string,
  placeholderClassName: _propTypes.default.string,
  placeholderStyle: _propTypes.default.object,
  arrowTagName: _propTypes.default.string,
  arrowClassName: _propTypes.default.string,
  arrowStyle: _propTypes.default.object,
  dropdownTagName: _propTypes.default.string,
  dropdownClassName: _propTypes.default.string,
  dropdownStyle: _propTypes.default.object,
  onChange: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func
});

_defineProperty(Select, "defaultProps", {
  removeDropdownOnHide: false,
  noDefaultStyles: false,
  tabIndex: '0',
  arrowContent: _react.default.createElement("svg", {
    "aria-hidden": "true",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512",
    style: {
      width: "100%",
      height: "100%",
      color: "currentColor"
    }
  }, _react.default.createElement("path", {
    fill: "currentColor",
    d: "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
  })),
  placeholder: "Select...",
  tagName: "div",
  placeholderTagName: "div",
  arrowTagName: "div",
  dropdownTagName: "div"
});