import React from 'react'
import styled from 'styled-components'

const Features = () => (
  <Container>
    <Item>
      <Title>Boared with static text?</Title>
      <Description>
        vivid.js is a React package which provides animated text editor which
        you can integrate with your site. It's built on slate.js
      </Description>
    </Item>
    <Item>
      <Title>Extensible and Customizable</Title>
      <Description>You can add more dynamic text animations. You can also change view as you want</Description>
    </Item>
    <Item>
      <Title>Trigger animation when you want</Title>
      <Description>
        You can trigger text animation on scroll, click or when text is visible!
        Create your own reading experience.
      </Description>
    </Item>
  </Container>
)

export default Features

const Container = styled.div`
  font-family: 'Nunito', sans-serif;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: calc(60px + 100px + 25px);
  padding-bottom: calc(120px);
  width: 100%;
`
const Item = styled.div`
  max-width: 380px;
  margin: 0 15px;
`

const Title = styled.h2`
  color: rgb(41, 41, 41);
  font-weight: 700;
  letter-spacing: 0.5px;
`

const Description = styled.p`
  color: rgba(41, 41, 41, 0.75);
  font-size: 21px;
`
