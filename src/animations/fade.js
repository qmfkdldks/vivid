import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const variants = {
  visible: {
    opacity: [1, 0, 1],
    'font-weight': ['400', '600', '400'],
    position: 'relative',
    top: ['0px', '-20px', '0px'],
    transition: {
      duration: 2,
      ease: 'backInOut',
      loop: Infinity,
      repeatDelay: 5
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
