import React from "react";
import { action } from "@storybook/addon-actions";
import Editor from "./index";
import theme from "../../constants/theme";

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
    theme: {
      name: "theme",
      description: "a collection of colors",
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

export const Empty = Template.bind({});

Empty.args = {
  theme,
  onChange: action("chnaged"),
};

export const Default = Template.bind({});

Default.args = {
  initialValue: [
    {
      type: "paragraph",
      children: [
        { text: "This is editable plain text, just like a <textarea>!" },
      ],
    },
  ],
  theme,
  onChange: action("chnaged"),
};
