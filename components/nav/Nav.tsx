"use client";
import { T_NavData, T_NavItem } from "@/data/nav-data";
import useWindowData from "@/lib/useWindowData";
import Link from "next/link";
import React, { FC } from "react";
import styled from "styled-components";
import { Menu } from "..";

type T_Nav = { navData: T_NavData } & React.HTMLAttributes<HTMLElement>;

const Nav: FC<T_Nav> = ({ navData, ...rest }) => {
  const { viewportWidth } = useWindowData();

  return (
    <NavElement {...rest}>
      <NavItem href={navData.main.path}>
        {navData.main.icon}
        {navData.main.label}
      </NavItem>

      {viewportWidth && viewportWidth >= 768 ? (
        <NavList items={navData.items} />
      ) : (
        <Menu>{navData.itemsIcon || navData.itemsLabel}</Menu>
      )}
    </NavElement>
  );
};

export default Nav;

const NavList: FC<{ items: T_NavItem[] }> = ({ items }) => {
  return (
    <NavListElement>
      {items.map((item) => (
        <NavItem key={item.label} href={item.path}>
          {item.icon}
          {item.label}
        </NavItem>
      ))}
    </NavListElement>
  );
};

const NavElement = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const NavListElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  gap: 1rem;
`;

const NavItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  text-decoration: none;
  color: #fff;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
