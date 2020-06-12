import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

const variants = {
  visible: {
    x: 0,
    y: ['-50%', '0%'],
    transition: {
      ease: 'circOut',
      duration: 0.3,
      type: 'spring',
      mass: 0.5,
      damping: 50
    }
  },
  hidden: { opacity: 1 }
}

const Tuck = ({ props, children }) => {
  const [ref, inView] = useInView()

  return (
    <Word
      ref={ref}
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      initial={{ x: '-100%', y: '-30%' }}
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

Tuck.displayName = 'Tuck'

export default Tuck
