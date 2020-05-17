import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const container = {
  visible: {
    transition: {
      staggerChildren: 0.5
    }
  },
  hidden: {}
}

const items = {
  visible: {
    transition: {
      ease: 'easeOut',
      repeatDelay: 10,
      yoyo: Infinity
    },
    color: ['rgb(0, 0, 0)', 'rgb(255,127,80)', 'rgb(0,0,0)'],
    position: 'relative',
    top: ['0px', '-2px', '0px']
  },
  hidden: {
    color: 'rgb(220, 220, 220)'
  }
}

const Gradient = ({ color, children, vairant }) => {
  const [ref, inView] = useInView()

  const letters = [...children].map((l, i) => (
    <motion.span key={i} variants={items}>
      {l}
    </motion.span>
  ))

  const currentVariant = vairant || (inView ? 'visible' : 'hidden')
  return (
    <span data-slate-string='true'>
      <motion.span ref={ref} animate={currentVariant} variants={container}>
        {letters}
      </motion.span>
    </span>
  )
}

export default Gradient
