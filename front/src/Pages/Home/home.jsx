import React from "react";
import BarChart from "../../Components/BarChart/UsersWeightChart";
import CalendarCard from "../../Components/Calender/calender";
import DoughnutChart from "../../Components/DoughnutChart/DoughnutChart";
import DoughnutChartSlim from "../../Components/DoughnutChart/CommonDiseaseChart";
import LineChart from "../../Components/LineChart/LineChart";
import LineChartWithLabelsOnPointsNormal from "../../Components/LineChart/LineChartNormal";
import Navbar from "../../Components/Navbar/navbar";
import BodyTypeChart from "../../Components/DoughnutChart/BodyTypeChart";
import CommonDiseaseChart from "../../Components/DoughnutChart/CommonDiseaseChart";
import CommonMedicineChart from "../../Components/DoughnutChart/CommonMedicineChart";

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex flex-col bg-[#e8f0f7] rounded-3xl p-10 mx-10 gap-10">
        <div className="flex flex-row items-center justify-center gap-10 rounded-3xl ">
          <div className="w-[50%] rounded-3xl bg-[#fefefe] p-10 flex flex-col items-center justify-center shadow-gray-300 shadow-sm">
            <p className="text-[#1769ae] font-bold">اوزان المستخدمين</p>
            <div className="bg-white h-[400px] flex justify-center items-center w-full">
              <BarChart />
            </div>
          </div>
          <div className="w-[50%] rounded-3xl bg-[#fefefe] p-10 flex flex-col items-center justify-center shadow-gray-300 shadow-sm">
            <p className="text-[#1769ae] font-bold">اعمار المستخدمين</p>
            <div className="bg-white h-[400px] flex justify-center items-center w-full">
              <DoughnutChart />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-10 bg-[#e8f0f7] rounded-3xl w-full">
          <div className="w-[30%] h-[350px] rounded-3xl bg-[#fefefe] p-4 flex flex-col items-center justify-center shadow-gray-300 shadow-sm">
            <p className="text-[#1769ae] font-bold">الادوية المشتركة</p>
            <CommonMedicineChart />
          </div>
          <div className="w-[30%] h-[350px] rounded-3xl bg-[#fefefe] p-4 flex flex-col items-center justify-center shadow-gray-300 shadow-sm">
            <p className="text-[#1769ae] font-bold">شكل الجسم</p>
            <BodyTypeChart />
          </div>
          <div className="w-[40%] h-[350px] rounded-3xl bg-[#fefefe] p-4 flex flex-col items-center justify-center shadow-gray-300 shadow-sm">
            <p className="text-[#1769ae] font-bold">التغيير في الوزن</p>
            <LineChart />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-10 bg-[#e8f0f7] rounded-3xl w-full">
          <div className="w-[61%] h-[350px] rounded-3xl bg-[#fefefe] p-4 flex flex-col items-center justify-center shadow-gray-300 shadow-sm">
            <p className="text-[#1769ae] font-bold">السكر التراكمي</p>
            <LineChartWithLabelsOnPointsNormal />
          </div>
          <div className="w-[39%] h-[350px] rounded-3xl bg-[#fefefe] p-4 flex flex-col items-center justify-center shadow-gray-300 shadow-sm">
            <p className="text-[#1769ae] font-bold">الامراض المشتركة</p>
            <CommonDiseaseChart />
          </div>
        </div>
      </div>
    </div>
  );
}
