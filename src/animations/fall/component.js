import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import PropTypes from "prop-types";

const variants = {
  start: {
    y: [-50, 0],
  },
};

const Fall = ({ control, children, transition, ...props }) => {
  return (
    <Container
      animate={control}
      variants={variants}
      transition={{
        type: "spring",
        damping: 300,
        // ...transition,
      }}
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
