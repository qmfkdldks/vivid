import React from "react";
import Sneak from "../../animations/sneak";

const Leaf = ({ attributes, children, mode, leaf = {} }) => {
  if (leaf.sneak) {
    return (
      <Sneak mode={mode} {...attributes}>
        {leaf.text}
      </Sneak>
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

export default Leaf;
