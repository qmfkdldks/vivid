import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

const variants = {
  visible: {
    scaleX: [1, 2, 1],
    transition: {
      ease: 'easeInOut',
      duration: 0.7,
      type: 'inertia',
      velocity: 50
    }
  },
  hidden: { opacity: 1 }
}

const Chuck = ({ props, children }) => {
  const [ref, inView] = useInView()

  return (
    <Word
      ref={ref}
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      initial={{ scaleX: 1 }}
    >
      {children}
    </Word>
  )
}

const Word = styled(motion.span)`
  display: inline-block;
  font-weight: 600;
  font-size: 30px;
`

Chuck.displayName = 'Chuck'

export default Chuck
