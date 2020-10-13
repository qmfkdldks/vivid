import React from "react";
import Renderer from "./index";
import { MODES } from "../withMode";

export default {
  title: "Components/Renderer",
  component: Renderer,
  argTypes: {
    initialValue: {
      name: "initialValue",
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
  parameters: {
    docs: {
      storyDescription: "Read only text animation renderder! 🚀",
    },
  },
};

const Template = (args) => <Renderer {...args} />;

export const Default = Template.bind({});

const initialValue = [
  {
    children: [
      {
        text:
          "Quisque vel orci a arcu sodales suscipit sed eget odio. Vestibulum sit amet dignissim nisi, at pharetra diam. Morbi nec sodales ligula. Aliquam dapibus, nisi maximus finibus porta, turpis ipsum congue mi, vitae imperdiet eros ligula vitae erat. ",
      },
      { text: "Hide and sneak!", sneak: true },
      {
        text:
          "Etiam sit amet ex a urna posuere dictum. Vestibulum imperdiet ullamcorper ligula",
      },
    ],
  },
];

Default.args = {
  initialValue,
  mode: MODES.REPEAT,
};
