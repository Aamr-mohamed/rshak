import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
} from "date-fns";

const CalendarCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({
    "2024-08-01": "attended",
    "2024-08-02": "attended",
    "2024-08-03": "attended",
    "2024-08-04": "attended",
    "2024-08-05": "attended",
    "2024-08-06": "not attended",
    "2024-08-07": "not attended",
    "2024-08-08": "not attended",
    "2024-08-09": "not attended",
    "2024-08-10": "not attended",
    "2024-08-11": "not attended",
    "2024-08-12": "not attended",
    // Add more dates as needed
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    const cloneDay = day;
    formattedDate = format(day, "yyyy-MM-dd");
    const isCurrentMonth = isSameMonth(day, monthStart);
    const isToday = isSameDay(day, new Date());
    const isPastDay = day < new Date(); // Check if the day is in the past

    days.push(
      <div
        key={day}
        className={`p-1 border rounded-md text-center
                    ${!isCurrentMonth ? "bg-gray-300 text-gray-500" : ""}
                    ${isCurrentMonth && isPastDay && attendanceData[formattedDate] === "attended" ? "bg-[#1ea4a3] text-white" : ""}
                    ${isCurrentMonth && isPastDay && attendanceData[formattedDate] === "not attended" ? "bg-[#1769ae] text-white" : ""}
                    ${isCurrentMonth && !attendanceData[formattedDate] && day < new Date() ? "bg-[#1769ae] text-white" : ""}
                    ${isToday ? "border-2 border-red-500" : ""}`}
      >
        {format(day, "d")}
      </div>
    );
    day = addDays(cloneDay, 1);
  }

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg px-9 py-1">
      <div className="my-2 text-center">
        <p>{`${format(new Date(), "EEEE, MMMM d")}`}</p>
      </div>
      <div className="grid grid-cols-7 gap-2">{days}</div>
      <div className="flex justify-between items-center my-2">
        <button onClick={handlePrevMonth}>←</button>
        <span>{format(currentDate, "MMMM yyyy")}</span>
        <button onClick={handleNextMonth}>→</button>
      </div>
    </div>
  );
};

export default CalendarCard;

