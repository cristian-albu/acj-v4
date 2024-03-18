"use client";
import { useEffect, useState } from "react";

const useDetectClickTarget = () => {
  const [clickedElement, setClickedElement] = useState<HTMLElement | null>(
    null
  );

  const handleIsOnOutSideClick = (event: MouseEvent) => {
    if (event.target && event.target instanceof HTMLElement) {
      setClickedElement(event.target);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleIsOnOutSideClick);

    return () => {
      document.removeEventListener("mousedown", handleIsOnOutSideClick);
    };
  }, []);

  return clickedElement;
};

export default useDetectClickTarget;
