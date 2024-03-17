import React from "react";
import { IconType } from "react-icons";
import {
  HiOutlineBars3CenterLeft,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineHomeModern,
  HiOutlineNewspaper,
  HiOutlinePresentationChartBar,
  HiOutlineRocketLaunch,
  HiOutlineUser,
} from "react-icons/hi2";

export type T_Icon = React.ReactElement<IconType>;
export type T_NavItem = {
  label: string;
  path: string;
  icon?: T_Icon;
};

export type T_NavData = {
  main: T_NavItem;
  itemsLabel: string;
  itemsIcon?: T_Icon;
  items: T_NavItem[];
};

export const navData: T_NavData = {
  main: {
    label: "Home",
    path: "/",
    icon: <HiOutlineHomeModern />,
  },
  itemsIcon: <HiOutlineBars3CenterLeft />,
  itemsLabel: "Menu",
  items: [
    {
      label: "Projects",
      path: "/projects",
      icon: <HiOutlinePresentationChartBar />,
    },
    {
      label: "Skillset",
      path: "/skillset",
      icon: <HiOutlineRocketLaunch />,
    },
    {
      label: "Posts",
      path: "/posts",
      icon: <HiOutlineNewspaper />,
    },
    {
      label: "About",
      path: "/About",
      icon: <HiOutlineUser />,
    },
    {
      label: "Contact",
      path: "/contact",
      icon: <HiOutlineChatBubbleBottomCenterText />,
    },
  ],
};
