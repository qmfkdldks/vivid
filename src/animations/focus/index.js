import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import PropTypes from "prop-types";

const outerMask = {
  start: {
    x: [0, 129],
    transition: {
      loop: Infinity,
    },
  },
};

const innerMask = {
  start: {
    x: [0, -129],
    transition: {
      loop: Infinity,
    },
  },
};

const Focus = ({ children }) => {
  return (
    <Container>
      <OutterMask animate="start" variants={outerMask}>
        <InnerMask animate="start" variants={innerMask}>
          Focus
        </InnerMask>
      </OutterMask>
    </Container>
  );
};

const Container = styled(motion.div)`
  font-size: 3rem;
  letter-spacing: 0.2rem;
  position: relative;
  width: 179px;

  &:before {
    content: "Focus";
    filter: blur(3px);
  }

  &:after {
    content: "";
    position: absolute;
    width: 50px;
    left: 0;
  }
`;

const OutterMask = styled(motion.div)`
  overflow: hidden;
  position: absolute;
  width: 50px;
  height: 100%;
  top: 0;
  left: 0;
`;

const InnerMask = styled(motion.div)``;

Focus.propTypes = {
  children: PropTypes.string.isRequired,
};

Focus.displayName = "Focus";

export default Focus;
