import React from "react";
import { motion } from "framer-motion";

const variants = {
  start: {
    opacity: [0, 1],
    top: 0,
  },
};

const Fall = ({ control, children, transition, ...props }) => {
  return (
    <motion.span
      animate={control}
      variants={variants}
      transition={{
        ease: "easeIn",
        duration: 0.1,
        type: "spring",
        damping: 12,
        mass: 1,
        stiffness: 350,
        ...transition,
      }}
      initial={{ top: "-50%" }}
      {...props}
    >
      {children}
    </motion.span>
  );
};

Fall.propTypes = {
  children: PropTypes.string.isRequired,
};

Fall.displayName = "Fall";

export default Fall;
