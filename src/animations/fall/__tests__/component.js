import React from "react";
import { shallow } from "enzyme";
import Fall from "../component";

describe("Fall", () => {
  it("should render successfully", () => {
    const component = shallow(<Fall>Text</Fall>);
    expect(component).toMatchSnapshot();
  });
});
