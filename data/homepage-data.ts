import { Metadata } from "next";

export const homepageMetadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export const homeviewData = {
  title: "Home",
};

export type T_HomepageData = typeof homeviewData;

export const homepageData = {
  metadata: homepageMetadata,
  data: homeviewData,
};
