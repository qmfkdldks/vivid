import React from "react";
import Fall from "./component";

export default {
  title: "Animations/Fall",
  component: Fall,
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
};

const Template = (args) => <Fall {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: "fall",
  control: "start",
};

Basic.decorators = [
  (Story) => (
    <div style={{ padding: "20px", fontSize: "46px" }}>
      <Story />
    </div>
  ),
];

export const Paragraph = Template.bind({});

Paragraph.args = {
  children: "fall",
  control: "start",
};

Paragraph.decorators = [
  (Story) => (
    <div style={{ maxWidth: "300px" }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum
      bibendum tortor, eget <Story /> rhoncus leo varius id. Donec in accumsan
      tortor. Proin consequat dui id velit faucibus ultricies. Aliquam in tellus
      a justo porttitor bibendum a et nibh.
    </div>
  ),
];
