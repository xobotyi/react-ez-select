import * as ReactDOM from "react-dom";
import * as React from "react";
import SelectOption from "../src/SelectOption";

describe("DropdownContent", () => {
  let node: HTMLDivElement;
  beforeAll(() => {
    node = document.createElement("div");
    document.body.appendChild(node);
  });
  afterAll(() => {
    ReactDOM.unmountComponentAtNode(node);
    document.body.removeChild(node);
  });

  it("should render a div", done => {
    ReactDOM.render(
      <SelectOption value={123} label={321} option={{}} />,
      node,
      function() {
        expect(this.element.tagName).toBe("DIV");
        done();
      }
    );
  });
});
