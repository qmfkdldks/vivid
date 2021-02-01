import React from "react";

/**
 * Functional Component
 * renders block type element given by slate editor.
 * it renders different element depending on the slate internal json
 * which has element.type value. Here you can add custom block type element.
 *
 * @param  {additional elment attributes} attributes
 * @param  {inner content of the element} children
 * @param  {object which represents actual html element} element
 *
 * @return element component given element.type. if no element type found, it returns plain paragraph element.
 *
 * @test
 * it should evaluate element type and render corresponding element
 * it should contain children in element
 * when no element type was found, it renders `p` element
 */
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
