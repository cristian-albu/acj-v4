import { keyframes } from "styled-components";

export const MEDIA_QUERIES = {
  sm: 640,
  md: 768,
  lg: 1280,
  xl: 1600,
};

export const PAGE_MAX_WIDTH = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export const COLORS = {
  primary: "#0070f3",
  secondary: "#ff0080",
  accent: "#79ffe1",
  background: "#f0f0f0",
  text: "#333",
};

export const FADE_IN = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }`;

export const SCALE_UP = keyframes`
    from {
        transform: scale(0);
        transform: translateY(4rem)
    }
    to {
        transform: scale(1);
        transform: translateY(0px)
    }`;
