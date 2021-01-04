import React from "react";
import { shallow } from "enzyme";
import Focus from "../index";

describe("Focus", () => {
  it("should render successfully", () => {
    const component = shallow(<Focus>Hide and sneak</Focus>);
    expect(component).toMatchSnapshot();
  });
});
