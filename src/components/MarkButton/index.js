import React from "react";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import { Button } from "./style";

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

/**
 * Functional Component
 * renders button element. it is used to apply inline style (leaft) on selected text.
 *
 * @param  {additional elment attributes} format
 * @param  {inner content of the element} children
 *
 * @return button elmement
 *
 * @test
 * it should have active true if isMarkActive returns true
 * it should call toggleMark onClick
 * it should renders children
 */
const MarkButton = ({ format, tooltip, children }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onClick={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      data-tip={tooltip}
    >
      {children}
    </Button>
  );
};

MarkButton.displayName = "MarkButton";

export default MarkButton;
