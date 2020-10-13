import React, { useCallback, useMemo, useState } from "react";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import Leaf from "../leaf";
import Element from "../element";
import { Button, Toolbar, BoldIcon, ItalicIcon, UnderlineIcon } from "./style";
import Sneak from "../../animations/sneak";
import { MODES } from "../withMode";

const VividEditor = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar>
        <BlockButton format="heading-two">Title</BlockButton>
        <BlockButton format="heading-four">Subtitle</BlockButton>
        <MarkButton format="bold">
          <BoldIcon />
        </MarkButton>
        <MarkButton format="italic">
          <ItalicIcon />
        </MarkButton>
        <MarkButton format="underline">
          <UnderlineIcon />
        </MarkButton>
        <MarkButton format={Sneak.displayName}>
          <Sneak mode={MODES.HOVER}>Sneak</Sneak>
        </MarkButton>
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
      />
    </Slate>
  );
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

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const BlockButton = ({ format, children }) => {
  const editor = useSlate();

  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {children}
    </Button>
  );
};

const MarkButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onClick={() => {
        toggleMark(editor, format);
      }}
    >
      {children}
    </Button>
  );
};

export default VividEditor;
