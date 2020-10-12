import React from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

export const MODES = {
  REPEAT: "REPEAT",
  INVIEW: "INVIEW",
  HOVER: "HOVER",
};

export const Repeat = (AnimationComponent, props) => {
  return (
    <AnimationComponent
      control="start"
      transition={{
        loop: Infinity,
        repeatDelay: 3,
      }}
      {...props}
    />
  );
};

const InView = (AnimationComponent, props) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <span ref={ref}>
      <AnimationComponent control={inView ? "start" : "stop"} {...props} />
    </span>
  );
};

const Hover = (AnimationComponent, props) => {
  const animationControls = useAnimation();

  return (
    <span onMouseEnter={() => animationControls.start("start")}>
      <AnimationComponent control={animationControls} {...props} />
    </span>
  );
};

const withMode = (AnimationComponent) => {
  const conditionalComponent = ({ mode, ...props }) => {
    switch (mode) {
      case MODES.REPEAT:
        return Repeat(AnimationComponent, props);
      case MODES.INVIEW:
        return InView(AnimationComponent, props);
      case MODES.HOVER:
        return Hover(AnimationComponent, props);
    }
  };

  conditionalComponent.displayName = "conditionalComponent";

  return conditionalComponent;
};

withMode.displayName = "withMode";

export default withMode;
