import React, { useCallback, useMemo, useState } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import Leaf from "../leaf";
import Element from "../element";
import MarkButton from "../MarkButton";
import BlockButton from "../BlockButton";
import { Toolbar, BoldIcon, ItalicIcon, UnderlineIcon, Button } from "./style";
import AnimationList from "../AnimationList";
import { MODES } from "../withMode";

const VividEditor = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const [mode, setMode] = useState(MODES.HOVER);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} mode={mode} />, [
    mode,
  ]);
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
        <Button
          type="button"
          active={mode === MODES.HOVER}
          disabled={mode === MODES.HOVER}
          onClick={() => setMode(MODES.HOVER)}
        >
          HOVER
        </Button>
        <Button
          type="button"
          active={mode === MODES.REPEAT}
          disabled={mode === MODES.REPEAT}
          onClick={() => setMode(MODES.REPEAT)}
        >
          REPEAT
        </Button>
        <Button
          type="button"
          active={mode === MODES.INVIEW}
          disabled={mode === MODES.INVIEW}
          onClick={() => setMode(MODES.INVIEW)}
        >
          INVIEW
        </Button>
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
      />
      <AnimationList />
    </Slate>
  );
};

export default VividEditor;
