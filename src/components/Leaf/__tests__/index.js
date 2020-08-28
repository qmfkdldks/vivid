import React from "react";
import { shallow } from "enzyme";
import Leaf from "../index";

describe("Leaf", () => {
  it("should render successfully", () => {
    const component = shallow(<Leaf />);
    expect(component).toMatchSnapshot();
  });
});
