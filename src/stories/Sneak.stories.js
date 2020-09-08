import React from 'react';
import { Sneak } from '../animations/index'
 
export default {
  title: 'Example/Sneak',
  component: Sneak,
};

const Template = (args) => <Sneak  {...args} />;

export const SneakComponent = Template.bind({});


SneakComponent.args = {
   children: 'Sneak',
};
