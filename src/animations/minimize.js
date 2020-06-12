import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const container = {
  visible: {
    fontSize: ['15px', '50%', '15px'],
    transition: {
      ease: 'backInOut',
      duration: 1,
      loop: Infinity,
      delay: 2
    }
  },
  hidden: {}
}

const Minimize = ({ props, children }) => {
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
