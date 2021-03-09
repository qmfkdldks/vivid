import React from "react";
import styled from "styled-components";
import MarkButton from "../MarkButton";
import animations from "../../animations";
import { MODES } from "../withMode";

const Container = styled.div`
  position: absolute;
  bottom: 10%;
  width: 100%;
  max-width: 768px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  overflow-y: hidden;
  overflow-x: auto;

  button {
    margin-right: 15px;
  }
`;

const AnimationList = () => {
  return (
    <Container>
      {Object.keys(animations).map((key) => {
        const Animation = animations[key];
        return (
          <MarkButton key={key} format={key}>
            <Animation mode={MODES.HOLD}>{key}</Animation>
          </MarkButton>
        );
      })}
    </Container>
  );
};

export default AnimationList;
