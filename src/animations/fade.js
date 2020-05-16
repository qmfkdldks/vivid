import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const variants = {
  visible: {
    opacity: 0.3,
    transition: {
      ease: 'backInOut',
      duration: 2
    }
  },
  hidden: { opacity: 1 }
}

const Fade = ({ props, children }) => {
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

export default Fade
