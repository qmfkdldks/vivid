import React from "react";
import withMode, { MODES } from "./index";
import Sneak from "../../animations/sneak/component";

const Component = withMode(Sneak);

export default {
  title: "components/withMode",
  description: "HOC component which adds different animation triggers",
  argTypes: {
    children: {
      name: "children",
      description: "text which should be animated",
    },
    mode: {
      name: "mode",
      description: "trigger text animation depending on the modes",
      control: {
        type: "select",
        options: [MODES.INVIEW, MODES.REPEAT, MODES.HOVER],
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ fontSize: "30px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum
        bibendum tortor, eget rhoncus leo varius id. Donec in accumsan Proin
        consequat dui id velit faucibus ultricies. Aliquam in tellus a justo
        porttitor bibendum a et nibh. Proin eget nulla bibendum, accumsan massa
        ut, bibendum sapien. Suspendisse luctus, purus tempor consequat mattis,
        eros enim congue velit, ac porttitor ex magna at enim. Cras in lacinia
        eros. Nulla maximus ultricies lorem. <Story /> Mauris et urna blandit,
        commodo lorem at, lacinia sapien. Pellentesque et velit id nunc
        facilisis placerat. Praesent vitae sapien non felis ultricies tincidunt.
      </div>
    ),
  ],
};

const Template = (args) => <Component {...args} />;

export const Repeat = Template.bind({});

Repeat.args = {
  mode: MODES.REPEAT,
  children: "Text",
};

export const InView = Template.bind({});

InView.args = {
  mode: MODES.INVIEW,
  children: "Text",
};

export const Hover = Template.bind({});

Hover.args = {
  mode: MODES.HOVER,
  children: "when you hover, starts animation",
};
