import React from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

export const MODES = {
  REPEAT: "REPEAT",
  INVIEW: "INVIEW",
  HOVER: "HOVER",
  HOLD: "HOLD",
};

/**
 * Functional Component
 * returns a animation component to repeat animation infinietly
 *
 * @param  {animation component} AnimationComponent
 *
 * @return animation component
 *
 * @test
 * it should pass transition with loop: Infinity
 */
export const Repeat = (
  AnimationComponent,
  props,
  animationControls,
  inViewProps
) => {
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

/**
 * Functional Component
 * returns a animation component within span element that trigger animation when the span is visible on screen.
 *
 * @param  {animation component} AnimationComponent
 *
 * @return animation component
 *
 * @test
 * it should pass "start" value to control props when inView is true otherwise should pass "stop"
 */
const InView = (AnimationComponent, props, animationControls, inViewProps) => {
  const { ref, inView } = inViewProps;

  return (
    <span ref={ref}>
      <AnimationComponent control={inView ? "start" : "stop"} {...props} />
    </span>
  );
};

/**
 * Functional Component
 * returns a animation component within span element that trigger animation on hover.
 *
 * @param  {animation component} AnimationComponent
 *
 * @return animation component
 *
 * @test
 * it should call animationControls start function onMouseEnter
 * it should pass control props to the animation component.
 */
const Hover = (AnimationComponent, props, animationControls, inViewProps) => {
  return (
    <span
      onMouseEnter={() => {
        animationControls.set("stop");
        animationControls.start("start");
      }}
    >
      <AnimationComponent control={animationControls} {...props} />
    </span>
  );
};

/**
 * Functional Component
 * returns a animation component within span element that trigger animation on hold only.
 *
 * @param  {animation component} AnimationComponent
 *
 * @return animation component
 *
 * @test
 * it should call animationControls start function onMouseEnter
 * it should call animationControls set stop onMouseLeave
 * it should reset animation when mouse leaves
 */
const Hold = (AnimationComponent, props, animationControls, inViewProps) => {
  return (
    <span
      onMouseEnter={() => {
        animationControls.set("stop");
        animationControls.start("start");
      }}
      onMouseLeave={() => {
        animationControls.stop();
        animationControls.set("stop");
      }}
    >
      <AnimationComponent control={animationControls} {...props} />
    </span>
  );
};

/**
 * HOC Component
 * returns a animation component which accepts additional mode props.
 * newly created animation component runs animation given mode
 * mode ex) REPEAT, INVIEW, HOVER, HOLD
 *
 * @param  {animation component which will accepts mode props} AnimationComponent
 *
 * @return animation component
 *
 * @test
 * it should return a component
 * returned component should accept mode props
 * givem mode it should call corresponding function
 * when mode does not match it should not call any function listed
 */
const withMode = (AnimationComponent) => {
  const conditionalComponent = ({ mode, ...props }) => {
    const inViewProps = useInView({
      threshold: 0,
    });

    const animationControls = useAnimation();

    switch (mode) {
      case MODES.REPEAT:
        return Repeat(
          AnimationComponent,
          props,
          animationControls,
          inViewProps
        );
      case MODES.INVIEW:
        return InView(
          AnimationComponent,
          props,
          animationControls,
          inViewProps
        );
      case MODES.HOVER:
        return Hover(AnimationComponent, props, animationControls, inViewProps);
      case MODES.HOLD:
        return Hold(AnimationComponent, props, animationControls, inViewProps);
      default:
        return <AnimationComponent {...props} />;
    }
  };

  conditionalComponent.displayName = "conditionalComponent";

  return conditionalComponent;
};

withMode.displayName = "withMode";

export default withMode;
