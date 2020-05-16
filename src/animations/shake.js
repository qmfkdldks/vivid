import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const variants = {
  visible: {
    transform: 'rotate(45deg)',
    transition: {
      type: 'spring',
      damping: 0.5,
      duration: 2
    }
  },
  hidden: {}
}

const Shake = ({ props, children }) => {
  const [ref, inView] = useInView()

  return (
    <motion.span
      ref={ref}
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.span>
  )
}

export default Shake
