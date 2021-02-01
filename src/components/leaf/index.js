import React from "react";
import animations from "../../animations";
import { MODES } from "../withMode";
import { has, find } from "lodash-es";

/**
 * Functional Component
 * renders inline text element given by slate editor.
 * editor passes leaf object when it renders text.
 * this component is important since text animation components get rendred in this component.
 * you can set several values in leaf object using slate api.
 *
 * @param  {additional elment attributes} attributes
 * @param  {inner content of the element} children
 * @param  {animation behaviour flag (REPEAT, HOVER, INVIEW)} mode
 * @param  {object that contains animation component info} leaf
 *
 * @return animation component or inline text element. if no element type found, it returns span element.
 *
 * @test
 * it should evaluate element type and render corresponding text animation components.
 * it should contain children in element
 * when no element type was found, it renders `span`element
 */
const Leaf = ({ attributes, children, mode, leaf }) => {
  let animationKey;
  if ((animationKey = find(Object.keys(animations), (key) => has(leaf, key)))) {
    const Animation = animations[animationKey];
    return (
      <Animation mode={mode} {...attributes}>
        {leaf.text}
      </Animation>
    );
  }

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

Leaf.defaultProps = {
  mode: MODES.REPEAT,
  leaf: {},
};

export default Leaf;
