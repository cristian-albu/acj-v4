import React from "react";

import HomeView from "@/views/home/HomeView";
import { homepageData } from "@/data/page-data/homepage-data";

export const metadata = homepageData.metadata;

const HomePage = () => {
  return <HomeView {...homepageData.data} />;
};

export default HomePage;
