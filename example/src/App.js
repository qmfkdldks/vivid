import React from 'react'

import { ExampleComponent, AnimatedTextEditor } from 'vivid'
import 'vivid/dist/index.css'

const App = () => {
  return (
    <>
      <AnimatedTextEditor />
      <ExampleComponent text='Create React Library Example 😄' />
    </>
  )
}

export default App
