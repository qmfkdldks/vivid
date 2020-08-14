import React from 'react'
import { motion } from 'framer-motion'

const variants = {
  visible: {
    opacity: [0, 1],
    top: 0,
    transition: {
      ease: 'easeIn',
      duration: 0.1,
      type: 'spring',
      damping: 12,
      mass: 1,
      stiffness: 350
    }
  },
  hidden: { opacity: 1 }
}

const Fall = ({ meta = {}, selectVariant, children }) => {
  return (
    <motion.span
      animate={selectVariant && selectVariant(meta)}
      variants={variants}
      initial={{ top: '-50%' }}
    >
      {children}
    </motion.span>
  )
}

Fall.displayName = 'Fall'

export default Fall
