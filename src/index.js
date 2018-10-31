import PropTypes from "prop-types";
import React from "react";
import {Dropdown, DropdownContent, DropdownTrigger} from "react-ez-dropdown";
import SingleOption from "./SingleOption";

const defaultStyle = {
    wrapper: {
        regular: {
            position: "relative",
        },
    },
    controls: {
        regular: {
            display: "flex",
            border: "1px solid #aaa",
            borderRadius: 2,
            userSelect: "none",
        },
    },
    placeholder: {
        regular: {
            padding: ".25em 1em",
            lineHeight: "1.5em",
            cursor: "pointer",
            background: "#fff",
        },
    },
    arrow: {
        regular: {
            cursor: "pointer",
            background: "#fff",
            color: "#aaa",
            padding: ".5em",
            height: "2em",
            width: "2em",
            boxSizing: "border-box",
        },
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
            borderRadius: 2,
        },
    },
    option: {
        regular: {
            cursor: "pointer",
            padding: ".25em 1em",
            whiteSpace: "nowrap",
            userSelect: "none",
        },
        disabled: {
            cursor: "default",
            opacity: 0.5,
            background: "transparent",
        },
        focused: {
            background: "rgba(0,0,0,.05)",
        },
        selected: {
            background: "rgba(14, 135, 224, 0.18)",
            fontWeight: 500,
        },
    },
};

export default class Select extends React.Component {
    static propTypes = {
        options: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.any.isRequired,
                label: PropTypes.any.isRequired,
                disabled: PropTypes.bool,
                selected: PropTypes.bool,
                default: PropTypes.bool,
            })
        ),
        placeholder: PropTypes.any,
        placeholderMediator: PropTypes.func,
        arrowContent: PropTypes.any,

        removeDropdownOnHide: PropTypes.bool,
        noDefaultStyles: PropTypes.bool,
        noArrow: PropTypes.bool,

        tagName: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        openedStyle: PropTypes.object,
        tabIndex: PropTypes.string,

        controlsClassName: PropTypes.string,
        controlsStyle: PropTypes.object,
        controlsOpenedStyle: PropTypes.object,

        placeholderClassName: PropTypes.string,
        placeholderStyle: PropTypes.object,
        placeholderOpenedStyle: PropTypes.object,

        arrowClassName: PropTypes.string,
        arrowStyle: PropTypes.object,
        arrowOpenedStyle: PropTypes.object,

        dropdownClassName: PropTypes.string,
        dropdownStyle: PropTypes.object,
        dropdownOpenedStyle: PropTypes.object,

        optionStyle: PropTypes.object,
        optionStyleDisabled: PropTypes.object,
        optionStyleFocused: PropTypes.object,
        optionStyleSelected: PropTypes.object,

        onChange: PropTypes.func,
        onInput: PropTypes.func,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
    };

    static defaultProps = {
        removeDropdownOnHide: false,
        noDefaultStyles: false,
        noArrow: false,

        tagName: "div",
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
    };

    constructor(props) {
        super(props);

        const preselected = this.getPreselectedOption();

        this.state = {
            value: undefined,
            focusedOption: preselected.option ?? undefined,
            focusedOptionIdx: preselected.index,
            selectedOption: preselected.option ?? undefined,
            selectedOptionIdx: preselected.index,

            opened: false,
        };
    }

    getPreselectedOption = () => {
        const result = {
            option: null,
            index: -1,
        };

        for (let i = 0; i < this.props.options.length; i++) {
            if (this.props.options[i].selected) {
                result.option = this.props.options[i];
                result.index = i;
                break;
            }
        }

        return result;
    };

    actualizeSelectedAndFocusedOptions = () => {
        const newState = {
            selectedOption: null,
            selectedOptionIdx: -1,
            focusedOption: null,
            focusedOptionIdx: -1,
        };

        if (this.state.selectedOption || this.state.focusedOption) {
            for (let i = 0; i < this.props.options.length; i++) {
                if (
                    !newState.selectedOption &&
                    this.state.selectedOption &&
                    this.props.options[i].value === this.state.selectedOption.value
                ) {
                    newState.selectedOption = this.props.options[i];
                    newState.selectedOptionIdx = i;
                }

                if (
                    !newState.focusedOption &&
                    this.state.focusedOption &&
                    this.props.options[i].value === this.state.focusedOption.value
                ) {
                    newState.focusedOption = this.props.options[i];
                    newState.focusedOptionIdx = i;
                }

                if (newState.focusedOption && newState.selectedOption) {
                    break;
                }
            }
        }

        if (!newState.selectedOption) {
            const preselected = this.getPreselectedOption();

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
    };

    componentDidMount() {}

    componentDidUpdate(prevProps) {
        if (this.props.opened !== prevProps.opened && this.props.opened !== this.state.opened) {
            this.setState({opened: this.props.opened});
            return false;
        }

        if (this.props.options !== prevProps.options) {
            this.actualizeSelectedAndFocusedOptions();
        }
    }

    componentWillUnmount() {
        document.body.removeEventListener("keydown", this.handleDocumentKeyDown);
    }

    renderOptions = () => {
        if (!this.props.options || !this.props.options.length) {
            return false;
        }

        return this.props.options.map(option => {
            return (
                <SingleOption
                    key={`option_${option.value}`}
                    option={option}
                    focused={this.state.focusedOption === option}
                    selected={this.state.selectedOption === option}
                    disabled={option.disabled ?? false}
                    onFocus={this.handleOptionFocus}
                    onBlur={this.handleOptionBlur}
                    onClick={this.handleOptionClick}
                    style={{...(!this.props.noDefaultStyles && defaultStyle.option.regular), ...this.props.optionStyle}}
                    styleFocused={{
                        ...(!this.props.noDefaultStyles && defaultStyle.option.focused),
                        ...this.props.optionStyleFocused,
                    }}
                    styleSelected={{
                        ...(!this.props.noDefaultStyles && defaultStyle.option.selected),
                        ...this.props.optionStyleSelected,
                    }}
                    styleDisabled={{
                        ...(!this.props.noDefaultStyles && defaultStyle.option.disabled),
                        ...this.props.optionStyleDisabled,
                    }}
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

        this.controls && this.controls.focus();
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

    selectValue(direction = "first") {
        const {selectedOptionIdx} = this.state;
        const {options} = this.props;

        let idxToSelect;
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
            focusedOption: options[idxToSelect],
        });
    }

    handleDocumentKeyDown = e => {
        switch (e.key) {
            case "ArrowUp":
                this.state.opened ? this.focusOption("up") : this.selectValue("up");

                break;

            case "ArrowDown":
                this.state.opened ? this.focusOption("down") : this.selectValue("down");

                break;

            case "Home":
                this.state.opened ? this.focusOption("first") : this.selectValue("first");

                break;

            case "End":
                this.state.opened ? this.focusOption("last") : this.selectValue("last");

                break;

            case "Enter":
                this.state.opened
                    ? this.setState({
                          selectedOption: this.state.focusedOption,
                          selectedOptionIdx: this.state.focusedOptionIdx,
                      })
                    : this.setState({
                          opened: true,
                      });
                break;
        }

        e.preventDefault();
    };

    handleDropdownOpen = () => {
        this.props.onOpen && this.props.onOpen.call(this);
        this.wrapper && this.wrapper.classList.add("EzSelect-opened");
        this.setState({opened: true});

        document.body.addEventListener("keydown", this.handleDocumentKeyDown);
    };

    handleDropdownClose = () => {
        this.props.onClose && this.props.onClose.call(this);
        this.wrapper && this.wrapper.classList.remove("EzSelect-opened");
        this.setState({opened: false});

        document.body.removeEventListener("keydown", this.handleDocumentKeyDown);
    };

    handleFocus = () => {
        document.body.addEventListener("keydown", this.handleDocumentKeyDown);
    };

    handleBlur = () => {
        document.body.removeEventListener("keydown", this.handleDocumentKeyDown);
    };

    render() {
        const {
                removeDropdownOnHide,
                options,
                noDefaultStyles,
                noArrow,

                tagName,
                className,
                style,
                openedStyle,
                tabIndex,

                controlsClassName,
                controlsStyle,
                controlsOpenedStyle,

                placeholderClassName,
                placeholderStyle,
                placeholderOpenedStyle,

                arrowClassName,
                arrowStyle,
                arrowOpenedStyle,

                dropdownClassName,
                dropdownStyle,
                dropdownOpenedStyle,

                placeholder,
                placeholderMediator,
                arrowContent,

                onOpen,
                onClose,
                onChange,

                ...props
            } = this.props,
            {opened, selectedOption} = this.state;

        const wrapperClassNames = "EzSelect" + (className ? " " + className : ""),
            controlsClassNames = "EzSelect-controls" + (controlsClassName ? " " + controlsClassName : ""),
            placeholderClassNames = "EzSelect-placeholder" + (placeholderClassName ? " " + placeholderClassName : ""),
            arrowClassNames = "EzSelect-arrow" + (arrowClassName ? " " + arrowClassName : ""),
            dropdownClassNames = "EzSelect-dropdown" + (dropdownClassName ? " " + dropdownClassName : "");

        let wrapperStyles = {...style, ...(opened && openedStyle)},
            controlsStyles = {...controlsStyle, ...(opened && controlsOpenedStyle)},
            placeholderStyles = {...placeholderStyle, ...(opened && placeholderOpenedStyle)},
            arrowStyles = {...arrowStyle, ...(opened && arrowOpenedStyle)},
            dropdownStyles = {...dropdownStyle, ...(opened && dropdownOpenedStyle)};

        if (!noDefaultStyles) {
            wrapperStyles = {
                ...defaultStyle.wrapper.regular,
                ...(opened && defaultStyle.wrapper.opened),
                ...wrapperStyles,
            };
            controlsStyles = {
                ...defaultStyle.controls.regular,
                ...(opened && defaultStyle.controls.opened),
                ...controlsStyles,
            };
            placeholderStyles = {
                ...defaultStyle.placeholder.regular,
                ...(opened && defaultStyle.placeholder.opened),
                ...placeholderStyles,
            };
            arrowStyles = {...defaultStyle.arrow.regular, ...(opened && defaultStyle.arrow.opened), ...arrowStyles};
            dropdownStyles = {
                ...defaultStyle.dropdown.regular,
                ...(opened && defaultStyle.dropdown.opened),
                ...dropdownStyles,
            };
        }

        return React.createElement(tagName, {
            ...props,
            className: wrapperClassNames,
            style: wrapperStyles,
            key: "EzSelect",
            children: (
                <Dropdown>
                    <DropdownTrigger
                        className={controlsClassNames}
                        style={controlsStyles}
                        tabIndex={tabIndex}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        ref={ref => (this.controls = ref)}>
                        <div className={placeholderClassNames} style={placeholderStyles}>
                            {typeof selectedOption === "undefined"
                                ? placeholder
                                : !!placeholderMediator
                                    ? placeholderMediator(selectedOption)
                                    : selectedOption.label}
                        </div>
                        {!noArrow && (
                            <div className={arrowClassNames} style={arrowStyles}>
                                {arrowContent}
                            </div>
                        )}
                    </DropdownTrigger>

                    <DropdownContent
                        removeOnHide={removeDropdownOnHide}
                        className={dropdownClassNames}
                        style={dropdownStyles}
                        key="EzSelect-dropdown"
                        opened={opened}
                        onShow={this.handleDropdownOpen}
                        onHide={this.handleDropdownClose}>
                        {this.renderOptions()}
                    </DropdownContent>
                </Dropdown>
            ),
        });
    }
}
