import axios from "axios";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./calender.css";

const FoodDispensingCalendar = ({ userId }) => {
  const [attendanceData, setAttendanceData] = useState({});
  const [dateValue, setDateValue] = useState(new Date());
  const backendUrl = process.env.REACT_APP_API_URL;

  const formatLocalDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    const getAttendaceDate = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/user/fooddispensing/${userId}`,
        );
        const attendanceData = response.data.foodDispensing || [];
        const attendanceDates = attendanceData.reduce((acc, item) => {
          const formattedDate = formatLocalDate(new Date(item.date));
          acc[formattedDate] = item.foodDispensing
            ? "attended"
            : "not attended";
          return acc;
        }, {});
        setAttendanceData(attendanceDates);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    getAttendaceDate();
  }, [userId]);

  const handleDayClick = async (date) => {
    const splitDate = formatLocalDate(date);

    const currentAttendance = attendanceData[splitDate];
    const newAttendance =
      currentAttendance === "attended" ? "not attended" : "attended";

    try {
      setAttendanceData({
        ...attendanceData,
        [splitDate]: newAttendance,
      });

      await axios.patch(`${backendUrl}/user/update/fooddispensing/${userId}`, [
        {
          date: splitDate,
          foodDispensing: newAttendance === "attended",
        },
      ]);
    } catch (error) {
      console.error("Error updating attendance:", error);
      setAttendanceData({
        ...attendanceData,
        [splitDate]: currentAttendance,
      });
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

export default FoodDispensingCalendar;
