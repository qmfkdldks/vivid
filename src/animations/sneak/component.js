import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import PropTypes from "prop-types";

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
    seed + -25,
  ];
};

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
    opacity: [...recursive(zeros, 1, 6), 0],
    rotate: [...recursive(zeros, 0, 4), 10, 0, 0],
    scaleX: [
      ...recursive(zeros, 1, 2),
      ...recursive(jumpWidth, 0, 2),
      ...recursive(zeros, 1, 3),
    ],
    scaleY: [
      ...recursive(zeros, 1, 2),
      ...recursive(jumpHeight, 0, 2),
      ...recursive(zeros, 1, 3),
    ],
    y: [
      ...recursive(zeros, 0, 2),
      ...recursive(jump, 0, 2),
      ...recursive(zeros, 0, 3),
    ],
    x: [
      ...recursive(zeros, 0, 2),
      ...recursive(goLeft, 0, 2),
      ...recursive(zeros, -25 * 2, 2),
      -25 * 2 - 10,
    ],
  },
  stop: {
    opacity: 1,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    y: 0,
    x: 0,
  },
};

// Example of individual character animation
// Checkout next link
// https://github.com/ianstormtaylor/slate/blob/228f4fa94f61f42ca41feae2b3029ebb570e0480/packages/slate-react/src/components/string.tsx

const Sneak = ({ control, children, transition, ...props }) => {
  let firstCharecter;
  let restCharacters;

  if (typeof children === "string") {
    firstCharecter = children.length ? children.charAt(0) : "";

    restCharacters = children.length
      ? children.substring(1, children.length)
      : "";
  } else {
    firstCharecter = React.cloneElement(children, {
      leaf: {
        ...children.props.leaf,
        text: children.props.leaf.text.substring(0, 1),
      },
    });

    restCharacters = React.cloneElement(children, {
      leaf: {
        ...children.props.leaf,
        text: children.props.leaf.text.substring(
          1,
          children.props.leaf.text.length
        ),
      },
    });
  }

  return (
    <Container {...props}>
      <Word
        animate={control}
        variants={variants}
        transition={{ duration: 3, ...transition }}
      >
        {firstCharecter}
      </Word>
      <span>{restCharacters}</span>
    </Container>
  );
};

const Container = styled.span`
  display: inline-flex;
  overflow-x: hidden;
  padding: 0;
`;

const Word = styled(motion.span)`
  display: inline-block;
  transform-origin: bottom right;
  padding: 0;
  padding-left: 50px;
`;

Sneak.displayName = "Sneak";

export default Sneak;
