import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { ThemeProvider } from "styled-components";
import ReactTooltip from "react-tooltip";
import Leaf from "../leaf";
import Element from "../element";
import MarkButton from "../MarkButton";
import BlockButton from "../BlockButton";
import {
  Toolbar,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  MouseIcon,
  EyeIcon,
  RepeatIcon,
  Button,
} from "./style";
import AnimationList from "../AnimationList";
import { MODES } from "../withMode";
import defaultTheme from "../../constants/theme";

const VividEditor = ({ initialValue, theme, onChange }) => {
  const [value, setValue] = useState(initialValue);
  const [mode, setMode] = useState(MODES.HOVER);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} mode={mode} />, [
    mode,
  ]);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <ThemeProvider theme={{ ...defaultTheme, ...theme }}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          if (onChange !== undefined) {
            onChange(value, mode);
          }
          setValue(value);
        }}
      >
        <Toolbar>
          <BlockButton format="heading-two">Heading</BlockButton>
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
            data-tip="Start animation when cursor is on the text"
          >
            <MouseIcon />
          </Button>
          <Button
            type="button"
            active={mode === MODES.REPEAT}
            disabled={mode === MODES.REPEAT}
            onClick={() => setMode(MODES.REPEAT)}
            data-tip="Repeat animation infinitely"
          >
            <RepeatIcon />
          </Button>
          <Button
            type="button"
            active={mode === MODES.INVIEW}
            disabled={mode === MODES.INVIEW}
            onClick={() => setMode(MODES.INVIEW)}
            data-tip="Start animation when text is in the screen"
          >
            <EyeIcon />
          </Button>
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
        />
        <AnimationList />
      </Slate>
      <ReactTooltip />
    </ThemeProvider>
  );
};

VividEditor.defaultProps = {
  initialValue: [{ type: "paragraph", children: [{ text: "" }] }],
};

VividEditor.propTypes = {
  initialValue: PropTypes.array,
  onChange: PropTypes.func,
};

export default VividEditor;
