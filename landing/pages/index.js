import React from 'react'

import Header from '../components/header'
import { createGlobalStyle } from 'styled-components'

const App = () => {
  return (
    <>
      <Header />
      <GlobalStyle />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
`

export default App
