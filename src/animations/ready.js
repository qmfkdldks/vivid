import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { merge } from 'lodash'

const containerSchema = {
  type: 'object',
  title: 'Container',
  properties: {
    visible: {
      type: 'object',
      properties: {
        opacity: { type: 'number', default: 1 },
        fontSize: {
          type: 'array',
          items: { type: 'string' },
          default: ['0px', '55px']
        },
        transition: {
          type: 'object',
          properties: {
            ease: { type: 'string', default: 'backInOut' },
            duration: { type: 'number', default: 1 }
          }
        }
      }
    },
    hidden: { type: 'object', title: 'hidden', properties: {} }
  }
}

const container = {
  visible: {
    opacity: 1,
    fontSize: ['0px', '55px'],
    transition: {
      ease: 'backInOut',
      duration: 1
    }
  },
  hidden: { opacity: 0 }
}

export const schemas = {
  containerVariants: containerSchema
}

const Ready = ({ props, containerVariants, children }) => {
  const [ref, inView] = useInView()
  const mContainerVariants = merge(container, containerVariants)

  return (
    <motion.span
      ref={ref}
      animate={inView ? 'visible' : 'hidden'}
      variants={mContainerVariants}
    >
      {children}
    </motion.span>
  )
}

export default Ready
