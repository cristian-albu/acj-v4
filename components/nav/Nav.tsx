"use client";
import { T_NavData, T_NavItem } from "@/data/nav-data";
import useWindowData from "@/lib/useWindowData";
import Link from "next/link";
import React, { FC } from "react";
import styled from "styled-components";
import { MEDIA_QUERIES } from "@/lib/constants";
import { Modal } from "..";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";

type T_Nav = { navData: T_NavData } & React.HTMLAttributes<HTMLElement>;

const Nav: FC<T_Nav> = ({ navData, ...rest }) => {
  const { viewportWidth } = useWindowData();

  return (
    <NavElement {...rest}>
      <NavItem href={navData.main.path} style={{ marginRight: "auto" }}>
        {navData.main.icon}
        {navData.main.label}
      </NavItem>

      {viewportWidth && viewportWidth >= MEDIA_QUERIES.md ? (
        <NavList items={navData.items} />
      ) : (
        <Modal
          modalType="menu"
          modalTargetOffset={300}
          contentsTitle="Some modal 2"
          contents={<NavList items={navData.items} />}
        >
          <MenuSpan>{<HiOutlineBars3CenterLeft size={"1.2rem"} />}</MenuSpan>
        </Modal>
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
  font-size: 1;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const MenuSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  font-size: 1;
  text-decoration: none;
  color: #fff;
  transition: 0.3s ease-in-out;
  cursor: pointer;
`;

const NavListElement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  gap: 1rem;

  @media (max-width: ${MEDIA_QUERIES.md}px) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 0;
    width: 300px;
    background-color: #000;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  text-decoration: none;
  background-color: #000;
  color: #fff;
  transition: 0.3s ease-in-out;
  max-width: 300px;
  &:hover {
    background-color: #fff;
    color: #000;
  }

  @media (max-width: ${MEDIA_QUERIES.md}px) {
    width: 100%;
    justify-content: flex-start;
  }
`;
