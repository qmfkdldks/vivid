import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

const variants = {
  visible: {
    scale: 1,
    'text-shadow': ['-1px 10px 1px #B5B5B5', '0px 0px 0px #B5B5B5'],
    transition: {
      duration: 0.7,
      type: 'spring',
      damping: 10
    }
  },
  hidden: { opacity: 1 }
}

const Dung = ({ props, children }) => {
  const [ref, inView] = useInView()

  return (
    <Word
      ref={ref}
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      initial={{ scale: 2 }}
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

Dung.displayName = 'Dung'

export default Dung
