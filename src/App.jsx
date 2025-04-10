import React, { useEffect, useState } from "react";
import Header from "src/components/Header";
import { Outlet, useLocation } from "react-router";
import Footer from "src/components/Footer";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./App.css";
import { fetchHomePageData } from "src/redux/queryFunctions/homeQueries";
import { useGenericQuery } from "src/hooks/useGenericQuery";

function App() {
  const { data: homeData } = useGenericQuery({
    queryKey: ["home"],
    queryFn: fetchHomePageData,
  });

  const location = useLocation();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname !== "/") {
      document.body.style.overflow = "auto";
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1148) {
        // Show button after scrolling 300px
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {homeData && homeData?.data && <Header data={homeData?.data} />}
      <div className="outlet">
        <Outlet />
      </div>
      <Footer data={homeData?.data} />
      {showScroll && (
        <div className="tw-fixed sw768:tw-bottom-[5%] tw-bottom-[3%] sw768:tw-right-[2.5%] sw552:tw-right-[3%] tw-right-6 tw-z-40">
          <button
            className="tw-bg-[#ed1b24] tw-bg-opacity-70 tw-p-4 tw-rounded-full"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ExpandLessIcon
              sx={{
                color: "#ffffff",
                fontSize: window.innerWidth > 540 ? 48 : 32,
              }}
            />
          </button>
        </div>
      )}
    </>
  );
}

export default App;
