"use client";
import React, { FC, useEffect, useId, useRef, useState } from "react";
import { Button } from "..";
import { T_Children } from "@/lib/types";
import ModalPortal from "./ModalPortal";

const Modal: FC<T_Modal> = ({ children, contents, contentsTitle, onClose }) => {
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

  const modalData: T_ModalPortalData = {
    modalId,
    contentsTitle,
    isOpen,
    shouldFadeOut: shouldFadeOut,
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
      <Button
        aria-haspopup="dialog"
        aria-controls={modalId}
        aria-expanded={isOpen}
        aria-label={`Open ${contentsTitle} Modal`}
        ref={targetRef}
        onClick={modalData.isOpen ? modalData.close : modalData.open}
      >
        {children}
      </Button>
      {isOpen && <ModalPortal {...modalData}>{contents}</ModalPortal>}
    </>
  );
};

export default Modal;

export type T_Modal = {
  contentsTitle: string;
  contents: React.ReactNode;
  onClose?: () => void;
} & T_Children;

export type T_ModalPortalData = {
  modalId: string;
  contentsTitle: string;
  isOpen: boolean;
  shouldFadeOut?: boolean;
  close: () => void;
  open: () => void;
};
