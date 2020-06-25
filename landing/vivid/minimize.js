import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const container = {
  visible: {
    fontSize: '15px',
    transition: {
      duration: 2,
      loop: Infinity,
      repeatDelay: 3
    }
  },
  hidden: {}
}

const Minimize = ({ children }) => {
  const [ref, inView] = useInView()

  return (
    <motion.span
      ref={ref}
      animate={inView ? 'visible' : 'hidden'}
      variants={container}
    >
      {children}
    </motion.span>
  )
}

Minimize.displayName = 'Minimize'

export default Minimize
