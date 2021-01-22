import React from "react";
import { shallow } from "enzyme";
import Levitation, { Word } from "../component";

describe("Levitation", () => {
  it("render null when text is empty", () => {
    const wrapper = shallow(<Levitation></Levitation>);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it("render null when text is empty", () => {
    const wrapper = shallow(<Levitation>text</Levitation>);
    expect(wrapper.find(Word)).toHaveLength(12);
  });
});
