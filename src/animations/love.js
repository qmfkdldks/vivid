import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart } from '@styled-icons/boxicons-solid'
import styled from 'styled-components'
import { times, random } from 'lodash'

const container = {
  visible: {
    transition: {}
  },
  hidden: {}
}

const items = {
  visible: (i) => ({
    transition: {
      repeatDelay: 1,
      loop: Infinity,
      ease: 'easeIn'
    },
    opacity: [0, 1, 0],
    position: 'relative',
    color: '#ef476f',
    top: [`-${random(10, 0)}px`, `${random(5, -20)}px`]
  }),
  hidden: {}
}

const Love = ({ props, children }) => {
  const [ref, inView] = useInView()
  const currentVariant = inView ? 'visible' : 'hidden'

  const hearts = times(5, (l, i) => (
    <motion.span key={i} variants={items} custom={i}>
      <Icon width={10} />
    </motion.span>
  ))

  return (
    <span style={{ position: 'relative' }}>
      <motion.span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          textAlign: 'center'
        }}
        ref={ref}
        animate={currentVariant}
        variants={container}
      >
        {hearts}
      </motion.span>
      {children}
    </span>
  )
}

Love.displayName = 'Love'

export default Love

const Icon = styled(Heart)`
  color: 'red';
`
