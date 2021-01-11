import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import PropTypes from "prop-types";
import { random, map, isEmpty } from "lodash";

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
});

const shake = {
  start: {
    x: [0, 1, -1, 2, -2, 3, -3, 5, -5, 4, -4, 0],
    transition: {
      duration: 0.6,
      ease: [0.55, 0, 1, 0.45],
    },
  },
};

const Levitation = ({ control, children, transition, ...props }) => {
  if (isEmpty(children)) {
    return null;
  }

  return (
    <Container {...props}>
      {map(children, (value) => (
        <Word key={value} animate={control} variants={rotate()}>
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
