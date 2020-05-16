import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { merge } from 'lodash'

const containerSchema = {
  type: 'object',
  properties: {
    visible: {
      type: 'object',
      properties: {
        transition: {
          type: 'object',
          properties: {
            staggerChildren: {
              type: 'number',
              default: 0.3,
              minimum: 0,
              maximum: 5
            }
          }
        }
      }
    },
    hidden: { type: 'object', title: 'hidden', properties: {} }
  }
}

const itemsSchema = {
  type: 'object',
  title: 'Items',
  properties: {
    visible: {
      type: 'object',
      properties: {
        color: { type: 'string', default: 'rgb(255,127,80)' }
      }
    },
    hidden: {
      type: 'object',
      title: 'hidden',
      properties: {
        color: { type: 'string', default: 'rgb(220, 220, 220)' }
      }
    }
  }
}

export const schemas = {
  containerVariants: containerSchema,
  itemsVariants: itemsSchema
}

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
    color: 'rgb(255,127,80)'
  },
  hidden: {
    color: 'rgb(220, 220, 220)'
  }
}

const Gradient = ({ containerVariants, itemsVariants, children, vairant }) => {
  const [ref, inView] = useInView()

  const mContainerVariants = merge(container, containerVariants)
  const mItemsVariants = merge(items, itemsVariants)

  const letters = [...children].map((l, i) => (
    <motion.span key={i} variants={mItemsVariants}>
      {l}
    </motion.span>
  ))

  const currentVariant = vairant || (inView ? 'visible' : 'hidden')
  return (
    <span data-slate-string='true'>
      <motion.span
        ref={ref}
        animate={currentVariant}
        variants={mContainerVariants}
      >
        {letters}
      </motion.span>
    </span>
  )
}

export default Gradient
