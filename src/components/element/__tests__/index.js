import React from "react";
import { shallow } from "enzyme";
import Element from "../index";

describe("Element", () => {
  const defaultProps = { element: { type: "heading-two" } };
  it("should render successfully", () => {
    const wrapper = shallow(<Element {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders h2 when heading-two is given", () => {
    const wrapper = shallow(<Element {...defaultProps} />);
    expect(wrapper.find("h2").length).toEqual(1);
  });
});
