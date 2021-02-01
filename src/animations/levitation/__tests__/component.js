import React from "react";
import { shallow } from "enzyme";
import Levitation, { Word } from "../component";

describe("Levitation", () => {
  it("render text as children", () => {
    const wrapper = shallow(<Levitation>text</Levitation>);
    expect(wrapper.find(Word)).toHaveLength(12);
  });
});
