import PropTypes from "prop-types";
import React from "react";

export default class SingleOption extends React.Component {
    static propTypes = {
        option: PropTypes.shape({
            value: PropTypes.any.isRequired,
            label: PropTypes.any.isRequired,
            disabled: PropTypes.bool,
            selected: PropTypes.bool,
        }).isRequired,

        className: PropTypes.string,
        style: PropTypes.object,
        styleFocused: PropTypes.object,
        styleDisabled: PropTypes.object,
        styleSelected: PropTypes.object,

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
            disabled: this.props.disabled ?? this.props.option.disabled ?? false,
            selected: this.props.selected ?? this.props.option.selected ?? false,
            focused: this.props.focused ?? false,
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

    setDisabled(disabled = null) {
        disabled !== null && this.setState({disabled: !!disabled});
    }

    setSelected(selected = null) {
        selected !== null && this.setState({selected: !!selected});
    }

    setFocused(focused = null) {
        focused !== null && this.setState({focused: !!focused});
    }

    render() {
        const {
                option,
                className,
                style,
                styleFocused,
                styleSelected,
                styleDisabled,
                disabled: disabledProp,
                selected: selectedProp,
                focused: focusedProp,
            } = this.props,
            {disabled, selected, focused} = this.state;

        const optionClassNames =
                "EzSelect-option" +
                (className ? " " + className : "") +
                (focused ? " EzSelect-focused" : "") +
                (selected ? " EzSelect-selected" : "") +
                (disabled ? " EzSelect-disabled" : ""),
            optionStyles = {
                ...style,
                ...(focused && styleFocused),
                ...(selected && styleSelected),
                ...(disabled && styleDisabled),
            };

        return (
            <div
                key={`option_${option.value}`}
                className={optionClassNames}
                onMouseEnter={this.handleOptionMouseEnter}
                onMouseLeave={this.handleOptionMouseLeave}
                onClick={disabled ? null : this.handleOptionClick}
                style={optionStyles}
                ref={ref => (this.element = ref)}>
                {option.label}
            </div>
        );
    }
}
