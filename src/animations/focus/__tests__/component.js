import React from "react";
import { shallow } from "enzyme";
import Focus from "../component";

describe("Focus", () => {
  it("should render successfully", () => {
    const component = shallow(<Focus>text</Focus>);
    expect(component).toMatchSnapshot();
  });
});
