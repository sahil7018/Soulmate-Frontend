import React from "react";
import "./Landing.css";
import Hero from "src/sections/Landing/Hero";
import LoveStory from "src/sections/Landing/LoveStory";
import RevealLoveStar from "src/sections/Landing/RevealLoveStar";
import PeopleTrust from "src/sections/Landing/PeopleTrust";
import LoveJournal from "src/sections/Landing/LoveJournal";
import BecomePartner from "src/sections/Landing/BecomePartner";
import RealPeople from "src/sections/Landing/RealPeople";
import AppBanner from "src/sections/Landing/AppBanner";
import { useGenericQuery } from "src/hooks/useGenericQuery";
import { fetchHomePageData } from "src/redux/queryFunctions/homeQueries";
import CircularProgress from "@mui/material/CircularProgress";

function Main() {
  const { data: homeData, isPending } = useGenericQuery({
    queryKey: ["home"],
    queryFn: fetchHomePageData,
  });

  if (isPending) {
    return (
      <div className="tw-flex tw-justify-center tw-items-center tw-h-screen">
        <CircularProgress color="primary" size={60} thickness={5} />
      </div>
    );
  }

  return (
    <>
      {homeData?.data?.heroSection && (
        <Hero heroSection={homeData?.data?.heroSection} />
      )}
      <div style={{ backgroundColor: "#FEF6F6" }}>
        {homeData?.data["love-story-container"] && (
          <LoveStory loveStoryData={homeData?.data["love-story-container"]} />
        )}
      </div>
      {homeData?.data["reveal-love-star-container"] && (
        <RevealLoveStar
          revealLoveData={homeData?.data["reveal-love-star-container"]}
        />
      )}
      {homeData?.data["people-trust"] &&
        homeData?.data["people-trust"]["background-image"] && (
          <PeopleTrust peopleTrustData={homeData?.data["people-trust"]} />
        )}
      {homeData?.data?.blogs && homeData?.data?.blogs.length > 0 && (
        <LoveJournal loverJournalData={homeData?.data?.blogs} />
      )}
      <BecomePartner />
      <RealPeople />
      <AppBanner />
    </>
  );
}

export default Main;
