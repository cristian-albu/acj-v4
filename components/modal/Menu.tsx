"use client";
import { T_Children } from "@/lib/types";
import React, { FC, useEffect, useRef } from "react";
import { T_ModalPortalData } from "./Modal";
import styled from "styled-components";
import { FADE_IN } from "@/lib/constants";
import useDetectClickTarget from "@/lib/useDetectOutsideClick";
import { usePathname } from "next/navigation";
import { getFirstFocusableElement, getLastFocusableElement } from "@/lib/utils";

const Menu: FC<T_Children & T_ModalPortalData> = ({
  children,
  close,
  modalId,
  contentsTitle,
  shouldFadeOut,
  targetPosition,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const clickTarget = useDetectClickTarget();
  const path = usePathname();

  useEffect(() => {
    if (ref.current) {
      getFirstFocusableElement(ref.current)?.focus();
    }
  }, []);

  useEffect(() => {
    if (clickTarget && ref.current && !ref.current.contains(clickTarget)) {
      close();
    }
  }, [clickTarget, path]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
    }

    if (e.key === "Tab") {
      const firstFocusableElement = getFirstFocusableElement(ref.current);
      const lastFocusableElement = getLastFocusableElement(ref.current);

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement?.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement?.focus();
        }
      }
    }
  };

  return (
    <MenuElement
      id={modalId}
      role="dialog"
      aria-modal={true}
      aria-label={contentsTitle}
      ref={ref}
      $left={targetPosition.left}
      $top={targetPosition.top}
      $shouldFadeOut={shouldFadeOut || false}
      onKeyDown={handleKeyDown}
    >
      {children}
    </MenuElement>
  );
};

export default Menu;

const MenuElement = styled.div<{
  $left: number;
  $top: number;
  $shouldFadeOut: boolean;
}>`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  z-index: 100;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  opacity: ${({ $shouldFadeOut }) => ($shouldFadeOut ? 0 : 1)};
  transition: opacity 0.2s ease-in-out;
  animation: ${FADE_IN} 0.2s ease-in-out;
`;
