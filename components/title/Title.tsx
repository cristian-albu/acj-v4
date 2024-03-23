"use client";
import React, { FC, createElement } from "react";
import styled from "styled-components";

type T_HType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

type T_Title = {
  children: React.ReactNode;
  center?: boolean;
  headingType?: T_HType;
  headingSize?: number;
} & React.HTMLAttributes<HTMLDivElement>;

const Title: FC<T_Title> = ({
  children,
  center,
  headingType,
  headingSize,
  ...rest
}) => {
  const TextElement = () => createElement(headingType || "p", {}, children);
  return (
    <TitleElement $center={center} $headingSize={headingSize || 1} {...rest}>
      <TextElement />
    </TitleElement>
  );
};

export default Title;

const TitleElement = styled.div<{ $center?: boolean; $headingSize?: number }>`
  display: flex;
  justify-content: ${({ $center }) => ($center ? "center" : "flex-start")};
  align-items: center;
  margin-right: auto;
  font-size: ${({ $headingSize }) => $headingSize}rem;
`;
