import * as React from "react";
import * as PropTypes from "prop-types";

type SelectOptionProps = React.HTMLProps<HTMLDivElement> & {
  label: any;
  option: object;

  disabled?: boolean;
  focused?: boolean;
  selected?: boolean;
  hovered?: boolean;
  scrollIntoViewOnFocus?: ScrollLogicalPosition;
  scrollIntoViewOnSelect?: ScrollLogicalPosition;

  disabledClassName?: string;
  focusedClassName?: string;
  selectedClassName?: string;
  hoveredClassName?: string;

  disabledStyle?: React.CSSProperties;
  focusedStyle?: React.CSSProperties;
  selectedStyle?: React.CSSProperties;
  hoveredStyle?: React.CSSProperties;

  onDisabledChange?: (option: object, value: boolean) => void;
  onFocusedChange?: (option: object, value: boolean) => void;
  onSelectedChange?: (option: object, value: boolean) => void;
  onHoveredChange?: (option: object, value: boolean) => void;

  elementRef?: (element: HTMLDivElement | null) => void;
};

type SelectOptionState = {
  disabled: boolean;
  focused: boolean;
  selected: boolean;
  hovered: boolean;
};

export default class SelectOption extends React.Component<SelectOptionProps, SelectOptionState> {
  public element: HTMLDivElement | null;

  static propTypes = {
    label: PropTypes.any.isRequired,
    option: PropTypes.any.isRequired,

    disabled: PropTypes.bool,
    focused: PropTypes.bool,
    selected: PropTypes.bool,
    hovered: PropTypes.bool,

    scrollIntoViewOnFocus: PropTypes.string,
    scrollIntoViewOnSelect: PropTypes.string,

    disabledClassName: PropTypes.string,
    focusedClassName: PropTypes.string,
    selectedClassName: PropTypes.string,
    hoveredClassName: PropTypes.string,

    disabledStyle: PropTypes.object,
    focusedStyle: PropTypes.object,
    selectedStyle: PropTypes.object,
    hoveredStyle: PropTypes.object,

    onDisabledChange: PropTypes.func,
    onFocusedChange: PropTypes.func,
    onSelectedChange: PropTypes.func,
    onHoveredChange: PropTypes.func,

    elementRef: PropTypes.func
  } as PropTypes.InferProps<SelectOptionProps>;

  static defaultProps = {
    disabledClassName: "disabled",
    focusedClassName: "focused",
    selectedClassName: "selected",
    hoveredClassName: "hovered"
  };

  constructor(props) {
    super(props);

    this.state = {
      disabled: this.props.disabled || false,
      selected: this.props.selected || false,
      focused: this.props.focused || false,
      hovered: this.props.hovered || false
    };
  }

  public componentDidUpdate(
    prevProps: Readonly<SelectOptionProps>,
    prevState: Readonly<SelectOptionState>,
    snapshot?: any
  ): void {
    if (this.props.disabled !== this.state.disabled && prevProps.disabled !== this.props.disabled) {
      this.setState({ disabled: !!this.props.disabled });
    }
    if (this.props.selected !== this.state.selected && prevProps.selected !== this.props.selected) {
      this.setState({ selected: !!this.props.selected });
    }
    if (this.props.focused !== this.state.focused && prevProps.focused !== this.props.focused) {
      this.setState({ focused: !!this.props.focused });
    }
    if (this.props.hovered !== this.state.hovered && prevProps.hovered !== this.props.hovered) {
      this.setState({ hovered: !!this.props.hovered });
    }

    if (prevState.disabled !== this.state.disabled) {
      this.props.onDisabledChange && this.props.onDisabledChange(this.props.option, this.state.disabled);
    }
    if (prevState.hovered !== this.state.hovered) {
      this.props.onHoveredChange && this.props.onHoveredChange(this.props.option, this.state.hovered);
    }
    if (prevState.focused !== this.state.focused) {
      this.props.onFocusedChange && this.props.onFocusedChange(this.props.option, this.state.focused);

      if (this.state.focused && this.props.scrollIntoViewOnFocus) {
        setTimeout(() => {
          this.element &&
            this.element.scrollIntoView({
              behavior: "auto",
              block: this.props.scrollIntoViewOnFocus
            });
        }, 50);
      }
    }
    if (prevState.selected !== this.state.selected) {
      this.props.onSelectedChange && this.props.onSelectedChange(this.props.option, this.state.selected);

      if (this.state.selected && this.props.scrollIntoViewOnSelect) {
        setTimeout(() => {
          this.element &&
            this.element.scrollIntoView({
              behavior: "auto",
              block: this.props.scrollIntoViewOnSelect
            });
        }, 50);
      }
    }
  }

  private handleElementMouseEnter = (evt: React.MouseEvent<any>) => {
    this.props.onMouseEnter && this.props.onMouseEnter(evt);
    this.setState({ hovered: true });
  };
  private handleElementMouseLeave = (evt: React.MouseEvent<any>) => {
    this.props.onMouseLeave && this.props.onMouseLeave(evt);
    this.setState({ hovered: false });
  };

  private ref = (ref: HTMLDivElement | null) => {
    this.element = ref;

    this.props.elementRef && this.props.elementRef(ref);
  };

  render(): React.ReactElement<any> {
    const {
      label,
      option,
      disabled,

      focused,
      selected,
      hovered,

      scrollIntoViewOnFocus,
      scrollIntoViewOnSelect,

      disabledClassName,
      focusedClassName,
      selectedClassName,
      hoveredClassName,

      disabledStyle,
      focusedStyle,
      selectedStyle,
      hoveredStyle,

      onDisabledChange,
      onFocusedChange,

      onSelectedChange,
      onHoveredChange,

      elementRef,

      ...props
    } = this.props;

    props.className =
      "EzSelect-Option" +
      (this.props.className ? " " + this.props.className : "") +
      (this.state.disabled ? " " + disabledClassName : "") +
      (this.state.focused ? " " + focusedClassName : "") +
      (this.state.selected ? " " + selectedClassName : "") +
      (this.state.hovered ? " " + hoveredClassName : "");

    props.style = {
      ...this.props.style,
      ...(this.state.disabled && this.props.disabledStyle),
      ...(this.state.focused && this.props.focusedStyle),
      ...(this.state.selected && this.props.selectedStyle),
      ...(this.state.hovered && this.props.hoveredStyle)
    };

    props.onMouseEnter = this.handleElementMouseEnter;
    props.onMouseLeave = this.handleElementMouseLeave;

    return <div {...props} ref={this.ref} children={label} />;
  }
}
