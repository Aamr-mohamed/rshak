import axios from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import * as yup from "yup";
import { customToast } from "../../Utils/toast";
import ImageDropdown from "../Dropdowns/dropdown";

const UpdateBodyInfoModal = ({ onClose, isModalOpen, data, userId }) => {
  console.log(data);
  const backendUrl = process.env.REACT_APP_API_URL;

  const { id, bodyType, height, weight, foodType, gymAddress, gymTime } = data;

  const initialEditValues = {
    bodyType: data.bodyType || "",
    weight: data.weight || "",
    foodType: data.foodType || "",
    gymAddress: data.gymAddress || "",
    gymTime: data.gymTime || "",
    height: data.height || "",
    diabetesNum: data.diabetesNum || "",
  };
  const editSchema = yup.object().shape({
    bodyType: yup.string().min(2, "").max(30, ""),
    weight: yup.string().matches(/^[0-9]+$/, "يرجى إدخال رقم صحيح"),
    foodType: yup.string().min(2, "").max(30, ""),
    gymAddress: yup.string(),
    gymTime: yup.string().min(2, "").max(30, ""),
    height: yup.string().matches(/^[0-9]+$/, "يرجى إدخال رقم صحيح"),
    diabetesNum: yup.string().matches(/^[0-9]+$/, "يرجى إدخال رقم صحيح"),
  });

  if (!isModalOpen) return null;
  const verification = async (values) => {
    try {
      values.id = data.id;
      console.log(values);
      const response = await axios.post(
        `${backendUrl}/user/daily-update/bodyinfo/${userId}`,
        values,
      );
      customToast("success", "تم تعديل المعلومات بنجاح");
      onClose();
    } catch (error) {
      customToast("error", "حدث خطأ أثناء تعديل المعلومات");
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={onClose}
        >
          <div
            className="bg-white p-5 rounded-lg relative max-w-screen-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside modal
          >
            <h2 className="text-2xl font-bold">المعلومات الجسدية</h2>
            <div className="flex justify-center gap-16 mt-5"></div>
            <div className="flex flex-col gap-5 p-12">
              <Formik
                initialValues={initialEditValues}
                validationSchema={editSchema}
                onSubmit={(values) => {
                  console.log(values);
                  verification(values);
                }}
              >
                {(props) => (
                  <Form className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-[#1EA4A3] text-right">
                          شكل الجسم
                        </label>
                        <ImageDropdown
                          selectedOption={props.values.bodyType}
                          setSelectedOption={(value) => {
                            props.setFieldValue("bodyType", value);
                          }}
                        />
                        <ErrorMessage
                          name="bodyType"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-[#1EA4A3] text-right">
                          الوزن
                        </label>

                        <input
                          type="number"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.weight}
                          name="weight"
                          className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          placeholder=""
                        />
                        <ErrorMessage
                          name="weight"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-[#1EA4A3] text-right">
                          الطول
                        </label>
                        <input
                          type="number"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.height}
                          name="height"
                          className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          placeholder=""
                        />
                        <ErrorMessage
                          name="height"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-[#1EA4A3] text-right">
                          السكر التراكمي
                        </label>
                        <input
                          type="number"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.diabetesNum}
                          name="diabetesNum"
                          className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          placeholder=""
                        />
                        <ErrorMessage
                          name="diabetesNum"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-[#1EA4A3] text-right">
                          نوع الغذاء
                        </label>
                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.foodType}
                          name="foodType"
                          className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                          placeholder=""
                        />
                        <ErrorMessage
                          name="foodType"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-[#1EA4A3] text-right">
                          الوقت المقرر للنادي
                        </label>
                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.gymTime}
                          name="gymTime"
                          className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                          placeholder=""
                        />
                        <ErrorMessage
                          name="gymTime"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-[#1EA4A3] text-right">
                          عنوان النادي
                        </label>
                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.gymAddress}
                          name="gymAddress"
                          className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                          placeholder=""
                        />

                        <ErrorMessage
                          name="gymAddress"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center items-center w-full">
                      <button
                        type="submit"
                        className="w-[80%] h-[50px] rounded-lg bg-[#1769AE] text-white text-sm font-bold"
                      >
                        حفظ التعديلات
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            <button
              className="absolute top-2 left-2 text-black"
              onClick={onClose}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateBodyInfoModal;
