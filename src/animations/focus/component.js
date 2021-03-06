import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const blurVariants = {
  start: {
    filter: [
      `blur(0px)`,
      `blur(3px)`,
      `blur(0px)`,
      `blur(7px)`,
      `blur(0px)`,
      `blur(0px)`,
    ],
  },
  stop: {
    filter: "blur(0px)",
  },
};

const Focus = ({ control, children, transition, ...props }) => {
  return (
    <Container
      {...props}
      animate={control}
      variants={blurVariants}
      transition={{
        duration: 1,
        ease: "easeIn",
        ...transition,
      }}
    >
      {children}
    </Container>
  );
};

const Container = styled(motion.span)``;

Focus.displayName = "Focus";

export default Focus;
