import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import "./Header.css";
import { Button } from "react-bootstrap";
import LanguageIcon from "@mui/icons-material/Language";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageModal from "../LanguageModal";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Header({ data }) {
  const [activeTab, setActiveTab] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [mobileProductDrawer, setMobileProductDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [coloredBg, setColoredBg] = useState(false);
  const open = Boolean(anchorEl);
  const path = useLocation();

  const { menu: NavigationOptions, heroSection, languages } = data;
  const headerLogo = heroSection["header-logo"];

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 540 && window.scrollY > 700) {
        setColoredBg(true);
      } else if (window.innerWidth < 540 && window.scrollY > 200) {
        setColoredBg(true);
      } else {
        console.log("window.scrollY: ", window.scrollY);
        setColoredBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`header header-bg ${coloredBg && "header-bg"} ${
        path.pathname === "/" && "animateHeader"
      }`}
    >
      <div className="header-inner-container">
        <div className="logo-nav-container">
          <NavLink
            to={"/"}
            onClick={() => setActiveTab("")}
            aria-label="On clicking this logo, you will be navigated to Landing Page"
          >
            <img
              src={headerLogo?.HomePageContent_data}
              alt=""
              className="header-logo"
            />
          </NavLink>

          <div className="nav-container">
            {NavigationOptions &&
              NavigationOptions.map((item, index) => (
                <div
                  onMouseEnter={
                    item?.childMenu && item?.childMenu.length > 0
                      ? () => setShowMenu(true)
                      : null
                  }
                  onMouseLeave={
                    item?.childMenu && item?.childMenu.length > 0
                      ? () => setShowMenu(false)
                      : null
                  }
                  className="tw-relative"
                  key={index}
                >
                  <NavLink
                    to={
                      item?.HomePageMenu_data !== "Products"
                        ? item.additional_info?.href
                        : "#"
                    }
                    className={`link-tab ${
                      path.pathname.startsWith("/loveJournal/") &&
                      `blog-page-header`
                    } ${
                      path.pathname === "/business"
                        ? "business-header-font"
                        : "header-font"
                    } ${
                      path.pathname === item?.additional_info?.href
                        ? "active-tab"
                        : ""
                    }`}
                    onClick={() => setActiveTab(item?.HomePageMenu_data)}
                    aria-label={item?.additional_info?.aria_label}
                  >
                    {item?.HomePageMenu_data}
                  </NavLink>

                  {item?.HomePageMenu_data === "Products" && showMenu && (
                    <div className="tw-absolute tw-bg-white tw-flex tw-flex-col tw-w-32 tw-px-4 tw-py-4 tw-rounded-[10px] tw-gap-[8px]">
                      {item?.childMenu &&
                        item?.childMenu.length > 0 &&
                        item?.childMenu.map((subItem, subIndex) => (
                          <NavLink
                            key={subIndex}
                            className={`tw-no-underline tw-text-xl tw-font-roboto tw-font-medium hover:tw-text-[#ED1B24] ${
                              path.pathname === "/premium"
                                ? "tw-text-[#ED1B24]"
                                : "tw-text-[#161616]"
                            }`}
                            to={subItem?.additional_info?.href}
                            onClick={() => setShowMenu(false)}
                          >
                            {subItem?.HomePageMenu_data}
                          </NavLink>
                        ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="header-btn-container">
          <Button className="lang-Btn" onClick={() => setLanguageModal(true)}>
            <LanguageIcon
              className="lang-btn-icon"
              sx={{ marginRight: "0.5rem" }}
            />
            <span>Language</span>
          </Button>
          {path.pathname === "/business" && (
            <Button className="login-Btn">Login</Button>
          )}
        </div>
        <button
          className="header-menu-btn border-3 rounded tw-border-red-600"
          onClick={() => setDrawerOpen(true)}
          aria-label="Hamburger Menu Button"
        >
          <MenuIcon
            sx={{
              color: "red",
              textShadow: "2px 2px 5px rgba(255, 0, 0, 0.3)",
            }}
            className="header-menu-icon"
          />
        </button>
        <Drawer
          anchor="top"
          open={drawerOpen}
          sx={{ background: "rgba(0,0,0,0.6)" }}
          PaperProps={{
            sx: {
              backgroundColor: "transparent",
              boxShadow: "none", // Remove shadow if needed
            },
          }}
        >
          <div className="tw-flex tw-flex-col tw-items-center tw-gap-3 tw-mt-5">
            <button
              className="tw-border-2 tw-border-white tw-rounded-full tw-p-2"
              onClick={() => setDrawerOpen(false)}
            >
              <CloseIcon sx={{ color: "white" }} />
            </button>
            {NavigationOptions &&
              NavigationOptions.map((navItem, index) => (
                <div key={index}>
                  <NavLink
                    to={
                      navItem.HomePageMenu_data !== "Products"
                        ? navItem?.additional_info?.href
                        : "#"
                    }
                    className={`link-tab tw-text-white ${
                      path.pathname === navItem?.additional_info?.href
                        ? "active-tab"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveTab(navItem?.HomePageMenu_data);
                      {
                        navItem?.HomePageMenu_data === "Products" &&
                          setMobileProductDrawerOpen(!mobileProductDrawer);
                      }
                      {
                        navItem?.HomePageMenu_data !== "Products" &&
                          setDrawerOpen(false);
                      }
                    }}
                    aria-label={navItem?.additional_info?.aria_label}
                  >
                    {navItem?.HomePageMenu_data}{" "}
                    {navItem?.HomePageMenu_data === "Products" && (
                      <ArrowDropDownIcon
                        sx={{ marginTop: "-4px", marginLeft: "-4px" }}
                      />
                    )}
                  </NavLink>
                  {mobileProductDrawer &&
                    navItem?.HomePageMenu_data === "Products" && (
                      <div className="tw-flex tw-flex-col tw-ml-4">
                        {navItem?.childMenu &&
                          navItem?.childMenu.length > 0 &&
                          navItem?.childMenu.map((subItem, subIndex) => (
                            <NavLink
                              key={subIndex}
                              className={`link-tab tw-text-white ${
                                path.pathname === subItem?.additional_info?.href
                                  ? "active-tab"
                                  : ""
                              }`}
                              to={subItem?.additional_info?.href}
                              onClick={() => {
                                setActiveTab(navItem?.HomePageMenu_data);
                                setMobileProductDrawerOpen(false);
                                setDrawerOpen(false);
                              }}
                            >
                              {subItem?.HomePageMenu_data}
                            </NavLink>
                          ))}
                      </div>
                    )}
                </div>
              ))}

            <Button className="lang-Btn" onClick={() => setLanguageModal(true)}>
              <LanguageIcon sx={{ fontSize: 32, marginRight: "0.5rem" }} />
              <span>Language</span>
            </Button>
            {path.pathname === "/business" && (
              <Button className="login-Btn pt-4 pb-4">Login</Button>
            )}
          </div>
        </Drawer>
        <LanguageModal
          openLanguageModal={languageModal}
          setLanguageModal={setLanguageModal}
          languages={languages}
          headerLogo={headerLogo}
        />
      </div>
    </div>
  );
}

export default Header;
