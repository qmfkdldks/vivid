import React from "react";
import Sneak from "./component";

export default {
  title: "Animations/Sneak",
  component: Sneak,
  argTypes: {
    children: {
      name: "children",
      description: "text which should be animated",
    },
    control: {
      name: "control",
      description: "animation variant name or control from useAnimation() hook",
      control: {
        type: "inline-radio",
        options: ["start", "stop"],
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: "3em", fontSize: "29px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum
        bibendum tortor, eget <Story /> rhoncus leo varius id. Donec in accumsan
        tortor. Proin consequat dui id velit faucibus ultricies. Aliquam in
        tellus a justo porttitor bibendum a et nibh. Proin eget nulla bibendum,
        accumsan massa ut, bibendum sapien. Suspendisse luctus, purus tempor
        consequat mattis, eros enim congue velit, ac porttitor ex magna at enim.
        Cras in lacinia eros. Nulla maximus ultricies lorem. Mauris et urna
        blandit, commodo lorem at, lacinia sapien. Pellentesque et velit id nunc
        facilisis placerat. Praesent vitae sapien non felis ultricies tincidunt.
      </div>
    ),
  ],
};

const Template = (args) => <Sneak {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: "sneak",
  control: "start",
};

export const LongText = Template.bind({});

LongText.args = {
  children: "long text with space",
  control: "start",
};
