import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const container = {
  visible: {
    opacity: 1,
    fontSize: ['0px', '55px'],
    transition: {
      ease: 'backInOut',
      duration: 1,
      loop: Infinity,
      delay: 2
    }
  },
  hidden: { opacity: 0 }
}

const Ready = ({ props, children }) => {
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

export default Ready
