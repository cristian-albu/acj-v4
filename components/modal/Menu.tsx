"use client";
import { T_Children } from "@/lib/types";
import React, { FC, useEffect, useRef } from "react";
import { T_ModalPortalData } from "./Modal";
import styled from "styled-components";
import { FADE_IN } from "@/lib/constants";
import useDetectClickTarget from "@/lib/useDetectOutsideClick";
import { usePathname } from "next/navigation";

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

  console.log(targetPosition);

  useEffect(() => {
    if (clickTarget && ref.current && !ref.current.contains(clickTarget)) {
      close();
    }
  }, [clickTarget, path]);

  return (
    <MenuElement
      id={modalId}
      role="dialog"
      aria-modal={true}
      aria-label={contentsTitle}
      ref={ref}
      $shouldFadeOut={shouldFadeOut || false}
    >
      {children}
    </MenuElement>
  );
};

export default Menu;

const MenuElement = styled.div<{
  $shouldFadeOut: boolean;
}>`
  position: absolute;
  z-index: 100;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  opacity: ${({ $shouldFadeOut }) => ($shouldFadeOut ? 0 : 1)};
  transition: opacity 0.2s ease-in-out;
  animation: ${FADE_IN} 0.2s ease-in-out;
`;
