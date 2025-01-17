import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./calender.css";

const CalendarComp = () => {
  const [attendanceData, setAttendanceData] = useState({});
  const [dateValue, setDateValue] = useState(new Date());

  // Sample data for attendance
  useEffect(() => {
    setAttendanceData({
      "2024-12-01": "attended",
      "2024-12-02": "not attended",
      "2024-12-03": "attended",
      "2024-12-10": "not attended",
    });
  }, []);

  // Toggle attendance
  const handleDayClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const newStatus =
      attendanceData[formattedDate] === "attended"
        ? "not attended"
        : "attended";

    setAttendanceData({
      ...attendanceData,
      [formattedDate]: newStatus,
    });

    // Optionally sync with backend here
  };

  // Get day styles
  const getTileClassName = ({ date, view }) => {
    if (view !== "month") return ""; // Only style days in month view
    const formattedDate = date.toISOString().split("T")[0];
    const status = attendanceData[formattedDate];
    if (status === "attended") return "bg-[#1EA4A3] text-white";
    if (status === "not attended") return "bg-[#1769AE] text-white";
    return ""; // Default
  };

  return (
    <div className="w-full mx-auto">
      {/* Calendar */}
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
          showNavigation={true} // Hide default navigation
        />
      </div>
    </div>
  );
};

export default CalendarComp;
