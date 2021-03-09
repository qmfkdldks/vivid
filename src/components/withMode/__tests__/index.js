import React from "react";
import { mount } from "enzyme";
import Sneak from "../../../animations/sneak/component";
import withMode, { MODES } from "../index";
import { useInView } from "react-intersection-observer";

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(() => ({ ref: jest.fn(), inView: true })),
}));

jest.unmock("framer-motion");

import * as framerMotion from "framer-motion";
const mockStartFunction = jest.fn();
const mockSetFunction = jest.fn();

framerMotion.useAnimation = jest
  .fn()
  .mockReturnValue({ start: mockStartFunction, set: mockSetFunction });

const SneakWithMode = withMode(Sneak);

describe("withMode", () => {
  describe("when mode is RPEAT", () => {
    it("transition loop is infinity", () => {
      const wrapper = mount(
        <SneakWithMode mode={MODES.REPEAT}>Hide and sneak</SneakWithMode>
      );
      expect(wrapper.find(Sneak).props()).toEqual({
        control: "start",
        transition: { loop: Infinity, repeatDelay: 3 },
        children: "Hide and sneak",
      });
    });
  });

  describe("when mode is INVIEW", () => {
    it("starts animation when inView is true", () => {
      const wrapper = mount(
        <SneakWithMode mode={MODES.INVIEW}>Hide and sneak</SneakWithMode>
      );

      expect(useInView).toBeCalled();
      expect(wrapper.find(Sneak).props()).toEqual({
        control: "start",
        children: "Hide and sneak",
      });
    });
  });

  describe("when mode is HOVER", () => {
    it("calls useAnimation", () => {
      const wrapper = mount(
        <SneakWithMode mode={MODES.HOVER}>Hide and sneak</SneakWithMode>
      );

      expect(framerMotion.useAnimation).toBeCalled();
      wrapper.find("span").first().simulate("mouseenter");
      expect(mockStartFunction).toBeCalledWith("start");
    });
  });

  describe("when mode is HOLD", () => {
    it("calls useAnimation", () => {
      const wrapper = mount(
        <SneakWithMode mode={MODES.HOVER}>Hold</SneakWithMode>
      );

      expect(framerMotion.useAnimation).toBeCalled();
      wrapper.find("span").first().simulate("mouseenter");
      expect(mockStartFunction).toBeCalledWith("start");
      wrapper.find("span").first().simulate("mouseleave");
      expect(mockSetFunction).toBeCalledWith("stop");
    });
  });
});
