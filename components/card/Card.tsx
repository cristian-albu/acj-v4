import React, { FC } from "react";
import styled from "styled-components";

const CardElement = styled.div``;

type T_Card = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Card: FC<T_Card> = ({ children, ...rest }) => {
  return <CardElement {...rest}>{children}</CardElement>;
};

export default Card;
