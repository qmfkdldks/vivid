import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const container = {
  visible: {
    'background-image': [
      'linear-gradient(to right, #30CFD0 0%, #330867 100%)',
      'linear-gradient(to right, #330867 0%, #30CFD0 100%)',
      'linear-gradient(to right, #30CFD0 0%, #330867 100%)'
    ],
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    transition: {
      loop: Infinity,
      repeatDelay: 0.1
    }
  },
  hidden: {}
}

const Shine = ({ props, children }) => {
  const [ref, inView] = useInView()

  return (
    <motion.span
      ref={ref}
      animate={inView ? 'visible' : 'hidden'}
      variants={container}
      style={{}}
    >
      {children}
    </motion.span>
  )
}

Shine.displayName = 'Shine'

export default Shine
