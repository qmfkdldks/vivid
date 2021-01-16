import React, { useCallback, useMemo, useState } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import Leaf from "../leaf";
import Element from "../element";
import MarkButton from "../MarkButton";
import BlockButton from "../BlockButton";
import { Toolbar, BoldIcon, ItalicIcon, UnderlineIcon } from "./style";
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
        <MarkButton format="sneak">
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

export default VividEditor;
