import React, { useCallback, useMemo } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import Leaf from "../leaf";
import Element from "../element";
import { MODES } from "../withMode";

const VividRenderer = ({ initialValue, mode = MODES.INVIEW }) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback(
    (props) => <Leaf {...props} mode={mode} />,
    []
  );
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        readOnly
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
};

export default VividRenderer;
