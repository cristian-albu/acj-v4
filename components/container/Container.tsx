import React, { FC } from "react";
import styled from "styled-components";

const ContainerElement = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type T_Container = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Container: FC<T_Container> = ({ children, ...rest }) => {
  return <ContainerElement {...rest}>{children}</ContainerElement>;
};

export default Container;
