"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactEzDropdown = require("react-ez-dropdown");

var _reactScrollbarsCustom = _interopRequireDefault(require("react-scrollbars-custom"));

var _SingleOption = _interopRequireDefault(require("./SingleOption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var defaultStyle = {
  wrapper: {
    regular: {
      position: "relative"
    }
  },
  controls: {
    regular: {
      display: "flex",
      border: "1px solid #aaa",
      borderRadius: 2,
      userSelect: "none"
    }
  },
  placeholder: {
    regular: {
      padding: ".25em 1em",
      lineHeight: "1.5em",
      cursor: "pointer",
      background: "#fff"
    }
  },
  arrow: {
    regular: {
      cursor: "pointer",
      background: "#fff",
      color: "#aaa",
      padding: ".5em",
      height: "2em",
      width: "2em",
      boxSizing: "border-box"
    }
  },
  dropdown: {
    regular: {
      position: "absolute",
      boxSizing: "border-box",
      top: "calc(100% + 4px)",
      left: 0,
      padding: ".25rem 0",
      minWidth: "100%",
      background: "#fff",
      border: "1px solid #aaa",
      borderRadius: 2
    }
  },
  option: {
    regular: {
      cursor: "pointer",
      padding: ".25em 1em",
      whiteSpace: "nowrap",
      userSelect: "none"
    },
    disabled: {
      cursor: "default",
      opacity: 0.5,
      background: "transparent"
    },
    focused: {
      background: "rgba(0,0,0,.05)"
    },
    selected: {
      background: "rgba(14, 135, 224, 0.18)",
      fontWeight: 500
    }
  }
};

var Select =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    var _preselected$option, _preselected$option2;

    var _this;

    _classCallCheck(this, Select);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, props));

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
      _this.controls && _this.controls.triggerElement.focus();
      _this.props.onInput && _this.props.onInput.call(_assertThisInitialized(_assertThisInitialized(_this)), option.value);

      if (_this.state.selectedOption !== option) {
        _this.setState({
          opened: _this.props.closeMenuOnSelect ? false : _this.state.opened,
          value: option.value,
          selectedOption: option,
          selectedOptionIdx: _this.props.options.indexOf(option)
        });
      } else if (_this.props.closeMenuOnSelect) {
        _this.setState({
          opened: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDocumentKeyDown", function (e) {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          _this.state.opened ? _this.focusOption("up") : _this.selectValue("up");
          break;

        case "ArrowDown":
          e.preventDefault();
          _this.state.opened ? _this.focusOption("down") : _this.selectValue("down");
          break;

        case "Home":
          e.preventDefault();
          _this.state.opened ? _this.focusOption("first") : _this.selectValue("first");
          break;

        case "End":
          e.preventDefault();
          _this.state.opened ? _this.focusOption("last") : _this.selectValue("last");
          break;

        case "Enter":
          e.preventDefault();

          if (_this.state.opened) {
            _this.props.onInput && _this.props.onInput.call(_assertThisInitialized(_assertThisInitialized(_this)), option.value);
            _this.controls && _this.controls.triggerElement.focus();

            _this.setState({
              opened: _this.props.closeMenuOnSelect ? false : _this.state.opened,
              selectedOption: _this.state.focusedOption,
              selectedOptionIdx: _this.state.focusedOptionIdx
            });
          } else {
            _this.setState({
              opened: true
            });
          }

          break;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDropdownOpen", function () {
      _this.props.onOpen && _this.props.onOpen.call(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.wrapper && _this.wrapper.classList.add("EzSelect-opened");

      _this.setState({
        opened: true
      });

      document.body.addEventListener("keydown", _this.handleDocumentKeyDown);
      _this.scrollbar.holder.style.height = _this.scrollbar.scrollHeight + 'px';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDropdownClose", function () {
      _this.props.onClose && _this.props.onClose.call(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.wrapper && _this.wrapper.classList.remove("EzSelect-opened");

      _this.setState({
        opened: false
      });

      _this.controls.triggerElement !== document.activeElement && document.body.removeEventListener("keydown", _this.handleDocumentKeyDown);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFocus", function () {
      document.body.addEventListener("keydown", _this.handleDocumentKeyDown);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleBlur", function () {
      document.body.removeEventListener("keydown", _this.handleDocumentKeyDown);
      _this.props.closeMenuOnBlur && _this.state.opened && _this.setState({
        opened: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleScrollbarOnScroll", function (scrollValues) {
      _this.props.scrollbarProps && _this.props.scrollbarProps.onScroll && _this.props.scrollbarProps.onScroll(scrollValues);
      _this.scrollbar.holder.style.height = _this.scrollbar.scrollHeight + 'px';
    });

    var preselected = _this.getPreselectedOption();

    _this.state = {
      value: undefined,
      focusedOption: (_preselected$option = preselected.option) !== null && _preselected$option !== void 0 ? _preselected$option : undefined,
      focusedOptionIdx: preselected.index,
      selectedOption: (_preselected$option2 = preselected.option) !== null && _preselected$option2 !== void 0 ? _preselected$option2 : undefined,
      selectedOptionIdx: preselected.index,
      opened: false
    };
    return _this;
  }

  _createClass(Select, [{
    key: "getPreselectedOption",
    value: function getPreselectedOption() {
      var result = {
        option: null,
        index: -1
      };

      for (var i = 0; i < this.props.options.length; i++) {
        if (this.props.options[i].selected) {
          result.option = this.props.options[i];
          result.index = i;
          break;
        }
      }

      return result;
    }
  }, {
    key: "actualizeSelectedAndFocusedOptions",
    value: function actualizeSelectedAndFocusedOptions() {
      var newState = {
        selectedOption: null,
        selectedOptionIdx: -1,
        focusedOption: null,
        focusedOptionIdx: -1
      };

      if (this.state.selectedOption || this.state.focusedOption) {
        for (var i = 0; i < this.props.options.length; i++) {
          if (!newState.selectedOption && this.state.selectedOption && this.props.options[i].value === this.state.selectedOption.value) {
            newState.selectedOption = this.props.options[i];
            newState.selectedOptionIdx = i;
          }

          if (!newState.focusedOption && this.state.focusedOption && this.props.options[i].value === this.state.focusedOption.value) {
            newState.focusedOption = this.props.options[i];
            newState.focusedOptionIdx = i;
          }

          if (newState.focusedOption && newState.selectedOption) {
            break;
          }
        }
      }

      if (!newState.selectedOption) {
        var preselected = this.getPreselectedOption();

        if (preselected.option) {
          newState.selectedOption = preselected.option;
          newState.selectedOptionIdx = preselected.index;

          if (!newState.focusedOption) {
            newState.focusedOption = preselected.option;
            newState.focusedOptionIdx = preselected.index;
          }
        }
      }

      this.setState(newState);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.value !== this.state.value) {
        this.props.onChange && this.props.onChange.call(this, this.state.value);
      }

      this.state.opened && this.scrollbar && this.handleScrollbarOnScroll({
        scrollHeight: this.scrollbar.scrollHeight,
        scrollWidth: this.scrollbar.scrollWidth
      });

      if (this.props.options !== prevProps.options) {
        this.actualizeSelectedAndFocusedOptions();
      }

      if (this.props.opened !== prevProps.opened && this.props.opened !== this.state.opened) {
        this.setState({
          opened: this.props.opened
        });
        return false;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener("keydown", this.handleDocumentKeyDown);
    }
  }, {
    key: "renderOptions",
    value: function renderOptions() {
      var _this2 = this;

      if (!this.props.options || !this.props.options.length) {
        return false;
      }

      return this.props.options.map(function (option) {
        var _option$disabled;

        return _react.default.createElement(_SingleOption.default, {
          key: "option_".concat(option.value),
          option: option,
          focused: _this2.state.focusedOption === option,
          selected: _this2.state.selectedOption === option,
          disabled: (_option$disabled = option.disabled) !== null && _option$disabled !== void 0 ? _option$disabled : false,
          onFocus: _this2.handleOptionFocus,
          onBlur: _this2.handleOptionBlur,
          onClick: _this2.handleOptionClick,
          style: _objectSpread({}, !_this2.props.noDefaultStyles && defaultStyle.option.regular, _this2.props.optionStyle),
          styleFocused: _objectSpread({}, !_this2.props.noDefaultStyles && defaultStyle.option.focused, _this2.props.optionStyleFocused),
          styleSelected: _objectSpread({}, !_this2.props.noDefaultStyles && defaultStyle.option.selected, _this2.props.optionStyleSelected),
          styleDisabled: _objectSpread({}, !_this2.props.noDefaultStyles && defaultStyle.option.disabled, _this2.props.optionStyleDisabled)
        });
      });
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
    key: "selectValue",
    value: function selectValue() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "first";
      var selectedOptionIdx = this.state.selectedOptionIdx;
      var options = this.props.options;
      var idxToSelect;

      switch (direction) {
        case "up":
          idxToSelect = selectedOptionIdx > 0 ? selectedOptionIdx - 1 : options.length - 1;
          break;

        case "down":
          idxToSelect = (selectedOptionIdx + 1) % options.length;
          break;

        case "last":
          idxToSelect = options.length - 1;
          break;

        case "first":
        default:
          idxToSelect = 0;
          break;
      }

      this.setState({
        selectedOptionIdx: idxToSelect,
        selectedOption: options[idxToSelect],
        focusedOptionIdx: idxToSelect,
        focusedOption: options[idxToSelect]
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          options = _this$props.options,
          removeMenuOnHide = _this$props.removeMenuOnHide,
          noDefaultStyles = _this$props.noDefaultStyles,
          closeMenuOnSelect = _this$props.closeMenuOnSelect,
          closeMenuOnBlur = _this$props.closeMenuOnBlur,
          noArrow = _this$props.noArrow,
          tagName = _this$props.tagName,
          className = _this$props.className,
          style = _this$props.style,
          openedStyle = _this$props.openedStyle,
          tabIndex = _this$props.tabIndex,
          controlsClassName = _this$props.controlsClassName,
          controlsStyle = _this$props.controlsStyle,
          controlsOpenedStyle = _this$props.controlsOpenedStyle,
          placeholderClassName = _this$props.placeholderClassName,
          placeholderStyle = _this$props.placeholderStyle,
          placeholderOpenedStyle = _this$props.placeholderOpenedStyle,
          arrowClassName = _this$props.arrowClassName,
          arrowStyle = _this$props.arrowStyle,
          arrowOpenedStyle = _this$props.arrowOpenedStyle,
          menuClassName = _this$props.menuClassName,
          menuStyle = _this$props.menuStyle,
          menuOpenedStyle = _this$props.menuOpenedStyle,
          maxMenuHeight = _this$props.maxMenuHeight,
          maxMenuWidth = _this$props.maxMenuWidth,
          placeholder = _this$props.placeholder,
          placeholderMediator = _this$props.placeholderMediator,
          arrowContent = _this$props.arrowContent,
          onOpen = _this$props.onOpen,
          onClose = _this$props.onClose,
          onChange = _this$props.onChange,
          scrollbarProps = _this$props.scrollbarProps,
          props = _objectWithoutProperties(_this$props, ["options", "removeMenuOnHide", "noDefaultStyles", "closeMenuOnSelect", "closeMenuOnBlur", "noArrow", "tagName", "className", "style", "openedStyle", "tabIndex", "controlsClassName", "controlsStyle", "controlsOpenedStyle", "placeholderClassName", "placeholderStyle", "placeholderOpenedStyle", "arrowClassName", "arrowStyle", "arrowOpenedStyle", "menuClassName", "menuStyle", "menuOpenedStyle", "maxMenuHeight", "maxMenuWidth", "placeholder", "placeholderMediator", "arrowContent", "onOpen", "onClose", "onChange", "scrollbarProps"]),
          _this$state = this.state,
          opened = _this$state.opened,
          selectedOption = _this$state.selectedOption;

      var wrapperClassNames = "EzSelect" + (className ? " " + className : ""),
          controlsClassNames = "EzSelect-controls" + (controlsClassName ? " " + controlsClassName : ""),
          placeholderClassNames = "EzSelect-placeholder" + (placeholderClassName ? " " + placeholderClassName : ""),
          arrowClassNames = "EzSelect-arrow" + (arrowClassName ? " " + arrowClassName : ""),
          dropdownClassNames = "EzSelect-dropdown" + (menuClassName ? " " + menuClassName : "");

      var wrapperStyles = _objectSpread({}, style, opened && openedStyle),
          controlsStyles = _objectSpread({}, controlsStyle, opened && controlsOpenedStyle),
          placeholderStyles = _objectSpread({}, placeholderStyle, opened && placeholderOpenedStyle),
          arrowStyles = _objectSpread({}, arrowStyle, opened && arrowOpenedStyle),
          dropdownStyles = _objectSpread({}, menuStyle, opened && menuOpenedStyle);

      if (!noDefaultStyles) {
        wrapperStyles = _objectSpread({}, defaultStyle.wrapper.regular, opened && defaultStyle.wrapper.opened, wrapperStyles);
        controlsStyles = _objectSpread({}, defaultStyle.controls.regular, opened && defaultStyle.controls.opened, controlsStyles);
        placeholderStyles = _objectSpread({}, defaultStyle.placeholder.regular, opened && defaultStyle.placeholder.opened, placeholderStyles);
        arrowStyles = _objectSpread({}, defaultStyle.arrow.regular, opened && defaultStyle.arrow.opened, arrowStyles);
        dropdownStyles = _objectSpread({}, defaultStyle.dropdown.regular, opened && defaultStyle.dropdown.opened, dropdownStyles);
      }

      return _react.default.createElement(tagName, _objectSpread({}, props, {
        className: wrapperClassNames,
        style: wrapperStyles,
        key: "EzSelect",
        children: _react.default.createElement(_reactEzDropdown.Dropdown, null, _react.default.createElement(_reactEzDropdown.DropdownTrigger, {
          key: "EzSelect-controls",
          className: controlsClassNames,
          style: controlsStyles,
          tabIndex: tabIndex,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          ref: function ref(_ref) {
            return _this3.controls = _ref;
          }
        }, _react.default.createElement("div", {
          className: placeholderClassNames,
          style: placeholderStyles,
          key: "EzSelect-placeholder"
        }, typeof selectedOption === "undefined" ? placeholder : !!placeholderMediator ? placeholderMediator(selectedOption) : selectedOption.label), !noArrow && _react.default.createElement("div", {
          className: arrowClassNames,
          style: arrowStyles,
          key: "EzSelect-arrow"
        }, arrowContent)), _react.default.createElement(_reactEzDropdown.DropdownContent, {
          removeOnHide: removeMenuOnHide,
          className: dropdownClassNames,
          style: dropdownStyles,
          key: "EzSelect-dropdown",
          opened: opened,
          onShow: this.handleDropdownOpen,
          onHide: this.handleDropdownClose
        }, _react.default.createElement(_reactScrollbarsCustom.default, {
          noScrollX: true,
          style: _objectSpread({
            maxHeight: maxMenuHeight,
            maxWidth: maxMenuWidth
          }, scrollbarProps && scrollbarProps.style),
          key: "ScrollbarCustom",
          ref: function ref(_ref2) {
            _this3.scrollbar = _ref2;
            scrollbarProps && typeof scrollbarProps.ref === 'function' && scrollbarProps.ref(_ref2);
          },
          onScroll: this.handleScrollbarOnScroll
        }, this.renderOptions())))
      }));
    }
  }]);

  return Select;
}(_react.default.Component);

exports.default = Select;

_defineProperty(Select, "propTypes", {
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.any.isRequired,
    label: _propTypes.default.any.isRequired,
    disabled: _propTypes.default.bool,
    selected: _propTypes.default.bool,
    default: _propTypes.default.bool
  })),
  placeholder: _propTypes.default.any,
  placeholderMediator: _propTypes.default.func,
  arrowContent: _propTypes.default.any,
  removeMenuOnHide: _propTypes.default.bool,
  closeMenuOnSelect: _propTypes.default.bool,
  closeMenuOnBlur: _propTypes.default.bool,
  noDefaultStyles: _propTypes.default.bool,
  noArrow: _propTypes.default.bool,
  tagName: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  openedStyle: _propTypes.default.object,
  tabIndex: _propTypes.default.string,
  controlsClassName: _propTypes.default.string,
  controlsStyle: _propTypes.default.object,
  controlsOpenedStyle: _propTypes.default.object,
  placeholderClassName: _propTypes.default.string,
  placeholderStyle: _propTypes.default.object,
  placeholderOpenedStyle: _propTypes.default.object,
  arrowClassName: _propTypes.default.string,
  arrowStyle: _propTypes.default.object,
  arrowOpenedStyle: _propTypes.default.object,
  menuClassName: _propTypes.default.string,
  menuStyle: _propTypes.default.object,
  menuOpenedStyle: _propTypes.default.object,
  maxMenuHeight: _propTypes.default.number,
  maxMenuWidth: _propTypes.default.number,
  optionStyle: _propTypes.default.object,
  optionStyleDisabled: _propTypes.default.object,
  optionStyleFocused: _propTypes.default.object,
  optionStyleSelected: _propTypes.default.object,
  onChange: _propTypes.default.func,
  onInput: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func,
  scrollbarProps: _propTypes.default.object
});

_defineProperty(Select, "defaultProps", {
  closeMenuOnSelect: true,
  closeMenuOnBlur: true,
  removeMenuOnHide: false,
  noDefaultStyles: false,
  noArrow: false,
  maxMenuHeight: 300,
  maxMenuWidth: null,
  tagName: "div",
  tabIndex: "0",
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
  placeholder: "Select..."
});