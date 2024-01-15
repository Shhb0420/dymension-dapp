import React from "react";
import Countdown from "react-countdown";

function Timer({ isActive, endDate, startDate }) {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    const timeChecker = (value) => {
      return value < 10 ? `0${value}` : value;
    };
    if (completed) {
      return null;
    } else {
      return (
        <span>
          {isActive ? "Ends in - " : "Starts in -"} {timeChecker(days)}:
          {timeChecker(hours)}:{timeChecker(minutes)}:{timeChecker(seconds)}
        </span>
      );
    }
  };

  const addDate = (date, type) => {
    let result = new Date(date)

    if (type === 'start') {
      result.setHours(result.getHours() + 10)
    } else {
      result.setHours(result.getHours() - 14)
    }

    return result
  }

  return (
    <Countdown
      date={addDate(isActive ? endDate : startDate, isActive ? "end" : "start")}
      renderer={renderer}/>
  );
}

export default Timer;
