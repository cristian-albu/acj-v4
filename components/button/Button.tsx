"use client";
import { T_Children } from "@/lib/types";
import React, { ButtonHTMLAttributes, forwardRef, Ref } from "react";
import styled from "styled-components";

const ButtonElement = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.2rem;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #595959;
  }
`;

type T_Button = T_Children & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, T_Button>(
  ({ children, ...rest }, ref: Ref<HTMLButtonElement>) => {
    return (
      <ButtonElement ref={ref} {...rest}>
        {children}
      </ButtonElement>
    );
  }
);

export default Button;
