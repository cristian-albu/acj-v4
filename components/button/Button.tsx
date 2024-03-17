"use client";
import React, { FC } from "react";
import styled from "styled-components";

const ButtonElement = styled.button``;

type T_Button = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<T_Button> = ({ children, ...rest }) => {
  return <ButtonElement {...rest}>{children}</ButtonElement>;
};

export default Button;
