import React from "react";
import { shallow } from "enzyme";
import Renderer from "../index";

describe("Renderer", () => {
  it("should render successfully", () => {
    const component = shallow(<Renderer />);
    expect(component).toMatchSnapshot();
  });
});
