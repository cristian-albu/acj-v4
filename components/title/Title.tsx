import React, { FC } from "react";
import styled from "styled-components";

const TitleElement = styled.div``;

type T_Title = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Title: FC<T_Title> = ({ children, ...rest }) => {
  return <TitleElement {...rest}>{children}</TitleElement>;
};

export default Title;
