import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import PropTypes from "prop-types";

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const rotate = () => {
  return {
    start: {
      marginRight: 5,
      rotate: [0, random(-15, 15)],
      transition: {
        duration: 2,
        delay: 3,
        ease: [0.45, 0, 0.55, 1],
      },
    },
    stop: {
      marginRight: 0,
      rotate: 0,
    },
  };
};

const up = () => ({
  start: {
    top: random(-10, -20),
    transition: {
      delay: 3,
      type: "spring",
      damping: 0.4,
      stiffness: 2.1,
      ease: [0.61, 1, 0.88, 1],
    },
  },
  stop: {
    top: 0,
  },
});

const shake = {
  start: {
    x: [0, 1, -1, 2, -2, 3, -3, 5, -5, 4, -4, 0],
    transition: {
      duration: 0.6,
      ease: [0.55, 0, 1, 0.45],
    },
  },
  stop: {
    x: 0,
  },
};

const Levitation = ({ control, children, transition, ...props }) => {
  let charecters = [];

  if (typeof children === "string" || children instanceof String) {
    charecters = children.split("");
  } else {
    let splitted = children.props.leaf.text.split("");

    charecters = splitted.map((value) => {
      return React.cloneElement(children, {
        leaf: {
          ...children.props.leaf,
          text: value,
        },
      });
    });
  }

  return (
    <Container {...props}>
      {Array.from(charecters).map((value, index) => (
        <Word animate={control} variants={rotate()}>
          <Word animate={control} variants={up()}>
            <Word animate={control} variants={shake}>
              {value}
            </Word>
          </Word>
        </Word>
      ))}
    </Container>
  );
};

const Container = styled.span`
  padding-top: 50px;
`;

export const Word = styled(motion.div)`
  position: relative;
  display: inline-block;
  transform-origin: center;
`;

Levitation.propTypes = {
  children: PropTypes.string.isRequired,
};

Levitation.displayName = "Levitation";

export default Levitation;
