import React from "react";
import { shallow } from "enzyme";
import Sneak from "../component";

describe("Sneak", () => {
  it("should render successfully", () => {
    const component = shallow(<Sneak>Hide and sneak</Sneak>);
    expect(component).toMatchSnapshot();
  });
});
