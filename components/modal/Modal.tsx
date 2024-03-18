"use client";
import React, { FC, useEffect, useId, useRef, useState } from "react";
import { Button } from "..";
import { T_Children } from "@/lib/types";
import Popup from "./Popup";
import Menu from "./Menu";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Modal: FC<T_Modal> = ({
  children,
  contents,
  contentsTitle,
  onClose,
  modalType,
  modalTargetOffset,
}) => {
  const modalId = useId();
  const targetRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldFadeOut, setFadeOut] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Store the timeout id in a ref to clear it on unmount

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  const topOffset = targetRef.current?.offsetTop
    ? targetRef.current.offsetTop + targetRef.current.offsetHeight
    : 0;

  const leftOffset = targetRef.current?.offsetLeft
    ? modalTargetOffset
      ? targetRef.current?.offsetLeft -
        modalTargetOffset +
        targetRef.current.offsetWidth
      : targetRef.current?.offsetLeft
    : 0;

  const modalData: T_ModalPortalData = {
    modalId,
    contentsTitle,
    isOpen,

    shouldFadeOut: shouldFadeOut,
    targetPosition: {
      top: topOffset,
      left: leftOffset,
    },
    close: () => {
      onClose && onClose();
      setFadeOut(true);
      // Set a timeout to close the modal after the fade out animation
      timeoutIdRef.current = setTimeout(() => {
        setIsOpen(false);
        targetRef.current?.focus();
      }, 200);
    },
    open: () => {
      setFadeOut(false);
      setIsOpen(true);
    },
  };

  return (
    <>
      <ModalButton
        aria-haspopup="dialog"
        aria-controls={modalId}
        aria-expanded={isOpen}
        aria-label={`Open ${contentsTitle} Modal`}
        ref={targetRef}
        onClick={modalData.isOpen ? modalData.close : modalData.open}
      >
        {children}
      </ModalButton>

      {isOpen &&
        document &&
        (modalType === "menu"
          ? createPortal(<Menu {...modalData}>{contents}</Menu>, document.body)
          : modalType === "popup"
          ? createPortal(
              <Popup {...modalData}>{contents}</Popup>,
              document.body
            )
          : null)}
    </>
  );
};

export default Modal;

const ModalButton = styled.button`
  border: none;
  background-color: transparent;
  color: inherit;
  &:hover {
    background-color: transparent;
  }
`;

export type T_Modal = {
  contentsTitle: string;
  contents: React.ReactNode;
  onClose?: () => void;
  modalType: "menu" | "popup";
  modalTargetOffset?: number;
} & T_Children;

export type T_ModalPortalData = {
  modalId: string;
  contentsTitle: string;
  isOpen: boolean;
  shouldFadeOut?: boolean;
  targetPosition: { top: number; left: number };
  close: () => void;
  open: () => void;
};
