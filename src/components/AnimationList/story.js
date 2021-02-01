import React from "react";
import AnimationList from "./index";
import { withReact, Slate } from "slate-react";
import { createEditor } from "slate";

export default {
  title: "components/AnimationList",
  component: AnimationList,
  parameters: {
    docs: {
      storyDescription:
        "it lists all text animations in a horizontal container.",
    },
  },
  decorators: [
    (Story) => {
      const editor = React.useMemo(() => withReact(createEditor()), []);

      return (
        <Slate editor={editor}>
          <Story />
        </Slate>
      );
    },
  ],
};

const Template = (args) => {
  return <AnimationList {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
