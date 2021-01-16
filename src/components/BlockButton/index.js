import React from "react";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import { Button } from "./style";

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);

  Transforms.setNodes(
    editor,
    {
      type: isActive ? null : format,
    },
    { match: (n) => Editor.isBlock(editor, n) }
  );
};

/**
 * Functional Component
 * renders button element. it is used to apply block style (element component) on selected text.
 * ex) h1, p
 *
 * @param  {additional elment attributes} format
 * @param  {inner content of the element} children
 *
 * @return button elmement
 *
 * @test
 * it should have active true if isBlockActive returns true
 * it should call toggleBlock onClick
 * it should renders children
 */
const BlockButton = ({ format, children }) => {
  const editor = useSlate();

  return (
    <Button
      active={isBlockActive(editor, format)}
      onClick={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {children}
    </Button>
  );
};

BlockButton.displayName = "BlockButton";

export default BlockButton;
