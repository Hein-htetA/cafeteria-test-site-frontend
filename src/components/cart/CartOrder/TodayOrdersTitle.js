import React from "react";
const getAmPmTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let amPm = "AM";
  const minute = date.getMinutes();
  const minStr = minute < 10 ? "0" + minute : minute;
  if (hour > 12) {
    hour = hour - 12;
    amPm = "PM";
  }
  const string = `${hour}:${minStr} ${amPm}`;
  return string;
};

const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const getDayName = (index) => {
  const indexAndLength = index + days.length;
  const actualIndex = indexAndLength % 7;
  return days[actualIndex];
};

const TodayOrdersTitle = () => {
  return (
    <h2
      style={{
        margin: "20px auto",
        padding: "5px 15px",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        width: "fit-content",
        color: "#ea4f6a",
        fontSize: "1.2rem",
        textTransform: "uppercase",
      }}
    >
      {getDayName(new Date().getDay() - 1) +
        " " +
        getAmPmTime() +
        "   -   " +
        getDayName(new Date().getDay()) +
        " " +
        getAmPmTime()}
    </h2>
  );
};

export default TodayOrdersTitle;
