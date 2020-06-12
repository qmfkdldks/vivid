import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const variants = {
  visible: {
    opacity: [0, 1],
    top: 0,
    transition: {
      ease: 'easeIn',
      duration: 0.1,
      type: 'spring',
      damping: 12,
      mass: 1,
      stiffness: 350
    }
  },
  hidden: { opacity: 1 }
}

const Kung = ({ meta = {}, selectVariant, children }) => {
  return (
    <Word
      animate={selectVariant && selectVariant(meta)}
      variants={variants}
      initial={{ top: '-50%' }}
    >
      {children}
    </Word>
  )
}

const Word = styled(motion.span)`
  position: relative;
  font-weight: 600;
  font-size: 30px;
`

Kung.displayName = 'Kung'

export default Kung
