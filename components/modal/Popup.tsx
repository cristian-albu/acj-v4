import { T_Children } from "@/lib/types";
import { FC, KeyboardEvent, useEffect, useRef } from "react";
import styled from "styled-components";
import { T_ModalPortalData } from "./Modal";
import { FADE_IN, MEDIA_QUERIES, SCALE_UP } from "@/lib/constants";
import { getFirstFocusableElement } from "@/lib/utils";

const Popup: FC<T_Children & T_ModalPortalData> = ({
  children,
  isOpen,
  close,
  modalId,
  contentsTitle,
  shouldFadeOut,
}) => {
  const modalWindowRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const focusFirstElement = () => {
    getFirstFocusableElement(modalWindowRef.current)?.focus();
  };

  useEffect(() => {
    if (isOpen) {
      focusFirstElement();
    }
  }, [isOpen]);

  const handleFocusTrap = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
    if (e.key === "Tab") {
      const active = document.activeElement;
      const firstFocusableElement = getFirstFocusableElement(
        modalWindowRef.current
      );

      if (active === closeBtnRef.current) {
        e.preventDefault();
        firstFocusableElement?.focus();
      }

      if (e.shiftKey && active === firstFocusableElement) {
        e.preventDefault();
        closeBtnRef.current && closeBtnRef.current.focus();
      }
    }
  };
  return (
    <ContentsBackground
      id={modalId}
      role="dialog"
      aria-modal={true}
      aria-label={contentsTitle}
      onKeyDown={handleFocusTrap}
      ref={modalWindowRef}
      $shouldFadeOut={shouldFadeOut || false}
    >
      <BackgroundCloseArea onClick={close} />
      <ContentsContainer onClick={focusFirstElement}>
        {children}
        <ContentsCloseBtn
          ref={closeBtnRef}
          aria-label={`Close ${contentsTitle} Modal`}
          onClick={close}
        >
          ❌
        </ContentsCloseBtn>
      </ContentsContainer>
    </ContentsBackground>
  );
};

export default Popup;

const ContentsBackground = styled.div<{ $shouldFadeOut: boolean }>`
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  opacity: ${({ $shouldFadeOut }) => ($shouldFadeOut ? 0 : 1)};
  transition: opacity 0.2s ease-in-out;
  animation: ${FADE_IN} 0.2s ease-in-out;
  z-index: 9999;
`;

const BackgroundCloseArea = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

const ContentsContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1rem 5rem 0.5rem rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: ${MEDIA_QUERIES.md}px;
  height: 70%;
  overflow: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  z-index: 2;
  animation: ${SCALE_UP} 0.2s ease-in-out;
`;

const ContentsCloseBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: black;
`;
