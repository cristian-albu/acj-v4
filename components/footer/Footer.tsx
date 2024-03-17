import React, { FC } from "react";
import styled from "styled-components";

const FooterElement = styled.div``;

type T_Footer = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Footer: FC<T_Footer> = ({ children, ...rest }) => {
  return <FooterElement {...rest}>{children}</FooterElement>;
};

export default Footer;
