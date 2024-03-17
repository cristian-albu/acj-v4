import React, { FC } from "react";
import styled from "styled-components";

export const NavElement = styled.nav``;

type T_Nav = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const Nav: FC<T_Nav> = ({ children, ...rest }) => {
  return <NavElement {...rest}>{children}</NavElement>;
};

export default Nav;
