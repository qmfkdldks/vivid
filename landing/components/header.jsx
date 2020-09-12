import React from 'react'
import styled from 'styled-components'
import { CodeBlock, nord } from 'react-code-blocks'

const Header = () => (
  <Container>
    <Left>
      <Title>
        <span style={{ color: '#ea2e4d' }}>Vivid </span>
        Editor
      </Title>
      <span style={{ color: 'rgba(0,0,0,0.31)' }}>Kinetic Text Editor</span>
      <Description>
        An Interavtive and Animated Text Editor. Integrate with your site and
        make text alive!
      </Description>
      <CodeBlock
        text='npm install vivid'
        language='bash'
        theme={nord}
        showLineNumbers={false}
      />
      <img
        width={50}
        style={{ margin: 10 }}
        src='https://cdn.worldvectorlogo.com/logos/react.svg'
      />
    </Left>
  </Container>
)

export default Header

const Container = styled.header`
  font-family: 'Nunito', sans-serif;
  display: flex;
  flex-wrap: wrap;
  padding-top: 100px;
  padding-bottom: 80px;
  max-width: 1440px;
  margin: 0 auto;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`

const Title = styled.h1`
  font-family: 'Nunito', sans-serif;
  font-size: 60px;
  font-weight: bold;
`

const Description = styled.p`
  font-size: 30px;
  line-height: 41px;
  font-weight: 700;
`

const Example = styled.div`
  margin-left: auto;
  margin-right: auto;
`
