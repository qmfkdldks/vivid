import React from "react";
import styled from "styled-components";
import { CodeBlock, CopyBlock, nord } from "react-code-blocks";
import { Editor } from "vivid-editor";

const Header = () => (
  <Container>
    <Left>
      <Title>Vivid Editor</Title>
      <Description>
        An Interavtive and Animated Text Editor. Integrate with your site and
        make text alive!
      </Description>
      <CodeBlock
        text="yarn add vivid-editor"
        language="js"
        theme={nord}
        showLineNumbers={false}
      />
    </Left>

    <div>
      <Editor />
    </div>
  </Container>
);

export default Header;

const Container = styled.header`
  font-family: "Nunito", sans-serif;
  display: flex;
  flex-wrap: wrap;
  padding-top: 100px;
  padding-bottom: 80px;
  max-width: 1440px;
  margin: 0 auto;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

const Title = styled.h1`
  font-family: "Nunito", sans-serif;
  font-size: 60px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Description = styled.p`
  font-size: 30px;
  line-height: 41px;
`;

const Example = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
