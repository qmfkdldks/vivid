import React from "react";
import Focus from "./index";

export default {
  title: "Animations/Focus",
  component: Focus,
};

const Template = (args) => <Focus {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: "Focus",
};

export const LongText = Template.bind({});

LongText.args = {
  children: "long text with space",
};
