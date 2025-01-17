import React, { useState } from "react";
import Calendar from "react-calendar";

const GenericCalendar = ({ onDateChange }) => {
  const [attendanceData, setAttendanceData] = useState({});
  const [dateValue, setDateValue] = useState(new Date());

  const formatLocalDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDayClick = (date) => {
    const splitDate = formatLocalDate(date);

    const currentAttendance = attendanceData[splitDate];
    const newAttendance =
      currentAttendance === "attended" ? "not attended" : "attended";

    const updatedAttendanceData = {
      ...attendanceData,
      [splitDate]: newAttendance,
    };

    setAttendanceData(updatedAttendanceData);

    if (onDateChange) {
      onDateChange(updatedAttendanceData);
    }
  };

  const getTileClassName = ({ date, view }) => {
    if (view !== "month") return "";
    const formattedDate = formatLocalDate(date);
    const status = attendanceData[formattedDate];
    if (status === "attended") return "bg-[#1EA4A3] text-white";
    if (status === "not attended") return "bg-[#1769AE] text-white";
    return "";
  };

  return (
    <div className="w-full mx-auto">
      <p className="text-center">
        <span className="bold">يوم </span> {dateValue.getDate()}
      </p>
      <div className="calender-container">
        <Calendar
          locale="ar"
          dateFormat="dd/MM/yyyy"
          value={dateValue}
          onChange={setDateValue}
          onClickDay={handleDayClick}
          tileClassName={getTileClassName}
          className="p-3"
          showNavigation={true}
        />
      </div>
    </div>
  );
};

export default GenericCalendar;
