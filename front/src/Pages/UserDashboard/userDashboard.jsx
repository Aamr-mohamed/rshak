import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { PiMagicWandLight } from "react-icons/pi";
import CheckupsList from "../../Components/Accordians/accordian";
import LineChartWithLabelsOnPointsNormal from "../../Components/LineChart/LineChartNormal";
import Navbar from "../../Components/Navbar/navbar";
import MainInfoModal from "../../Components/EditModal/editMainInfoModal";
import BodyInfoModal from "../../Components/EditModal/editBodyInfoModal";
import CheckupInfoModal from "../../Components/EditModal/editCheckupModal";
import AttendanceCalendar from "../../Components/Calender/attendanceCalender";
import FoodDispensingCalendar from "../../Components/Calender/foodDispensingCalender";
import UserWeightChart from "../../Components/LineChart/userWeightLineChart";
import UpdateBodyInfoModal from "../../Components/EditModal/updateBodyInfoModal";
import AddCheckupModal from "../../Components/AddCheckupModal/addCheckup";
import DiabetesChart from "../../Components/LineChart/userDiabetesChart";

export default function UserDashboard() {
  const backendUrl = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState({});
  const location = useLocation();
  const [isBodyModalOpen, setIsBodyModalOpen] = useState(false);
  const [isUpdateBodyModalOpen, setIsUpdateBodyModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isCheckupModalOpen, setIsCheckupModalOpen] = useState(false);
  const [isCheckupChanged, setIsCheckupChanged] = useState(false);
  const [isCheckupAddOpen, setIsCheckupAddOpen] = useState(false);
  const [isCheckupAdded, setIsCheckupAdded] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");

  const handleCheckupsChange = () => {
    setIsCheckupChanged(!isCheckupChanged);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          console.log(userId);
          const response = await axios.get(`${backendUrl}/user/find/${userId}`);
          console.log(response);
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUser();
  }, [
    userId,
    isBodyModalOpen,
    isInfoModalOpen,
    isCheckupModalOpen,
    isUpdateBodyModalOpen,
    isCheckupAddOpen,
    isCheckupAdded,
    isCheckupChanged,
  ]);

  if (!user || !user.bodyInfo || !user.bodyCheckup) {
    return <div>Loading...</div>; // Handle loading or missing data gracefully
  }
  const toggleBodyModal = () => {
    setIsBodyModalOpen(!isBodyModalOpen);
  };

  const toggleUpdateBodyModal = () => {
    setIsUpdateBodyModalOpen(!isUpdateBodyModalOpen);
  };

  const toggleInfoModal = () => {
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  const toggleCheckupModal = () => {
    setIsCheckupModalOpen(!isCheckupModalOpen);
  };

  const toggleAddCheckupModal = () => {
    setIsCheckupAddOpen(!isCheckupAddOpen);
  };
  const {
    username,
    email,
    age,
    phoneNumber,
    homeAddress,
    workAddress,
    job,
    checkups,
  } = user;
  console.log(user);

  // const { userNotes, monthlyCheckup, specialMeals } = user.mealsSchedule;
  const {
    id: bodyInfoId,
    bodyType,
    height,
    weight,
    foodType,
    gymAddress,
    gymTime,
    diabetesNum,
  } = user.bodyInfo;

  const {
    id: bodyCheckupId,
    disease1,
    disease2,
    disease3,
    disease4,
    medicine1,
    medicine2,
    medicine3,
    medicine4,
  } = user.bodyCheckup;
  console.log(disease1);

  const mainData = {
    username,
    email,
    age,
    phoneNumber,
    homeAddress,
    workAddress,
    job,
  };
  const bodyData = {
    id: bodyInfoId,
    bodyType,
    weight,
    foodType,
    gymAddress,
    gymTime,
    height,
    diabetesNum,
  };
  const checkupData = {
    id: bodyCheckupId,
    disease1,
    disease2,
    disease3,
    disease4,
    medicine1,
    medicine2,
    medicine3,
    medicine4,
  };
  console.log(mainData);
  const diseases = [disease1, disease2, disease3, disease4];
  const medicines = [medicine1, medicine2, medicine3, medicine4];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col bg-[#e8f0f7] rounded-3xl p-10 mx-10 gap-10">
        <div className="w-full flex flex-row gap-5">
          {/* Right Column */}
          <div className="w-[66%] flex flex-col gap-5">
            <div className="flex flex-row gap-5">
              <div className="w-[50%] rounded-3xl bg-[#fefefe] p-5 flex flex-col shadow-gray-300 shadow-sm gap-5">
                <div className="flex justify-between">
                  <p className="text-[#1769ae] font-bold text-center flex-1">
                    المعلومات الأساسية
                  </p>
                  <FaRegEdit
                    className="text-2xl text-[#1EA4A3] cursor-pointer text-right"
                    onClick={toggleInfoModal}
                  />

                  <MainInfoModal
                    isModalOpen={isInfoModalOpen}
                    onClose={toggleInfoModal}
                    data={mainData}
                    userId={userId}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">اسم المستخدم</p>
                  <p>{username || "غير معروف"}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">رقم الجوال</p>
                  <p>{phoneNumber || "غير معروف"}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">
                    البريد الإلكتروني
                  </p>
                  <p>{email || "غير معروف"}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">العمر</p>
                  <p>{age || "غير معروف"}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">عنوان المنزل</p>
                  <p>{homeAddress || "غير معروف"}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">عنوان العمل</p>
                  <p>{workAddress || "غير معروف"}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">الوظيفة</p>
                  <p>{job || "غير معروف"}</p>
                </div>
              </div>

              {/* Middle Column */}
              <div className="w-[50%] rounded-3xl bg-[#fefefe] p-5 flex flex-col shadow-gray-300 shadow-sm gap-5">
                <div className="flex justify-between gap-2">
                  <p className="text-[#1769ae] text-center flex-1 font-bold">
                    المعلومات الجسدية
                  </p>
                  <PiMagicWandLight
                    className="text-2xl text-[#1769AE] cursor-pointer text-left"
                    onClick={toggleUpdateBodyModal}
                  />
                  <UpdateBodyInfoModal
                    isModalOpen={isUpdateBodyModalOpen}
                    onClose={toggleUpdateBodyModal}
                    data={bodyData}
                    userId={userId}
                  />
                  <FaRegEdit
                    className="text-2xl text-[#1EA4A3] cursor-pointer text-left"
                    onClick={toggleBodyModal}
                  />
                  <BodyInfoModal
                    isModalOpen={isBodyModalOpen}
                    onClose={toggleBodyModal}
                    data={bodyData}
                    userId={userId}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">نوع الجسم</p>
                  <p>{bodyType || "غير معروف"}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">الوزن</p>
                  <p>{weight || "غير معروف"}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">السكر التراكمي</p>
                  <p>{diabetesNum || "غير معروف"}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">الطول</p>
                  <p>{height || "غير معروف"}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">نوع الغذاء</p>
                  <p>{foodType || "غير معروف"}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">عنوان النادي</p>
                  <p>{gymAddress || "غير معروف"}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#1769ae] font-medium">
                    الوقت المقرر للنادي
                  </p>
                  <p>{gymTime || "غير معروف"}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-5">
              <div className="rounded-3xl bg-[#fefefe] p-3 shadow-gray-300 shadow-sm">
                <p className="text-[#1769ae] font-bold">سجل صرف الأغذية</p>
                <FoodDispensingCalendar userId={userId} />
              </div>
              <div className="rounded-3xl bg-[#fefefe] p-3 shadow-gray-300 shadow-sm">
                <p className="text-[#1769ae] font-bold">سجل الحضور الشهري</p>
                <AttendanceCalendar userId={userId} />
              </div>
            </div>
          </div>

          {/* Left Column */}
          <div className="w-[33%] rounded-3xl bg-[#fefefe] p-3 flex flex-col shadow-gray-300 shadow-sm gap-5">
            <div className="flex justify-between gap-2">
              <p className="text-[#1769ae] font-bold text-center flex-1">
                الأمراض والتحاليل والأدوية
              </p>
              <PiMagicWandLight
                className="text-2xl text-[#1769AE] cursor-pointer text-right"
                onClick={toggleAddCheckupModal}
              />
              <AddCheckupModal
                onClose={toggleAddCheckupModal}
                isModalOpen={isCheckupAddOpen}
                userId={userId}
                onChange={handleCheckupsChange}
              />
              <FaRegEdit
                className="text-2xl text-[#1EA4A3] cursor-pointer text-right"
                onClick={toggleCheckupModal}
              />

              <CheckupInfoModal
                isModalOpen={isCheckupModalOpen}
                onClose={toggleCheckupModal}
                data={checkupData}
                userId={userId}
              />
            </div>

            {diseases.map((disease, index) => (
              <div key={index} className="flex justify-between items-center">
                <p className="text-[#1769ae] font-medium">
                  مرض مزمن {index + 1}
                </p>
                <p>{disease || "غير متوفر"}</p>
              </div>
            ))}

            {medicines.map((medicine, index) => (
              <div key={index} className="flex justify-between items-center">
                <p className="text-[#1769ae] font-medium">دواء {index + 1}</p>
                <p>{medicine || "غير متوفر"}</p>
              </div>
            ))}

            {/* Checkups */}
            <CheckupsList
              checkups={checkups}
              handleChange={handleCheckupsChange}
            />
          </div>
        </div>

        {/* Charts */}
        <div className="flex flex-row items-center justify-between gap-12 bg-[#e8f0f7] rounded-3xl">
          <div className="w-[50%] h-[350px] rounded-3xl bg-[#fefefe] py-7 flex flex-col items-center justify-center shadow-gray-300 shadow-sm">
            <p className="text-[#1769ae] font-medium">التغيير في الوزن</p>
            <UserWeightChart userId={userId} />
          </div>
          <div className="w-[50%] h-[350px] rounded-3xl bg-[#fefefe] py-7 flex flex-col items-center justify-center shadow-gray-300 shadow-sm">
            <p className="text-[#1769ae] font-medium">السكر التراكمي</p>
            <DiabetesChart userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
}
