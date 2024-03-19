"use client";
import React, { FC } from "react";
import styled from "styled-components";

const TitleElement = styled.p<{ $center?: boolean }>`
  display: flex;
  justify-content: ${({ $center }) => ($center ? "center" : "flex-start")};
  align-items: center;
  margin-right: auto;
`;

type T_Title = {
  children: React.ReactNode;
  center?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Title: FC<T_Title> = ({ children, center, ...rest }) => {
  return (
    <TitleElement $center={center} {...rest}>
      {children}
    </TitleElement>
  );
};

export default Title;
