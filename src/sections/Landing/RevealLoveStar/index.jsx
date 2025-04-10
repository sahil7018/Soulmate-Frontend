import React, { useEffect, useRef, useState } from "react";
import "./RevealLoveStar.css";
import Ring from "src/assets/Ring.svg";
import { Button } from "react-bootstrap";
import BtnSquare from "src/components/BtnSquare";
import RevealStarCards from "src/components/RevealStarCards";
import { Link } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { MonthCalendar } from "@mui/x-date-pickers/MonthCalendar";
import dayjs from "dayjs";
import { YearCalendar } from "@mui/x-date-pickers";
import Modal from "@mui/material/Modal";

function RevealLoveStar({ revealLoveData }) {
  const [revealSelected, setRevealSelected] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [dateLimit, setDateLimit] = useState(31);
  const [date, setDate] = useState(1);
  const [showDate, setShowDate] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState(1971);
  const [isLeapYear, setLeapYear] = useState(false);
  const [touchStartY, setTouchStartY] = useState(null);
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openMonth, setOpenMonth] = React.useState(false);
  const [openYear, setOpenYear] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
  };

  const dateRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const d = new Date();

  const handleDayChange = (newValue) => {
    setSelectedDay(newValue);
    console.log(
      "Selected day:",
      newValue ? newValue.format("YYYY-MM-DD") : "null"
    );
    setOpenModal(false);
    setOpen(false);
  };

  const handleOpenPicker = () => {
    setOpen(!open);
    if (width <= 768) {
      setOpenModal(true);
    }
    setOpenMonth(false);
    setOpenYear(false);
  };
  const handleOpenMonthPicker = () => {
    setOpenMonth(!openMonth);
    setOpen(false);
    setOpenYear(false);
    if (width <= 768) {
      setOpenModal(true);
    }
  };
  const handleOpenYearPicker = () => {
    setOpenYear(!openYear);
    setOpen(false);
    setOpenMonth(false);
    if (width <= 768) {
      setOpenModal(true);
    }
  };

  const closeAll = () => {
    setOpenYear(false);
    setOpen(false);
    setOpenMonth(false);
  };

  const handleReveal = () => {
    if (selectedDay) {
      setIsFadingOut(true);
      // Wait for the fade-out animation to complete (1 second)
      setTimeout(() => {
        setRevealSelected(true);
      }, 1000);
    }
  };

  const increaseDate = () => {
    if (date < dateLimit) {
      setDate(date + 1);
    }
  };
  const decreaseDate = () => {
    if (date > 1) {
      setDate(date - 1);
    }
  };

  const identifyMonth = (currentMonth, isLeap) => {
    if ([0, 2, 4, 6, 7, 9, 11].includes(currentMonth)) {
      setDateLimit(31);
    } else if (currentMonth === 1) {
      if (isLeap) {
        setDate((prev) => (prev > 29 ? 29 : prev));
        setDateLimit(29);
      } else {
        setDate((prev) => (prev > 28 ? 28 : prev));
        setDateLimit(28);
      }
    } else {
      setDate((prev) => (prev > 30 ? 30 : prev));
      setDateLimit(30);
    }
  };

  const increaseYear = () => {
    if (selectedYear < d.getFullYear()) {
      const newYear = selectedYear + 1;
      const isLeap =
        newYear % 100 === 0 ? newYear % 400 === 0 : newYear % 4 === 0;
      setLeapYear(isLeap);
      identifyMonth(currentMonthIndex, isLeap); // Pass calculated value
      setSelectedYear(newYear);
    }
  };

  const decreaseYear = () => {
    if (selectedYear > 1971) {
      const newYear = selectedYear - 1;
      const isLeap =
        newYear % 100 === 0 ? newYear % 400 === 0 : newYear % 4 === 0;
      setLeapYear(isLeap);
      identifyMonth(currentMonthIndex, isLeap); // Pass calculated value
      setSelectedYear(newYear);
    }
  };

  const increaseMonth = () => {
    if (currentMonthIndex < 11) {
      const newMonth = currentMonthIndex + 1;
      setCurrentMonthIndex(newMonth);
      identifyMonth(newMonth, isLeapYear); // Use state value
    }
  };

  const decreaseMonth = () => {
    if (currentMonthIndex > 0) {
      const newMonth = currentMonthIndex - 1;
      setCurrentMonthIndex(newMonth);
      identifyMonth(newMonth, isLeapYear); // Use state value
    }
  };

  const handleTouchStart = (event) => {
    setTouchStartY(event.touches[0].clientY);
  };

  const handleTouchMove = (event) => {
    if (touchStartY === null) return;

    event.preventDefault(); // Prevent default scrolling behavior
    const touchY = event.touches[0].clientY;
    const diff = touchStartY - touchY;
    const threshold = 10; // Minimum distance to trigger a scroll

    if (Math.abs(diff) < threshold) return;

    if (showDate) {
      if (diff > 0) {
        increaseDate();
      } else {
        decreaseDate();
      }
    } else if (showMonth) {
      if (diff > 0) {
        increaseMonth();
      } else {
        decreaseMonth();
      }
    } else if (showYear) {
      if (diff > 0) {
        increaseYear();
      } else {
        decreaseYear();
      }
    }

    // Reset touch start to allow continuous scrolling
    setTouchStartY(touchY);
  };

  const handleTouchEnd = () => {
    setTouchStartY(null);
  };

  useEffect(() => {
    const handleScroll = (event) => {
      if (showDate) {
        event.preventDefault();
        if (event.deltaY > 0) {
          increaseDate();
        } else if (event.deltaY < 0) {
          decreaseDate();
        }
      }
      if (showMonth) {
        event.preventDefault();
        if (event.deltaY > 0) {
          increaseMonth();
        } else if (event.deltaY < 0) {
          decreaseMonth();
        }
      }
      if (showYear) {
        event.preventDefault();
        if (event.deltaY > 0) {
          increaseYear();
        } else if (event.deltaY < 0) {
          decreaseYear();
        }
      }
    };

    const div = dateRef.current;
    const monthDiv = monthRef.current;
    const yearDiv = yearRef.current;

    if (div) {
      div.addEventListener("wheel", handleScroll);
    }
    if (monthDiv) {
      monthDiv.addEventListener("wheel", handleScroll);
    }
    if (yearDiv) {
      yearDiv.addEventListener("wheel", handleScroll);
    }

    if (div) {
      div.addEventListener("touchstart", handleTouchStart);
      div.addEventListener("touchmove", handleTouchMove, { passive: false });
      div.addEventListener("touchend", handleTouchEnd);
    }
    if (monthDiv) {
      monthDiv.addEventListener("touchstart", handleTouchStart);
      monthDiv.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      monthDiv.addEventListener("touchend", handleTouchEnd);
    }
    if (yearDiv) {
      yearDiv.addEventListener("touchstart", handleTouchStart);
      yearDiv.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      yearDiv.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (div) {
        div.removeEventListener("wheel", handleScroll);
      }
      if (monthDiv) {
        monthDiv.removeEventListener("wheel", handleScroll);
      }
      if (yearDiv) {
        yearDiv.removeEventListener("wheel", handleScroll);
      }

      if (div) {
        div.removeEventListener("touchstart", handleTouchStart);
        div.removeEventListener("touchmove", handleTouchMove);
        div.removeEventListener("touchend", handleTouchEnd);
      }
      if (monthDiv) {
        monthDiv.removeEventListener("touchstart", handleTouchStart);
        monthDiv.removeEventListener("touchmove", handleTouchMove);
        monthDiv.removeEventListener("touchend", handleTouchEnd);
      }
      if (yearDiv) {
        yearDiv.removeEventListener("touchstart", handleTouchStart);
        yearDiv.removeEventListener("touchmove", handleTouchMove);
        yearDiv.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [
    date,
    showDate,
    currentMonthIndex,
    showMonth,
    selectedYear,
    showYear,
    touchStartY,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="reveal-love-star-container"
      // onClick={(open || openMonth || openYear) && closeAll}
      onClick={open || openMonth || openYear ? closeAll : undefined}
    >
      <div
        className={`reveal-love-star-content-container ${
          revealSelected && "tw-relative"
        }`}
      >
        <div className="tw-flex tw-justify-between tw-flex-wrap">
          <div className="tw-max-w-[80%] sw1024:tw-max-w-[920px]">
            <h1 className="reveal-love-star-heading">
              {revealLoveData?.header[0]?.HomePageContent_data}
            </h1>
          </div>
          <Link
            className="tw-text-white tw-underline sw1024:tw-text-[32px]/[37.5px] sw851:tw-text-xl/[28.5px] tw-text-xs/[22.5px] sw1024:tw-mt-0 sw768:tw-mt-4 tw-font-bold tw-font-roboto"
            onClick={() => {
              const element = document.getElementById("peopleTrust");
              element?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Skip
          </Link>
        </div>
        {!revealSelected ? (
          <>
            <div
              className={`reveal-love-star-detail-container ${
                isFadingOut ? "fade-out" : ""
              }`}
            >
              <h2 className="reveal-love-star-detail-text">
                {revealLoveData?.text[0]?.HomePageContent_data}
              </h2>
              <div className="reveal-love-star-date-fixture">
                <div className="reveal-love-star-btn-text-container fixture-block">
                  <h3 className="reveal-love-star-date-fixture-text">
                    {revealLoveData?.calender[0]?.HomePageContent_data}
                  </h3>
                  <div className="tw-relative" ref={dateRef}>
                    {width <= 1024 && width > 768 && open && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                          views={["day"]}
                          value={selectedDay}
                          onChange={handleDayChange}
                          onClose={() => setOpen(false)}
                          slots={
                            {
                              // calendarHeader: () => null
                            }
                          }
                          sx={{
                            backgroundColor: "white",
                            position: "absolute",
                            // marginTop: "1rem",
                            borderRadius: "10px",
                            zIndex: "20",
                            height: "350px",
                            bottom: "130%",
                            width: "300px",
                          }}
                        />
                      </LocalizationProvider>
                    )}
                    <Button
                      className={`reveal-love-star-selector tw-z-20 tw-relative tw-border-none ${
                        showDate ? "tw-text-black" : "tw-text-[#474747]"
                      }  `}
                      // onClick={() => changeDate(date - 2)}
                      onClick={handleOpenPicker}
                    >
                      {selectedDay ? dayjs(selectedDay).format("D") : "Date"}
                    </Button>
                    {width > 1024 && open && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                          views={["day"]}
                          value={selectedDay}
                          onChange={handleDayChange}
                          onClose={() => setOpen(false)}
                          slots={
                            {
                              // calendarHeader: () => null
                            }
                          }
                          sx={{
                            backgroundColor: "white",
                            position: "absolute",
                            marginTop: "1rem",
                            borderRadius: "10px",
                            zIndex: "20",
                            height: "350px",
                            width: "300px",
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  </div>
                </div>
                <div className="reveal-love-star-btn-text-container month-block">
                  <h3 className="reveal-love-star-date-fixture-text">
                    {revealLoveData?.calender[1]?.HomePageContent_data}
                  </h3>
                  <div className="tw-relative" ref={monthRef}>
                    {width <= 1024 && width > 768 && openMonth && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MonthCalendar
                          value={selectedDay}
                          onChange={handleDayChange}
                          onClose={() => setOpen(false)}
                          slots={
                            {
                              // calendarHeader: () => null
                            }
                          }
                          sx={{
                            backgroundColor: "white",
                            position: "absolute",
                            marginTop: "1rem",
                            borderRadius: "10px",
                            zIndex: "20",
                            height: "220px",
                            bottom: "130%",
                            // overflow: "auto"
                          }}
                        />
                      </LocalizationProvider>
                    )}
                    <Button
                      className={`reveal-love-star-selector tw-z-20 tw-relative tw-border-none ${
                        showMonth ? "tw-text-black" : "tw-text-[#474747]"
                      }  `}
                      // onClick={() => changeMonth()}
                      onClick={handleOpenMonthPicker}
                    >
                      {selectedDay
                        ? dayjs(selectedDay).format("MMMM")
                        : "Month"}
                    </Button>
                    {width > 1024 && openMonth && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MonthCalendar
                          value={selectedDay}
                          onChange={handleDayChange}
                          onClose={() => setOpen(false)}
                          slots={
                            {
                              // calendarHeader: () => null
                            }
                          }
                          sx={{
                            backgroundColor: "white",
                            position: "absolute",
                            marginTop: "1rem",
                            borderRadius: "10px",
                            zIndex: "20",
                            height: "220px",
                            // overflow: "auto"
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  </div>
                </div>
                <div className="reveal-love-star-btn-text-container fixture-block">
                  <h3 className="reveal-love-star-date-fixture-text">
                    {revealLoveData?.calender[2]?.HomePageContent_data}
                  </h3>
                  <div className="tw-relative" ref={yearRef}>
                    {width <= 1024 && width > 768 && openYear && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <YearCalendar
                          value={selectedDay}
                          onChange={handleDayChange}
                          onClose={() => setOpen(false)}
                          slots={
                            {
                              // calendarHeader: () => null
                            }
                          }
                          sx={{
                            backgroundColor: "white",
                            position: "absolute",
                            marginTop: "1rem",
                            borderRadius: "10px",
                            zIndex: "20",
                            height: "220px",
                            bottom: "130%",
                            // overflow: "auto"
                          }}
                        />
                      </LocalizationProvider>
                    )}
                    <Button
                      className={`reveal-love-star-selector tw-z-20 tw-relative tw-border-none ${
                        showMonth ? "tw-text-black" : "tw-text-[#474747]"
                      }  `}
                      // onClick={() => changeYear()}
                      onClick={handleOpenYearPicker}
                    >
                      {selectedDay ? dayjs(selectedDay).format("YYYY") : "Year"}
                    </Button>
                    {width > 1024 && openYear && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <YearCalendar
                          value={selectedDay}
                          onChange={handleDayChange}
                          onClose={() => setOpen(false)}
                          slots={
                            {
                              // calendarHeader: () => null
                            }
                          }
                          sx={{
                            backgroundColor: "white",
                            position: "absolute",
                            marginTop: "1rem",
                            borderRadius: "10px",
                            zIndex: "20",
                            height: "220px",
                            // overflow: "auto"
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  </div>
                </div>
              </div>
              <div className="reveal-love-star-btn">
                <BtnSquare
                  text={revealLoveData?.button[0]?.HomePageContent_data}
                  onClick={handleReveal}
                  className="reveal-lover-star-hover-btn"
                  backgroundColor="#E11B24"
                />
              </div>
            </div>
            <div className="tw-max-w-[80%] sw552:tw-max-w-[630px]">
              <span
                className={`reveal-love-star-span tw-font-roboto ${
                  isFadingOut ? "fade-out" : ""
                }`}
              >
                {revealLoveData?.subtitle[0]?.HomePageContent_data}
              </span>
            </div>
          </>
        ) : (
          <RevealStarCards />
        )}
      </div>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          {open ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                views={["day"]}
                value={selectedDay}
                onChange={handleDayChange}
                onClose={() => {
                  setOpen(false);
                  setOpenModal(false);
                }}
                slots={
                  {
                    // calendarHeader: () => null
                  }
                }
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  marginTop: "1rem",
                  borderRadius: "10px",
                  zIndex: "20",
                  height: "350px",
                  // width: "300px",
                }}
              />
            </LocalizationProvider>
          ) : (
            <></>
          )}
          {openMonth ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MonthCalendar
                value={selectedDay}
                onChange={handleDayChange}
                onClose={() => {
                  setOpen(false);
                  setOpenModal(false);
                }}
                slots={
                  {
                    // calendarHeader: () => null
                  }
                }
                sx={{
                  backgroundColor: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  marginTop: "1rem",
                  borderRadius: "10px",
                  zIndex: "20",
                  height: "220px",
                  // overflow: "auto"
                }}
              />
            </LocalizationProvider>
          ) : (
            <></>
          )}
          {openYear && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <YearCalendar
                value={selectedDay}
                onChange={handleDayChange}
                onClose={() => {
                  setOpenModal(false);
                  setOpen(false);
                }}
                slots={
                  {
                    // calendarHeader: () => null
                  }
                }
                sx={{
                  backgroundColor: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  marginTop: "1rem",
                  borderRadius: "10px",
                  zIndex: "20",
                  height: "220px",
                  // overflow: "auto"
                }}
              />
            </LocalizationProvider>
          )}
        </div>
      </Modal>

      <div
        className={`svg-star  tw-absolute ${
          width > 1024
            ? `tw-top-[30vh] tw-left-[3vw]`
            : width > 768
            ? `tw-top-[250px] tw-left-[3vw]`
            : width > 535
            ? `tw-top-[170px] tw-left-[3vw]`
            : `tw-top-[90px] tw-left-[3vw]`
        } `}
      >
        <svg
          width={
            width > 1024 ? "66" : width > 768 ? "40" : width > 535 ? "32" : "16"
          }
          height={
            width > 1024 ? "66" : width > 768 ? "40" : width > 535 ? "32" : "16"
          }
          viewBox="0 0 66 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40.6518 37.7068L66 33.0263L40.6518 28.2932L47.1203 18.8271L37.7068 25.3482L33.0263 0L28.2932 25.3482L18.8271 18.8271L25.3482 28.2932L0 33.0263L25.3482 37.7068L18.8271 47.1203L28.2932 40.6518L33.0263 66L37.7068 40.6518L47.1203 47.1203L40.6518 37.7068Z"
            fill="#FEFEFE"
          />
        </svg>
      </div>
      <div
        className={`svg-star  tw-absolute ${
          width > 1024
            ? `tw-top-[8vh]`
            : width > 768
            ? `tw-top-[90px]`
            : width > 535
            ? `tw-top-[54px]`
            : `tw-top-[22px]`
        } tw-left-[10vw]`}
      >
        <svg
          width={
            width > 1024 ? "36" : width > 768 ? "28" : width > 535 ? "20" : "12"
          }
          height={
            width > 1024 ? "36" : width > 768 ? "28" : width > 535 ? "20" : "12"
          }
          viewBox="0 0 66 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40.6518 37.7068L66 33.0263L40.6518 28.2932L47.1203 18.8271L37.7068 25.3482L33.0263 0L28.2932 25.3482L18.8271 18.8271L25.3482 28.2932L0 33.0263L25.3482 37.7068L18.8271 47.1203L28.2932 40.6518L33.0263 66L37.7068 40.6518L47.1203 47.1203L40.6518 37.7068Z"
            fill="#FEFEFE"
          />
        </svg>
      </div>
      <div
        className={`svg-star  tw-absolute ${
          width > 768
            ? `tw-top-[8.5vh]`
            : width > 535
            ? `tw-top-[45px]`
            : `tw-top-[18px]`
        } tw-left-[60.6vw]`}
      >
        <svg
          width={
            width > 1024 ? "45" : width > 768 ? "36" : width > 535 ? "28" : "16"
          }
          height={
            width > 1024 ? "45" : width > 768 ? "36" : width > 535 ? "28" : "16"
          }
          viewBox="0 0 66 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40.6518 37.7068L66 33.0263L40.6518 28.2932L47.1203 18.8271L37.7068 25.3482L33.0263 0L28.2932 25.3482L18.8271 18.8271L25.3482 28.2932L0 33.0263L25.3482 37.7068L18.8271 47.1203L28.2932 40.6518L33.0263 66L37.7068 40.6518L47.1203 47.1203L40.6518 37.7068Z"
            fill="#FEFEFE"
          />
        </svg>
      </div>
      <div
        className={`svg-star tw-absolute  ${
          width > 1024
            ? `tw-top-[42vh] tw-left-[50vw]`
            : width > 768
            ? `tw-top-[320px] tw-left-[50vw]`
            : width > 535
            ? `tw-top-[230px] tw-left-[50vw]`
            : `tw-top-[118px] tw-left-[55vw]`
        }  `}
      >
        <svg
          width={
            width > 1024 ? "35" : width > 768 ? "27" : width > 535 ? "21" : "13"
          }
          height={
            width > 1024 ? "35" : width > 768 ? "27" : width > 535 ? "21" : "13"
          }
          viewBox="0 0 66 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40.6518 37.7068L66 33.0263L40.6518 28.2932L47.1203 18.8271L37.7068 25.3482L33.0263 0L28.2932 25.3482L18.8271 18.8271L25.3482 28.2932L0 33.0263L25.3482 37.7068L18.8271 47.1203L28.2932 40.6518L33.0263 66L37.7068 40.6518L47.1203 47.1203L40.6518 37.7068Z"
            fill="#FEFEFE"
          />
        </svg>
      </div>
      <div
        className={`svg-star tw-absolute ${
          width > 1024
            ? `tw-top-[31vh]`
            : width > 768
            ? `tw-top-[270px]`
            : width > 535
            ? `tw-top-[180px]`
            : `tw-top-[105px]`
        } tw-left-[94.2vw]`}
      >
        <svg
          width={
            width > 1024 ? "36" : width > 768 ? "28" : width > 535 ? "20" : "12"
          }
          height={
            width > 1024 ? "36" : width > 768 ? "28" : width > 535 ? "20" : "12"
          }
          viewBox="0 0 66 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40.6518 37.7068L66 33.0263L40.6518 28.2932L47.1203 18.8271L37.7068 25.3482L33.0263 0L28.2932 25.3482L18.8271 18.8271L25.3482 28.2932L0 33.0263L25.3482 37.7068L18.8271 47.1203L28.2932 40.6518L33.0263 66L37.7068 40.6518L47.1203 47.1203L40.6518 37.7068Z"
            fill="#FEFEFE"
          />
        </svg>
      </div>
      {!revealSelected && (
        <div className="ring-container">
          {/* <img src={BlueRingBack} alt="" style={{zIndex: '-1'}}/> */}
          <img src={Ring} alt="" className="ring-love-star" />
          <div className={`svg-star tw-absolute`}>
            <svg
              width={width > 535 ? "36" : "14"}
              height={width > 535 ? "36" : "14"}
              viewBox="0 0 66 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40.6518 37.7068L66 33.0263L40.6518 28.2932L47.1203 18.8271L37.7068 25.3482L33.0263 0L28.2932 25.3482L18.8271 18.8271L25.3482 28.2932L0 33.0263L25.3482 37.7068L18.8271 47.1203L28.2932 40.6518L33.0263 66L37.7068 40.6518L47.1203 47.1203L40.6518 37.7068Z"
                fill="#FEFEFE"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default RevealLoveStar;
