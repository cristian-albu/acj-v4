"use client";

import { useEffect, useState } from "react";

export const useWindowData = () => {
  const [viewportWidth, setViewportWidth] = useState<null | number>(null);

  const handleResize = () => {
    window && setViewportWidth(window.innerWidth);
  };

  useEffect(() => {
    if (!window) return;
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { viewportWidth };
};

export default useWindowData;
