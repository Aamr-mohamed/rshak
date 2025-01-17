import axios from "axios";
import React, { useState } from "react";
import CheckupModal from "../ImageModal/imageModal";
import { customToast } from "../../Utils/toast";
import EditSingleCheckupModal from "../EditModal/editSingleCheckupModal";

const CheckupsList = ({ checkups, handleChange }) => {
  console.log("ana hennna", checkups);
  const backendUrl = process.env.REACT_APP_API_URL;
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isCheckupModalOpen, setIsCheckupModalOpen] = useState(false);

  const toggleCheckupModal = () => {
    setIsCheckupModalOpen(!isCheckupModalOpen);
  };

  const handleDelete = async (checkup) => {
    try {
      const deletedUser = await axios.delete(
        `${backendUrl}/user/${checkup.userId}/checkups/${checkup.id}`,
      );
      handleChange();

      customToast("success", "تم حذف التحليل بنجاح");
    } catch (error) {
      customToast("error", "حدث خطأ أثناء حذف التحليل");
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <div className="border-t border-gray-200 my-4"></div>
      {checkups?.length > 0 ? (
        checkups.map((checkup, index) => (
          <div key={index} className="flex flex-col gap-2 border-b pb-4">
            {/* Header with Arrow */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <p className="text-[#1769ae] font-medium">
                {checkup.checkupName || "تحليل غير معروف"} تحليل
              </p>
              <div className="flex items-center gap-2">
                <p className="text-[#1769ae] font-medium">
                  {checkup.checkupDate || "تاريخ غير متوفر"}
                </p>
                <span
                  className={`transform transition-transform ${expandedIndex === index ? "rotate-180" : "rotate-0"} text-gray-500`}
                >
                  ▼
                </span>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedIndex === index && (
              <>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-[#1769ae] font-medium">
                    {checkup.checkupPercentage || "غير معروف"}
                    {/* average percentage */}
                  </p>
                  <p className="text-[#1769ae] font-medium">
                    {/* checkup description */}
                    {checkup.checkupDescription || "غير معروف"}
                  </p>
                </div>
                <CheckupModal checkup={checkup} />

                <div className="flex justify-between items-center mt-2">
                  <button
                    className="w-[40%] rounded-lg border-[#1769AE] border-[1px] text-[#1769AE] text-sm font-bold p-2"
                    onClick={toggleCheckupModal}
                  >
                    تعديل التقرير
                  </button>
                  <EditSingleCheckupModal
                    onClose={toggleCheckupModal}
                    isModalOpen={isCheckupModalOpen}
                    userId={checkup.userId}
                    data={checkup}
                    onChange={handleChange}
                  />
                  <button
                    className="w-[40%] rounded-lg border-[#1769AE] border-[1px] text-[#1769AE] text-sm font-bold p-2 hover:bg-red-500 hover:text-white hover:border-none"
                    onClick={() => handleDelete(checkup)}
                  >
                    ازاله التحليل
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>لا توجد تحاليل مسجلة</p>
      )}
    </div>
  );
};

export default CheckupsList;
