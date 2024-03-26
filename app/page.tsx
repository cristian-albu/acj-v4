import React from "react";
import HomeView from "@/views/home/HomeView";
import { homepageData } from "@/data/page-data/homepage-data";
import { getEvents } from "@/lib/calendar-client";

const HomePage = async () => {
  const events = await getEvents();

  return <HomeView {...homepageData.data} />;
};

export default HomePage;

export const metadata = homepageData.metadata;
