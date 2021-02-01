import React from "react";
import { shallow } from "enzyme";
import Element from "../index";

// * it should evaluate element type and render corresponding element
// * it should contain children in element
// * when no element type was found, it renders `p` element

const defaultProps = { element: { type: "heading-two" } };

describe("Element", () => {
  it("renders successfully", () => {
    const wrapper = shallow(<Element {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders h2 when heading-two is given", () => {
    const wrapper = shallow(<Element {...defaultProps} />);
    expect(wrapper.find("h2").length).toEqual(1);
  });
});
