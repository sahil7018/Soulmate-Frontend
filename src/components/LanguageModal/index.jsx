import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./LanguageModal.css";

export default function LanguageModal({
  openLanguageModal,
  setLanguageModal,
  languages,
  headerLogo,
}) {
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width < 1024 ? "80%" : "60%",
    overflowY: "auto",
    height: "80%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={openLanguageModal}
      onClose={() => setLanguageModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="sw552:tw-w-[93%] tw-w-full tw-ms-auto tw-me-auto tw-pt-12 tw-pb-12">
          <div className="tw-flex tw-flex-col tw-gap-8 tw-border-b tw-pb-3 tw-ps-5 tw-pe-5">
            <div className="tw-flex tw-justify-between tw-items-center">
              <img src={headerLogo?.HomePageContent_data} alt="" />
              <button onClick={() => setLanguageModal(false)}>
                <CloseIcon sx={{ color: "#ED1B24", fontSize: 32 }} />
              </button>
            </div>
            <h3 className="tw-font-roboto tw-font-medium tw-text-[]">
              Choose a Language
            </h3>
          </div>
          <div className="language-options">
            {languages &&
              languages.length > 0 &&
              languages.map((item, index) => (
                <button
                  key={index}
                  className="tw-flex tw-flex-col tw-items-start tw-mb-6 ps-2 pe-2 pt-2 pb-2"
                  style={{
                    backgroundColor:
                      item.id === selectedLanguage
                        ? "rgba(219, 238, 255, 0.5)"
                        : "transparent",
                    border:
                      item.id === selectedLanguage ? "1px solid #0059A9" : "",
                    borderRadius: "8px",
                  }}
                  onClick={() => setSelectedLanguage(item.id)}
                >
                  <h6 className="sw378:tw-text-[22px] tw-text-[18px] tw-font-roboto tw-font-medium">
                    {item.name}
                  </h6>
                  <span className="sw378:tw-text-[20px] tw-text-[16px] tw-font-roboto tw-font-normal">
                    {item.translations[item?.code]}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
