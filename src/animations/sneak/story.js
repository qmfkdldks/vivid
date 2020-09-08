import React from "react";
import Sneak from "./index";

export default {
  title: "Animations/Sneak",
  component: Sneak,
};

const Template = (args) => <Sneak {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: "Sneak",
};

export const LongText = Template.bind({});

LongText.args = {
  children: "long text with space",
};
