import axios from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useMemo } from "react";
import * as yup from "yup";
import { customToast } from "../../Utils/toast";

const MainInfoModal = ({ onClose, isModalOpen, data, userId }) => {
  console.log(data);
  const backendUrl = process.env.REACT_APP_API_URL;

  const initialEditValues = {
    username: data.username || "",
    phoneNumber: data.phoneNumber || "",
    email: data.email || "",
    age: data.age || "",
    homeAddress: data.homeAddress || "",
    workAddress: data.workAddress || "",
    job: data.job || "",
  };
  const editSchema = yup.object().shape({
    username: yup
      .string()
      .min(2, "الاسم يجب أن يكون على الأقل من 2 حرف")
      .max(30, "الاسم يجب أن يكون على الأقل من 30 حرف"),
    email: yup.string().email("يرجى إدخال بريد إلكتروني صحيح"),
    phoneNumber: yup.string(),
    age: yup.string().matches(/^[0-9]+$/, "يرجى إدخال رقم صحيح"),
    homeAddress: yup.string(),
    workAddress: yup.string(),
    job: yup.string().min(2, "").max(30, ""),
  });

  if (!isModalOpen) return null;
  const verification = async (values) => {
    try {
      console.log(values);
      const response = await axios.patch(
        `${backendUrl}/user/update/user/${userId}`,
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
            <h2 className="text-2xl font-bold">المعلومات الأساسية</h2>
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
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold text-[#1EA4A3] text-right">
                          الاسم
                        </label>
                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.username}
                          name="username"
                          className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                          placeholder="الاسم"
                        />

                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold text-[#1EA4A3] text-right">
                          رقم الجوال
                        </label>
                        <input
                          type="phoneNumber"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.phoneNumber}
                          name="phoneNumber"
                          className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                          placeholder="رقم الجوال"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold text-[#1EA4A3] text-right">
                          البريد الإلكتروني
                        </label>
                        <input
                          type="email"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.email}
                          name="email"
                          className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                          placeholder="البريد الإلكتروني"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold text-[#1EA4A3] text-right">
                          العمر
                        </label>
                        <input
                          type="number"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.age}
                          name="age"
                          className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          placeholder="العمر"
                        />
                        <ErrorMessage
                          name="age"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold text-[#1EA4A3] text-right">
                          عنوان المنزل
                        </label>
                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.homeAddress}
                          name="homeAddress"
                          className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                          placeholder="عنوان المنزل"
                        />
                        <ErrorMessage
                          name="homeAddress"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold text-[#1EA4A3] text-right">
                          عنوان العمل
                        </label>
                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.workAddress}
                          name="workAddress"
                          className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                          placeholder="عنوان العمل"
                        />

                        <ErrorMessage
                          name="workAddress"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold text-[#1EA4A3] text-right">
                          الوظيفة
                        </label>
                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.job}
                          name="job"
                          className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                          placeholder="الوظيفة"
                        />

                        <ErrorMessage
                          name="job"
                          component="div"
                          className="text-xs text-red-500 text-right"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
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

export default MainInfoModal;
