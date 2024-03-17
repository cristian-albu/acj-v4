"use client";
import React, { FC } from "react";
import styled from "styled-components";

const MenuElement = styled.div``;

type T_Menu = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
const Menu: FC<T_Menu> = ({ children, ...rest }) => {
  return <MenuElement {...rest}>{children}</MenuElement>;
};

export default Menu;
