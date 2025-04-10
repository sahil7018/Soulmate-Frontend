import React from "react";
import { Route, Routes } from "react-router";
import App from "../App";
import Landing from "src/screens/Landing";
import BusinessCollaborations from "src/screens/BusinessCollab";
import Premium from "src/screens/Premium";
import VIP from "src/screens/VIP";
import LoveJournal from "src/screens/LoveJournal";
import LoveJournalBlog from "src/screens/LoveJournalBlog";

function NavigatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Landing />} />
        <Route path="/business" element={<BusinessCollaborations />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/vip" element={<VIP />} />
        <Route path="/loveJournal" element={<LoveJournal />} />
        <Route path="/loveJournal/:id" element={<LoveJournalBlog />} />
      </Route>
    </Routes>
  );
}

export default NavigatedRoutes;
