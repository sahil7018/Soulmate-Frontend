import React from "react";
import BecomePartner from "src/sections/Landing/BecomePartner";
import TrustedAllies from "src/sections/BussinessCollab/TrustedAllies";
import PartnerStory from "src/sections/BussinessCollab/PartnerStory";
import PartnerNumbers from "src/sections/BussinessCollab/PartnerNumbers";
import PartnershipProgram from "src/sections/BussinessCollab/PartnershipProgram";

function BusinessCollab() {
  return (
    <>
      <BecomePartner spaceEvenly={true} />
      <TrustedAllies />
      <PartnerStory />
      <PartnerNumbers />
      <PartnershipProgram />
    </>
  );
}

export default BusinessCollab;
