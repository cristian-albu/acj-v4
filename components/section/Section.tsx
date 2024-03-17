"use client";
import React, { FC } from "react";
import styled from "styled-components";

const SectionElement = styled.section<{ $bg?: T_Bg }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: ${({ $bg }) => ($bg === "dark" ? "#000" : "#fff")};
  color: ${({ $bg }) => ($bg === "dark" ? "#fff" : "#000")};
`;

type T_Bg = "dark" | "light";

type T_Section = {
  bg?: T_Bg;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Section: FC<T_Section> = ({ children, bg, ...rest }) => {
  return (
    <SectionElement $bg={bg} {...rest}>
      {children}
    </SectionElement>
  );
};

export default Section;
