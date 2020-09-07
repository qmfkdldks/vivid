import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { times } from "lodash";
import PropTypes from "prop-types";
/*import './kung.css';*/

const variants = {
  visible: {
    opacity: [0, 1],
    top: [-50, 0],
    transition: {
      ease: "easeIn",
      duration: 1,
      type: "spring",
      damping: 12,
      mass: 1,
      stiffness: 350,
      loop: Infinity,
      repeatDelay: 3
    }
  },
  hidden: { opacity: 1 }
};

const moveLeft = {
  //   x: [0, -3, -5, -5, -8, -10],
  transition: {
    // ease: [0.28, 0.84, 0.42, 1],
    // times: [0.1, 0.3, 0.5, 0.57, 0.64, 1],
    ease: [0.84, 0.84, 0.42, 1],
    duration: 1,
    repeatDelay: 1,
    loop: Infinity
  }
};

const jump = (seed = 0) => {
  return [0, 0, -30, 0, -5, 0, 0];
};

const jumpWidth = (seeed) => [1.2, 0.8, 1.05, 1, 1, 1];
const jumpHeight = (seeed) => [0.7, 1.2, 0.95, 1, 1, 1];

const goLeft = (seed = 0) => {
  return [
    seed + -15,
    seed + -15,
    seed + -15,
    seed + -25,
    seed + -25,
    seed + -25
  ];
};

const recursive = (animation, seed = 0, times = 15) => {
  if (times === 0) return [];

  const values = animation(seed);
  return [
    ...values,
    ...recursive(animation, values[values.length - 1], times - 1)
  ];
};

const zeros = (seed = 0) => {
  return Array(6).fill(seed);
};

const sneak = {
  paddingLeft: [...recursive(zeros, 42, 7)],
  rotate: [...recursive(zeros, 0, 4), 10, 0, 0],
  scaleX: [
    ...recursive(zeros, 1, 2),
    ...recursive(jumpWidth, 0, 2),
    ...recursive(zeros, 1, 3)
  ],
  scaleY: [
    ...recursive(zeros, 1, 2),
    ...recursive(jumpHeight, 0, 2),
    ...recursive(zeros, 1, 3)
  ],
  y: [
    ...recursive(zeros, 0, 2),
    ...recursive(jump, 0, 2),
    ...recursive(zeros, 0, 3)
  ],
  x: [
    ...recursive(zeros, 0, 2),
    ...recursive(goLeft, 0, 2),
    ...recursive(zeros, -25 * 2, 2),
    -25 * 2 - 10
  ],
  transition: {
    // ease: [0.28, 0.84, 0.42, 1],
    //times: [0.1, 0.3, 0.5, 0.57, 0.64, 1, ...time_frames],
    loop: Infinity,
    repeatDelay: 3,
    duration: 3
  }
};
 
const Sneak = ({ meta = {}, selectVariant, label }) => {
  return (
    <Container  className={''}  >
      
      <Word animate={sneak}>{(label.length) ? label.charAt(0) : ''} </Word>
      <span>{(label.length) ? label.substring(1,label.length) : ''}</span>
    </Container>
  );
};

const Container = styled(motion.span)`
  display: inline-flex;
  overflow-x: hidden;
  padding: 0; 
  font-size:40px;
  color:green;
`;

const Word = styled(motion.div)`
  display: inline-block;
  transform-origin: bottom right;
  padding: 0;
 `;

Sneak.propTypes = {
  label: PropTypes.string.isRequired, 
};
Sneak.displayName = "Sneak";

export default Sneak;
