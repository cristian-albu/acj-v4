"use client";
import { MEDIA_QUERIES, PAGE_MAX_WIDTH } from "@/lib/constants";
import React, { FC } from "react";
import styled from "styled-components";

const WrapperElement = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${MEDIA_QUERIES.xl}px) {
    max-width: ${PAGE_MAX_WIDTH.xl}px;
  }
  @media (max-width: ${MEDIA_QUERIES.lg}px) {
    max-width: ${PAGE_MAX_WIDTH.lg}px;
  }
  @media (max-width: ${MEDIA_QUERIES.md}px) {
    max-width: ${PAGE_MAX_WIDTH.md}px;
  }
  @media (max-width: ${MEDIA_QUERIES.sm}px) {
    max-width: ${PAGE_MAX_WIDTH.sm}px;
  }
  @media (max-width: ${MEDIA_QUERIES.lg}px) {
    max-width: ${PAGE_MAX_WIDTH.lg}px;
  }
`;

type T_Wrapper = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Wrapper: FC<T_Wrapper> = ({ children, ...rest }) => {
  return <WrapperElement {...rest}>{children}</WrapperElement>;
};

export default Wrapper;
