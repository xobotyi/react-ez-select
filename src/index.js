import PropTypes from "prop-types";
import React from "react";
import {Dropdown, DropdownContent, DropdownTrigger} from "react-ez-dropdown";
import Option from "./Option";

const defaultStyles = {
    wrapper: {
        display: "flex",
        position: "relative",
        height: "2em",
        borderRadius: 2,
        border: "1px solid #aaa",
        userSelect: "none",
        boxSizing: "border-box",
    },
    placeholder: {
        padding: ".25em 1em",
        boxSizing: "border-box",
        lineHeight: "1.5em",
        cursor: "default",
        background: "#fff",
    },
    arrow: {
        padding: ".5em",
        cursor: "pointer",
        width: "2em",
        height: "100%",
        color: "#aaa",
        background: "#fff",
        boxSizing: "border-box",
    },
    dropdown: {
        background: "#fff",
        position: "absolute",
        left: "-1px",
        top: "calc(100% + 4px)",
        borderRadius: 2,
        border: "1px solid #aaa",
        minWidth: "100%",
        padding: ".25rem 0",
    },
};

export default class Select extends React.Component {
    static propTypes = {
        options: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.any.isRequired,
                label: PropTypes.any.isRequired,
            })
        ),
        placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
        arrowContent: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),

        removeDropdownOnHide: PropTypes.bool,
        noDefaultStyles: PropTypes.bool,

        tagName: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        tabIndex: PropTypes.string,

        placeholderTagName: PropTypes.string,
        placeholderClassName: PropTypes.string,
        placeholderStyle: PropTypes.object,

        arrowTagName: PropTypes.string,
        arrowClassName: PropTypes.string,
        arrowStyle: PropTypes.object,

        dropdownTagName: PropTypes.string,
        dropdownClassName: PropTypes.string,
        dropdownStyle: PropTypes.object,

        onChange: PropTypes.func,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
    };

    static defaultProps = {
        removeDropdownOnHide: false,
        noDefaultStyles: false,
        tabIndex: "0",

        arrowContent: (
            <svg
                aria-hidden="true"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                style={{width: "100%", height: "100%", color: "currentColor"}}>
                <path
                    fill="currentColor"
                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                />
            </svg>
        ),

        placeholder: "Select...",
        tagName: "div",
        placeholderTagName: "div",
        arrowTagName: "div",
        dropdownTagName: "div",
    };

    constructor(props) {
        super(props);

        this.dropdownOpened = false;

        this.state = {
            value: null,
            focusedOption: null,
            focusedOptionIdx: -1,
            selectedOption: null,
            selectedOptionIdx: -1,
        };
    }

    componentDidMount() {}

    componentWillUnmount() {
        document.body.removeEventListener("keydown", this.handleDocumentKeyDown);
    }

    renderOptions = () => {
        if (!this.props.options || !this.props.options.length) {
            return false;
        }

        return this.props.options.map(option => {
            return (
                <Option
                    key={`option_${option.value}`}
                    option={option}
                    focused={this.state.focusedOption === option}
                    selected={this.state.selectedOption === option}
                    onFocus={this.handleOptionFocus}
                    onBlur={this.handleOptionBlur}
                    onClick={this.handleOptionClick}
                    noDefaultStyles={this.props.noDefaultStyles}
                />
            );
        });
    };

    handleOptionFocus = option => {
        if (this.state.focusedOption !== option) {
            this.setState({
                focusedOption: option,
                focusedOptionIdx: this.props.options.indexOf(option),
            });
        }
    };

    handleOptionBlur = option => {
        if (this.state.focusedOption === option) {
            this.setState({
                focusedOption: null,
                focusedOptionIdx: null,
            });
        }
    };

    handleOptionClick = option => {
        if (this.state.selectedOption !== option) {
            this.setState({
                value: option.value,
                selectedOption: option,
                selectedOptionIdx: this.props.options.indexOf(option),
            });
        }
    };

    focusOption(direction = "first") {
        const {focusedOptionIdx} = this.state;
        const {options} = this.props;

        let idxToFocus;
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
            focusedOption: options[idxToFocus],
        });
    }

    handleDocumentKeyDown = e => {
        switch (e.key) {
            case "ArrowUp":
                this.dropdownOpened ? this.focusOption("up") : false;

                break;

            case "ArrowDown":
                this.dropdownOpened ? this.focusOption("down") : false;

                break;

            case "Home":
                this.dropdownOpened && this.focusOption("first");

                break;

            case "End":
                this.dropdownOpened && this.focusOption("last");

                break;

            case "Enter":
                this.dropdownOpened &&
                    this.setState({
                        selectedOption: this.state.focusedOption,
                        selectedOptionIdx: this.state.focusedOptionIdx,
                    });
                break;
        }

        e.preventDefault();
    };

    handleDropdownOpen = () => {
        this.props.onOpen && this.props.onOpen.call(this);
        this.wrapper && this.wrapper.classList.add("EzSelect-opened");
        this.dropdownOpened = true;

        document.body.addEventListener("keydown", this.handleDocumentKeyDown);
    };
    handleDropdownClose = () => {
        this.props.onClose && this.props.onClose.call(this);
        this.wrapper && this.wrapper.classList.remove("EzSelect-opened");
        this.dropdownOpened = false;

        document.body.removeEventListener("keydown", this.handleDocumentKeyDown);
    };

    handleFocus = () => {};

    handleBlur = () => {};

    render() {
        const {
            removeDropdownOnHide,
            options,
            noDefaultStyles,

            tagName,
            className,
            style,
            tabIndex,

            placeholderTagName,
            placeholderClassName,
            placeholderStyle,

            arrowTagName,
            arrowClassName,
            arrowStyle,
            arrowContent,

            dropdownTagName,
            dropdownClassName,
            dropdownStyle,

            placeholder,

            onOpen,
            onClose,
            onChange,

            ...props
        } = this.props;

        const wrapperClassNames = "EzSelect" + (className ? " " + className : ""),
            placeholderClassNames = "EzSelect-placeholder" + (placeholderClassName ? " " + placeholderClassName : ""),
            arrowClassNames = "EzSelect-arrow" + (arrowClassName ? " " + arrowClassName : ""),
            dropdownClassNames = "EzSelect-dropdown" + (dropdownClassName ? " " + dropdownClassName : "");

        const wrapperStyles = {...(!noDefaultStyles && defaultStyles.wrapper), ...style},
            placeholderStyles = {...(!noDefaultStyles && defaultStyles.placeholder), ...placeholderStyle},
            arrowStyles = {...(!noDefaultStyles && defaultStyles.arrow), ...arrowStyle},
            dropdownStyles = {...(!noDefaultStyles && defaultStyles.dropdown), ...dropdownStyle};

        return React.createElement(tagName, {
            ...props,
            className: wrapperClassNames,
            style: wrapperStyles,
            ref: ref => (this.wrapper = ref),
            key: "EzSelect",
            tabIndex,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            children: (
                <Dropdown key="EzSelect-dropdown">
                    <DropdownTrigger
                        tagName={placeholderTagName}
                        className={placeholderClassNames}
                        style={placeholderStyles}
                        ref={ref => (this.placeholder = ref)}
                        key="EzSelect-placeholder">
                        {placeholder}
                    </DropdownTrigger>

                    <DropdownTrigger
                        tagName={arrowTagName}
                        className={arrowClassNames}
                        style={arrowStyles}
                        ref={ref => (this.arrow = ref)}
                        key="EzSelect-arrow">
                        {arrowContent}
                    </DropdownTrigger>

                    <DropdownContent
                        tagName={dropdownTagName}
                        removeOnHide={removeDropdownOnHide}
                        className={dropdownClassNames}
                        style={dropdownStyles}
                        ref={ref => (this.dropdown = ref)}
                        key="EzSelect-dropdown"
                        onShow={this.handleDropdownOpen}
                        onHide={this.handleDropdownClose}>
                        {this.renderOptions()}
                    </DropdownContent>
                </Dropdown>
            ),
        });
    }
}
