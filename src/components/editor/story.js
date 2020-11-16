import React from "react";
import Editor from "./index";

export default {
  title: "components/Editor",
  component: Editor,
  argTypes: {
    initialValue: {
      name: "initialValue",
      description: "a text content",
      control: {
        type: "object",
      },
    },
  },
  parameters: {
    docs: {
      storyDescription:
        "Main editor component which receives initial text value and shows available text animations.",
    },
  },
};

const Template = (args) => <Editor {...args} />;

export const Default = Template.bind({});

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable plain text, just like a <textarea>!" },
    ],
  },
];

Default.args = {
  initialValue,
};