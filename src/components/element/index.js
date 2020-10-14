import React from "react";

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

Element.displayName = "Element";

export default Element;
