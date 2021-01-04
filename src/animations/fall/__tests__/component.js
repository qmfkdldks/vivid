import React from "react";
import { shallow } from "enzyme";
import Fall from "../component";

describe("Fall", () => {
  it("should render successfully", () => {
    const component = shallow(<Fall>Hide and Fall</Fall>);
    expect(component).toMatchSnapshot();
  });
});
