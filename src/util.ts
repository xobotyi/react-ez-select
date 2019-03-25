import * as React from "react";

export function isModifiedEvent(
  event:
    | KeyboardEvent
    | MouseEvent
    | TouchEvent
    | React.MouseEvent
    | React.TouchEvent
): boolean {
  return Boolean(
    event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
  );
}

export function mergeProps(...propsList): object {
  let result = propsList.shift();

  for (let props of propsList) {
    if (props) {
      const { className, style, ...restProps } = props;
      result = {
        ...result,
        ...restProps,
        style: {
          ...result.style,
          ...style
        },
        className: (result.className || "") + (className ? " " + className : "")
      };
    }
  }

  return result;
}
