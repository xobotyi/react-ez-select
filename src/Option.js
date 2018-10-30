import PropTypes from "prop-types";
import React from "react";

const defaultStyles = {
    common: {
        cursor: "pointer",
        padding: ".25em 1em",
    },
    disabled: {
        cursor: "default",
    },
    focused: {
        background: "rgba(0,0,0,.05)",
    },
    selected: {
        background: "rgba(0,0,0,.05)",
        fontWeight: "bold",
    },
};

export default class Option extends React.Component {
    static propTypes = {
        option: PropTypes.shape({
            value: PropTypes.any.isRequired,
            label: PropTypes.any.isRequired,
        }).isRequired,
        className: PropTypes.string,
        style: PropTypes.object,

        noDefaultStyles: PropTypes.bool,
        focused: PropTypes.bool,
        selected: PropTypes.bool,
        disabled: PropTypes.bool,

        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
    };

    static defaultProps = {
        noDefaultStyles: false,

        disabled: false,
        selected: false,
        focused: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            disabled: this.props.disabled,
            selected: this.props.selected,
            focused: this.props.focused,
        };
    }

    componentDidUpdate(prevProps) {
        prevProps.disabled !== this.props.disabled &&
            this.props.disabled !== this.state.disabled &&
            this.setDisabled(this.props.disabled);
        prevProps.selected !== this.props.selected &&
            this.props.selected !== this.state.selected &&
            this.setSelected(this.props.selected);
        prevProps.focused !== this.props.focused &&
            this.props.focused !== this.state.focused &&
            this.setFocused(this.props.focused);
    }

    handleOptionMouseEnter = () => {
        this.props.onFocus && this.props.onFocus.call(this, this.props.option);
    };
    handleOptionMouseLeave = () => {
        this.props.onBlur && this.props.onBlur.call(this, this.props.option);
    };
    handleOptionClick = () => {
        this.props.onClick && this.props.onClick.call(this, this.props.option);
    };

    setDisabled = (disabled = null) => {
        disabled !== null && this.setState({disabled: !!disabled});
    };
    setSelected = (selected = null) => {
        selected !== null && this.setState({selected: !!selected});
    };
    setFocused = (focused = null) => {
        focused !== null && this.setState({focused: !!focused});
    };

    render() {
        const {
                option,
                noDefaultStyles,
                className,
                style,
                disabled: disabledProp,
                selected: selectedProp,
                focused: focusedProp,
            } = this.props,
            {disabled, selected, focused} = this.state;

        const optionClassnames =
                "EzSelect-option" +
                (className ? " " + className : "") +
                (focused && " EzSelect-focused") +
                (selected && " EzSelect-selected") +
                (disabled && " EzSelect-disabled"),
            optionStyles = {
                ...(!this.props.noDefaultStyles && defaultStyles.common),
                ...(!this.props.noDefaultStyles && focused && defaultStyles.focused),
                ...(!this.props.noDefaultStyles && selected && defaultStyles.selected),
                ...(!this.props.noDefaultStyles && disabled && defaultStyles.disabled),
            };

        return (
            <div
                key={`option_${option.value}`}
                className={optionClassnames}
                onMouseEnter={this.handleOptionMouseEnter}
                onMouseLeave={this.handleOptionMouseLeave}
                onClick={this.handleOptionClick}
                style={optionStyles}
                ref={ref => (this.element = ref)}>
                {option.label}
            </div>
        );
    }
}
