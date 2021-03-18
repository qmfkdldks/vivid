import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

//
// CONSTANTS
//
const DEFAULT_THICKNESS = 5;
const DEFAULT_COLORS = [
  "#15007F",
  "#FD138A",
  "#FFBA00",
  "#F40000",
  "#28D58F",
  "#15007F",
  "#FD138A",
  "#FFBA00",
  "#F40000",
  "#28D58F"
];
const DEFAULT_SHUFFLED_COLORS = shuffleColors(DEFAULT_COLORS);

/**
 * Returns the shadow layers for a single frame
 * @param {number} colorThickness
 * @param {string[]} colors
 * @returns {string}
 */
function createShadowLayers(colorThickness, colors) {

  const layers = [];

  for (let i = 1; i <= colors.length; i++) {
    for (let j = 0; j <= colorThickness; j++) {
      const offset = (i - 1) * colorThickness + j;
      const layer = `${offset}px ${offset}px ${colors[i - 1]}`;

      layers.push(layer);
    }
  }

  return layers.join(", ");
}

/**
 * @param {number} colorThickness
 * @param {string[]} colors
 * @returns {string[]} Values of textShadow for each frame
 */
function generateLightAnimation() {
  
  return DEFAULT_SHUFFLED_COLORS.map((color) => {
    console.log("------------");
    console.log("Creating layer for color", color);
    return createShadowLayers(DEFAULT_THICKNESS, color);
  });
}

/**
 * @param {string[]} colors
 * @return {string[][]}
 */
function shuffleColors(colors) {
  return colors.reduce((partial, currentColor, idx) => {
    if (idx === 0) {
      partial.push(colors);
      return partial;

    }

    const shuffledVariation = [
      ...colors.slice(-idx),
      ...colors.slice(0, colors.length - idx)
    ];

    partial.push(shuffledVariation);
    return partial;

  }, []);

}


const lightAnimation = generateLightAnimation();
console.log("Animation frames", lightAnimation);



const Light = ({ control, children, transition, ...props }) => {
    return (
      <Container
      animate={{
        textShadow: lightAnimation
      }}
      transition={{
        /* type: "spring",
        damping: 5,
        stiffness: 100,
        flip: Infinity */
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        flip: Infinity
        //ease: "linear"
        //restSpeed: 3
        //ease: "anticipate"
        //repeatDelay: 3
      }}
      >
        {children}
      </Container>
    );
  };

  const Container = styled(motion.span)``;

  export default Light;