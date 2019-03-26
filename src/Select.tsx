import * as React from "react";
import * as PropTypes from "prop-types";
import { Dropdown, DropdownContent, DropdownTrigger } from "react-ez-dropdown";
import { Scrollbar, ScrollbarProps } from "react-scrollbars-custom";
import SelectOption from "./SelectOption";
import { isModifiedEvent, mergeProps } from "./util";
import cnb from "cnbuilder";

const defaultStyles = {
  holder: {
    position: "relative",
    userSelect: "none",
    display: "inline-block"
  } as React.CSSProperties,

  control: {
    position: "relative",
    display: "inline-flex",
    border: "1px solid #aaa",
    borderRadius: 2
  } as React.CSSProperties,

  placeholder: {
    display: "block",
    position: "relative",
    boxSizing: "border-box",
    padding: "4px 12px",
    cursor: "pointer"
  } as React.CSSProperties,

  indicators: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    padding: "4px 12px 4px 0"
  } as React.CSSProperties,

  dropdown: {
    position: "absolute",
    top: "calc(100% + 2px)",
    left: 0,
    minWidth: "100%",
    border: "1px solid #aaa",
    borderRadius: 2,
    background: "#fff",
    boxShadow: "0 1px 6px rgba(0,0,0,.35)"
  } as React.CSSProperties,

  scrollbar: {
    wrapper: {
      right: 0,
      bottom: 0
    } as React.CSSProperties,
    content: {
      lineHeight: 0,
      fontSize: 0
    } as React.CSSProperties
  },

  option: {
    regular: {
      flexShrink: 0,
      padding: "4px 24px 4px 12px",
      display: "inline-block",
      minWidth: "100%",
      boxSizing: "border-box",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      lineHeight: "initial",
      fontSize: "initial"
    } as React.CSSProperties,

    focused: {
      background: "rgba(0, 159, 255, .5)"
    } as React.CSSProperties,

    selected: {
      fontWeight: "bold"
    } as React.CSSProperties
  }
};

enum SWITCH_DIRECTION {
  UP = "up",
  DOWN = "down",
  FIRST = "first",
  LAST = "last"
}

export type OptionItem = {
  value: any;
  label: any;

  disabled?: boolean;
  selected?: boolean;

  [key: string]: any;
};

export type SelectProps = React.HTMLProps<HTMLDivElement> & {
  options: OptionItem[];
  value?: any;

  placeholder?: string;
  placeholderMediator?: (option: OptionItem) => any;

  onChange?: (val: any) => void;
  onInput?: (val: any) => void;

  onOpen?: () => void;
  onClose?: () => void;

  dropdownOpened?: boolean;
  dropdownOpenedOnInit?: boolean;
  dropdownRemoveOnHide?: boolean;
  dropdownCloseOnEsc?: boolean;
  dropdownCloseOnBlur?: boolean;
  dropdownCloseOnSelect?: boolean;
  dropdownOpenOnFocus?: boolean;
  dropdownMaxHeight?: number;
  dropdownMaxWidth?: number;

  openedClassName?: string;

  controlProps?: React.HTMLProps<HTMLDivElement>;
  placeholderProps?: React.HTMLProps<HTMLDivElement>;
  indicatorsProps?: React.HTMLProps<HTMLDivElement>;
  indicators?: React.ReactElement<any>[];
  dropdownProps?: React.HTMLProps<HTMLDivElement>;
  optionProps?: React.HTMLProps<HTMLDivElement>;
  dropdownScrollbarProps?: ScrollbarProps;

  openedProps?: SelectProps;
  controlOpenedProps?: React.HTMLProps<HTMLDivElement>;
  placeholderOpenedProps?: React.HTMLProps<HTMLDivElement>;
  indicatorsOpenedProps?: React.HTMLProps<HTMLDivElement>;
  dropdownOpenedProps?: React.HTMLProps<HTMLDivElement>;
  optionOpenedProps?: React.HTMLProps<HTMLDivElement>;
  dropdownScrollbarOpenedProps?: ScrollbarProps;

  tabIndex?: number | string;

  noDefaultStyles?: boolean;
};
export type SelectState = {
  opened: boolean;

  selectOptionSource: string | null;
  selectedOptionIdx: number | null;
  focusOptionSource: string | null;
  focusedOptionIdx: number | null;
};

export default class Select extends React.Component<SelectProps, SelectState> {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any.isRequired,
        label: PropTypes.any.isRequired,
        disabled: PropTypes.bool,
        selected: PropTypes.bool
      })
    ).isRequired,

    value: PropTypes.any,

    placeholder: PropTypes.element,
    placeholderMediator: PropTypes.func,

    indicators: PropTypes.arrayOf(PropTypes.element),

    onChange: PropTypes.func,
    onInput: PropTypes.func,

    onOpen: PropTypes.func,
    onClose: PropTypes.func,

    openedClassName: PropTypes.string,

    dropdownOpened: PropTypes.bool,
    dropdownOpenedOnInit: PropTypes.bool,
    dropdownRemoveOnHide: PropTypes.bool,
    dropdownCloseOnEsc: PropTypes.bool,
    dropdownCloseOnBlur: PropTypes.bool,
    dropdownCloseOnSelect: PropTypes.bool,
    dropdownOpenOnFocus: PropTypes.bool,
    dropdownMaxHeight: PropTypes.bool,
    dropdownMaxWidth: PropTypes.bool,

    controlProps: PropTypes.object,
    placeholderProps: PropTypes.object,
    indicatorsProps: PropTypes.object,
    dropdownProps: PropTypes.object,
    optionProps: PropTypes.object,
    dropdownScrollbarProps: PropTypes.object,

    openedProps: PropTypes.object,
    controlOpenedProps: PropTypes.object,
    placeholderOpenedProps: PropTypes.object,
    indicatorsOpenedProps: PropTypes.object,
    dropdownOpenedProps: PropTypes.object,
    optionOpenedProps: PropTypes.object,
    dropdownScrollbarOpenedProps: PropTypes.object,

    tabIndex: PropTypes.number,

    noDefaultStyles: PropTypes.bool
  };

  static defaultProps = {
    dropdownRemoveOnHide: true,
    dropdownCloseOnEsc: true,
    dropdownCloseOnBlur: true,
    dropdownCloseOnSelect: true,

    openedClassName: "opened",

    indicators: [
      <div
        key="arrow"
        style={{
          width: 10,
          height: 10,
          position: "relative",
          boxShadow: "-2px -2px #000 inset",
          transform: "rotate(45deg)",
          marginLeft: 4,
          marginTop: -4
        }}
      />
    ],

    placeholder: "Select...",
    tabIndex: 0
  };

  public holderElement: HTMLDivElement | null;
  public triggerElement: HTMLDivElement | null;
  public placeholderElement: HTMLDivElement | null;
  public indicatorsElement: HTMLDivElement | null;
  public dropdownElement: HTMLDivElement | null;
  public scrollbar: Scrollbar | null;

  public constructor(props) {
    super(props);

    this.state = {
      opened:
        this.props.dropdownOpenedOnInit || this.props.dropdownOpened || false,

      selectOptionSource: null,
      selectedOptionIdx:
        this.props.value !== undefined
          ? this.findValueIndex(this.props.value)
          : null,

      focusOptionSource: null,
      focusedOptionIdx: null
    };
  }

  public componentDidUpdate(
    prevProps: Readonly<SelectProps>,
    prevState: Readonly<SelectState>,
    snapshot?: any
  ): void {
    this.state.opened && this.triggerElement && this.triggerElement.focus();

    if (this.state.opened !== prevState.opened) {
      this.blurTimeout && window.clearTimeout(this.blurTimeout);
    }
    if (
      prevProps.options !== this.props.options ||
      prevProps.options.length !== this.props.options.length ||
      (prevProps.value !== this.props.value &&
        (!this.state.selectedOptionIdx ||
          this.props.value !==
            this.props.options[this.state.selectedOptionIdx].value))
    ) {
      const valueIndex = this.findValueIndex(this.props.value);
      this.setState({
        selectedOptionIdx: valueIndex,
        focusedOptionIdx: valueIndex,
        focusOptionSource: "select"
      });
    }
  }

  public switchFocusedOption = (
    direction: SWITCH_DIRECTION = SWITCH_DIRECTION.FIRST,
    switchSource: string | null = null
  ): this => {
    const focusedOptionIdx = this.state.focusedOptionIdx || 0;

    const { options } = this.props;

    let idxToSet = 0;

    switch (direction) {
      case SWITCH_DIRECTION.UP:
        idxToSet =
          (focusedOptionIdx > 0 ? focusedOptionIdx : options.length) - 1;
        break;

      case SWITCH_DIRECTION.DOWN:
        idxToSet =
          focusedOptionIdx === options.length - 1 ? 0 : focusedOptionIdx + 1;
        break;

      case SWITCH_DIRECTION.FIRST:
        idxToSet = 0;
        break;

      case SWITCH_DIRECTION.LAST:
        idxToSet = options.length - 1;
        break;
    }

    this.setState({
      focusedOptionIdx: idxToSet,
      focusOptionSource: switchSource
    });

    return this;
  };
  public switchSelectedOption = (
    direction: SWITCH_DIRECTION = SWITCH_DIRECTION.FIRST,
    switchSource: string | null = null
  ): this => {
    const selectedOptionIdx = this.state.selectedOptionIdx || 0;

    const { options } = this.props;

    let idxToSet = 0;

    switch (direction) {
      case SWITCH_DIRECTION.UP:
        idxToSet =
          (selectedOptionIdx > 0 ? selectedOptionIdx : options.length) - 1;
        break;

      case SWITCH_DIRECTION.DOWN:
        idxToSet =
          selectedOptionIdx === options.length - 1 ? 0 : selectedOptionIdx + 1;
        break;

      case SWITCH_DIRECTION.FIRST:
        idxToSet = 0;
        break;

      case SWITCH_DIRECTION.LAST:
        idxToSet = options.length - 1;
        break;
    }

    this.setState({
      selectedOptionIdx: idxToSet,
      selectOptionSource: switchSource
    });

    return this;
  };

  public findOptionIndex = (option: OptionItem): number | null => {
    const idx = this.props.options.indexOf(option);

    return idx >= 0 ? idx : null;
  };
  public findValueIndex = (val: any): number | null => {
    const idx = this.props.options.findIndex(option => option.value === val);

    return idx >= 0 ? idx : null;
  };

  public focusOption = (
    option?: OptionItem | null,
    idx: number | null = null,
    source: string | null = null
  ): this => {
    if (option) {
      idx = this.findOptionIndex(option);
    }

    this.setState({
      focusedOptionIdx: idx || 0,
      focusOptionSource: source
    });

    return this;
  };
  public selectOption = (
    option?: OptionItem | null,
    idx: number | null = null,
    source: string | null = null
  ): this => {
    if (option) {
      idx = this.findOptionIndex(option);
    }

    this.setState({
      selectedOptionIdx: idx || 0,
      selectOptionSource: source
    });

    return this;
  };

  private handleDocumentKeyDown = (evt: KeyboardEvent) => {
    switch (evt.key) {
      case "ArrowUp":
        evt.preventDefault();
        (this.state.opened
          ? this.switchFocusedOption
          : this.switchSelectedOption)(SWITCH_DIRECTION.UP, "keyboard");

        break;

      case "ArrowDown":
        evt.preventDefault();
        (this.state.opened
          ? this.switchFocusedOption
          : this.switchSelectedOption)(SWITCH_DIRECTION.DOWN, "keyboard");

        break;

      case "Home":
        evt.preventDefault();
        (this.state.opened
          ? this.switchFocusedOption
          : this.switchSelectedOption)(SWITCH_DIRECTION.FIRST, "keyboard");

        break;

      case "End":
        evt.preventDefault();
        (this.state.opened
          ? this.switchFocusedOption
          : this.switchSelectedOption)(SWITCH_DIRECTION.LAST, "keyboard");

        break;

      case "Enter":
        evt.preventDefault();
        if (this.state.opened) {
          this.setState({
            opened: !this.props.dropdownCloseOnSelect,
            selectedOptionIdx: this.state.focusedOptionIdx
          });
          this.triggerElement && this.triggerElement.focus();
        } else {
          this.setState({
            opened: true
          });
        }
        break;
    }
  };

  private handleDropdownShow = () => {
    this.props.onOpen && this.props.onOpen.call(this);

    this.setState({
      opened: true,
      focusedOptionIdx: this.state.selectedOptionIdx,
      focusOptionSource: "select"
    });
    (!this.triggerElement || this.triggerElement !== document.activeElement) &&
      document.body.addEventListener("keydown", this.handleDocumentKeyDown);
  };
  private handleDropdownHide = () => {
    this.props.onClose && this.props.onClose.call(this);

    this.setState({
      opened: false,
      focusedOptionIdx: null,
      focusOptionSource: null
    });
    (!this.triggerElement || this.triggerElement !== document.activeElement) &&
      document.body.removeEventListener("keydown", this.handleDocumentKeyDown);
  };

  private renderOptionsList = options => {
    let scrollIntoViewOnFocus;
    if (this.state.focusOptionSource === "keyboard") {
      scrollIntoViewOnFocus = "nearest";
    } else if (this.state.focusOptionSource === "select") {
      scrollIntoViewOnFocus = "center";
    }

    return (
      !!options.length &&
      options.map((option, idx) => (
        <SelectOption
          key={`option${idx}`}
          option={option}
          value={option.value}
          label={option.label}
          style={
            this.props.noDefaultStyles
              ? undefined
              : defaultStyles.option.regular
          }
          focused={idx === this.state.focusedOptionIdx}
          scrollIntoViewOnFocus={scrollIntoViewOnFocus}
          selected={idx === this.state.selectedOptionIdx}
          disabled={option.disabled || false}
          focusedStyle={
            this.props.noDefaultStyles
              ? undefined
              : defaultStyles.option.focused
          }
          selectedStyle={
            this.props.noDefaultStyles
              ? undefined
              : defaultStyles.option.selected
          }
          onClick={evt => {
            this.triggerElement && this.triggerElement.focus();

            if (isModifiedEvent(evt)) {
              return;
            }

            this.setState({
              opened: !this.props.dropdownCloseOnSelect
            });
            this.selectOption(null, idx);
          }}
          onMouseEnter={() => this.focusOption(null, idx)}
        />
      ))
    );
  };

  private blurTimeout: number;
  private handleTriggerFocus = () => {
    document.body.addEventListener("keydown", this.handleDocumentKeyDown);

    this.props.dropdownOpenOnFocus && this.setState({ opened: true });
  };
  private handleTriggerBlur = evt => {
    evt.persist();
    document.body.removeEventListener("keydown", this.handleDocumentKeyDown);

    if (this.props.dropdownCloseOnBlur && this.state.opened) {
      this.blurTimeout = window.setTimeout(() => {
        this.setState({
          opened: false
        });
      }, 200);
    }
  };

  public holderRef = (ref: HTMLDivElement | null) => {
    this.holderElement = ref;
  };
  public triggerRef = (ref: HTMLDivElement | null) => {
    this.triggerElement = ref;
  };
  public placeholderRef = (ref: HTMLDivElement | null) => {
    this.placeholderElement = ref;
  };
  public indicatorsRef = (ref: HTMLDivElement | null) => {
    this.indicatorsElement = ref;
  };
  public dropdownRef = (ref: HTMLDivElement | null) => {
    this.dropdownElement = ref;
  };
  public scrollbarRef = ref => {
    this.scrollbar = ref;
  };

  public render(): React.ReactElement<any> {
    const {
      options,

      value,

      placeholder,
      placeholderMediator,

      onChange,
      onInput,

      onOpen,
      onClose,

      openedClassName,

      dropdownOpened,
      dropdownOpenedOnInit,
      dropdownRemoveOnHide,
      dropdownCloseOnEsc,
      dropdownCloseOnBlur,
      dropdownCloseOnSelect,
      dropdownOpenOnFocus,
      dropdownMaxHeight,
      dropdownMaxWidth,

      controlProps,
      placeholderProps,
      indicatorsProps,
      indicators,
      dropdownProps,
      optionProps,
      dropdownScrollbarProps,

      openedProps,
      controlOpenedProps,
      placeholderOpenedProps,
      indicatorsOpenedProps,
      dropdownOpenedProps,
      optionOpenedProps,
      dropdownScrollbarOpenedProps,

      tabIndex,

      noDefaultStyles,

      ...props
    } = this.props;

    props.className = cnb(
      "EzSelect",
      this.props.className,
      this.state.opened && openedClassName
    );
    props.style = noDefaultStyles ? undefined : defaultStyles.holder;

    const holderFinalProps = mergeProps(
      props,
      this.state.opened && openedProps,
      {
        ref: this.holderRef
      }
    );
    const controlFinalProps = mergeProps(
      {
        className: "EzSelect-Control",
        style: noDefaultStyles ? undefined : defaultStyles.control
      },
      controlProps,
      this.state.opened && controlOpenedProps,
      {
        elementRef: this.triggerRef,
        tabIndex,
        onFocus: this.handleTriggerFocus,
        onBlur: this.handleTriggerBlur
      }
    );
    const placeholderFinalProps = mergeProps(
      {
        className: "EzSelect-Placeholder",
        style: noDefaultStyles ? undefined : defaultStyles.placeholder
      },
      placeholderProps,
      this.state.opened && placeholderOpenedProps,
      {
        ref: this.placeholderRef
      }
    );
    const dropdownFinalProps = mergeProps(
      {
        className: "EzSelect-Dropdown",
        style: noDefaultStyles ? undefined : defaultStyles.dropdown
      },
      dropdownProps,
      this.state.opened && dropdownOpenedProps,
      {
        removeWhenHidden: dropdownRemoveOnHide,
        closeOnEscKeypress: dropdownCloseOnEsc,
        closeOnOutsideClick: dropdownCloseOnBlur,
        opened: this.state.opened,
        onShow: this.handleDropdownShow,
        onHide: this.handleDropdownHide,
        elementRef: this.dropdownRef
      }
    );
    const scrollbarFinalProps = mergeProps(
      {
        style: {
          maxHeight: dropdownMaxHeight || undefined,
          maxWidth: dropdownMaxWidth || undefined
        },
        wrapperProps: {
          style: noDefaultStyles ? undefined : defaultStyles.scrollbar.wrapper
        },
        contentProps: {
          style: noDefaultStyles ? undefined : defaultStyles.scrollbar.content
        },
        trackYProps: { style: { right: 2 } },
        trackXProps: { style: { bottom: 2 } }
      },
      dropdownScrollbarProps,
      dropdownOpenedProps,
      {
        translateContentSizesToHolder: true,
        ref: this.scrollbarRef
      }
    );

    let placeholderContent = placeholder;

    if (this.state.selectedOptionIdx !== null) {
      placeholderContent = this.props.placeholderMediator
        ? this.props.placeholderMediator(options[this.state.selectedOptionIdx])
        : options[this.state.selectedOptionIdx].label;
    }

    return (
      <div {...holderFinalProps}>
        <Dropdown>
          <DropdownTrigger {...controlFinalProps}>
            <div {...placeholderFinalProps}>{placeholderContent}</div>
            {!!indicators && !!indicators.length && (
              <div
                {...mergeProps(
                  {
                    className: "EzSelect-Indicators",
                    style: noDefaultStyles
                      ? undefined
                      : defaultStyles.indicators
                  },
                  indicatorsProps,
                  this.state.opened && indicatorsOpenedProps,
                  {
                    ref: this.indicatorsRef,
                    children: indicators
                  }
                )}
              />
            )}
          </DropdownTrigger>

          <DropdownContent {...dropdownFinalProps}>
            <Scrollbar {...scrollbarFinalProps}>
              {this.renderOptionsList(options)}
            </Scrollbar>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  }
}
