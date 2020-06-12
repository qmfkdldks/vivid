import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'

const variants = {
  visible: {
    opacity: [0, 1],
    top: ['-100px', '0px'],
    transition: {
      ease: 'easeIn',
      duration: 1,
      type: 'spring',
      damping: 12,
      mass: 1,
      stiffness: 350,
      loop: Infinity,
      repeatDelay: 3
    }
  }
}

const Kung = ({ children }) => {
  const [ref, inView] = useInView()

  return (
    <Word
      ref={ref}
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </Word>
  )
}

const Word = styled(motion.span)`
  position: relative;
  font-weight: 600;
  font-size: 100px;
`
Kung.displayName = 'Kung'

export default Kung
