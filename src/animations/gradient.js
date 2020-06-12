import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const container = {
  visible: {
    transition: {
      staggerChildren: 0.3
    }
  },
  hidden: {}
}

const items = {
  visible: {
    transition: {
      repeatDelay: 10,
      loop: Infinity
    },
    color: ['rgb(0, 0, 0)', 'rgb(255,127,80)', 'rgb(0,0,0)'],
    'font-weight': ['400', '600', '400'],
    position: 'relative',
    top: ['0px', '-5px', '0px']
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

Gradient.displayName = 'Gradient'

export default Gradient
