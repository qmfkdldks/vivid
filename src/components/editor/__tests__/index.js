import React from "react";
import { shallow, mount } from "enzyme";
import Editor from "../index";

describe("Editor", () => {
  it("should render successfully", () => {
    const component = shallow(<Editor />);
    expect(component).toMatchSnapshot();
  });
});
