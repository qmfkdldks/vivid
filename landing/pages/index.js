import React, { useState, useCallback } from 'react'
import YouTube from 'react-youtube'

import Header from '../components/header'
import Features from '../components/features'
import { AnimatedTextEditor } from 'vivid-editor'
import styled, { createGlobalStyle } from 'styled-components'

const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    // autoplay: 1
  }
}

const App = () => {
  const [control, setControl] = useState(null)
  const [player, setPlayer] = useState(null)
  const [time, setTime] = useState(0)

  const onReady = useCallback((event) => {
    setPlayer(event.target)
  })

  const onClicked = useCallback(() => {
    setTime(player.getCurrentTime())
    control.stop()
    control.start('visible')
    console.log(time)
  })

  const selectVariant = useCallback((options) => {
    console.log(options)
    console.log(player && player.getCurrentTime())
    return 'visible'
  })

  return (
    <>
      <Header />
      <Features />
      <Title>
        <Colred>Use Case</Colred> #1 Lyrics Site
      </Title>
      <Case>
        <div style={{ width: '100%', maxWidth: '640px' }}>
          <YouTube videoId='jO2viLEW-1A' onReady={onReady} opts={opts} />
        </div>
        <div>
          <AnimatedTextEditor
            initialValue={[
              {
                type: 'paragraph',
                children: [
                  {
                    text: `I might lose my mind
`,
                    tuck: {}
                  },
                  {
                    text: `Waking when the sun's down
`
                  },
                  {
                    text: `Riding all these highs
`,
                    kung: {
                      visible: {
                        transition: {
                          delay: 10.766608
                        }
                      }
                    }
                  }
                ]
              }
            ]}
            selectVariant={selectVariant}
          />
          <h1>Jeremy Zucker - comethru</h1>
        </div>
      </Case>

      <Title>
        <Colred>Use Case</Colred> #2 Novel Site
      </Title>
      <Case>
        <img
          style={{ borderRadius: '5px', maxWidth: '320px' }}
          src='https://2.bp.blogspot.com/-aRUrfyoQ92k/VA79kEKYvfI/AAAAAAAAFZg/ejyuGtA5taM/s1600/biblioteca-babel.jpg'
        />
        <div>
          El universo (que otros llaman la Biblioteca) se compone de un número
          indefinido, y tal vez infinito, de galerías hexagonales, con vastos
          pozos de ventilación en el medio, cercados por barandas
          bajísimas.Desde cualquier hexágono se ven los pisos inferiores y
          superiores: interminablemente.
        </div>
      </Case>

      <GlobalStyle />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
`

export default App

const Case = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 120px 0px;
`

const Title = styled.h1`
  font-family: 'Nunito', sans-serif;
  font-size: 60px;
  font-weight: bold;
  margin-left: 10%;
`

const Colred = styled.span`
  color: #ea2e4d;
`
