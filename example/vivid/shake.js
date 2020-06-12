import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

const variants = {
  visible: {
    transform: 'rotate(45deg)',
    transition: {
      type: 'spring',
      damping: 0.5,
      duration: 2,
      loop: Infinity,
      repeatDelay: 3
    }
  }
}

const Shake = ({ children }) => {
  const [ref, inView] = useInView()

  return (
    <Word ref={ref} animate={inView ? 'visible' : 'hidden'} variants={variants}>
      {children}
    </Word>
  )
}

const Word = styled(motion.span)`
  display: inline-block;
  transform-origin: center;
`

Shake.displayName = 'Shake'

export default Shake
