import React from 'react'
import styles from './styles.module.css'
import AnimatedTextEditor from './editor'

const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Cowhat mponent: {text}</div>
}

export { ExampleComponent, AnimatedTextEditor }
