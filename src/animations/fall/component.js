import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import PropTypes from "prop-types";

const jump = (seed = 0) => {
  return [0, 0, -15, 0, -5, 0, 0];
};

const jumpWidth = (seeed) => [1.2, 0.8, 1.05, 1, 1, 1];
const jumpHeight = (seeed) => [0.7, 1.2, 0.95, 1, 1, 1];

const recursive = (animation, seed = 0, times = 15) => {
  if (times === 0) return [];

  const values = animation(seed);
  return [
    ...values,
    ...recursive(animation, values[values.length - 1], times - 1),
  ];
};

const zeros = (seed = 0) => {
  return Array(6).fill(seed);
};

const variants = {
  start: {
    opacity: [...recursive(zeros, 0, 2), ...recursive(zeros, 1, 5)],
    scaleX: [
      ...recursive(zeros, 1, 2),
      ...recursive(jumpWidth, 0, 1),
      ...recursive(zeros, 1, 4),
    ],
    scaleY: [
      ...recursive(zeros, 1, 2),
      ...recursive(jumpHeight, 0, 1),
      ...recursive(zeros, 1, 4),
    ],
    y: [
      ...recursive(zeros, -100, 2),
      ...recursive(jump, 0, 1),
      ...recursive(zeros, 0, 4),
    ],
  },
  stop: {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    y: 0,
  },
};

const Fall = ({ control, children, transition, ...props }) => {
  return (
    <Container
      animate={control}
      variants={variants}
      transition={{ duration: 5, ...transition }}
      {...props}
    >
      {children}
    </Container>
  );
};

const Container = styled(motion.div)`
  display: inline-block;
`;

Fall.propTypes = {
  children: PropTypes.string.isRequired,
};

Fall.displayName = "Fall";

export default Fall;
