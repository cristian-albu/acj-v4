import React from "react";
import { homepageData } from "@/data/homepage-data";
import HomeView from "@/views/home/HomeView";

export const metadata = homepageData.metadata;

const HomePage = () => {
  return <HomeView {...homepageData.data} />;
};

export default HomePage;
