import React, { useState, useEffect } from "react";
import loginPic from "../../assets/login.png";
import bgVector from "../../assets/bgVector.svg";
import { ErrorMessage, Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { customToast } from "../../Utils/toast";
import { toast } from "react-toastify";
import * as yup from "yup";
import handWriting from "../../assets/loginRaeshag.png";
import ImageDropdown from "../../Components/Dropdowns/dropdown";

export default function SecUserInfo() {
  const backendUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;
  console.log(formData);

  const userInfoSchema = yup.object().shape({
    bodyType: yup.string().required("النوع الجسم مطلوب"),
    weight: yup.number().required("الوزن مطلوب"),
    height: yup.number().required("الطول مطلوب"),
    foodType: yup.string(),
    gymTime: yup.string(),
    gymAddress: yup.string(),
    diabetesNum: yup.number().required("الرقم المطلوب"),
  });

  const verification = async (values) => {
    console.log(values);
    // values = formData + values
    values = { ...values, ...formData };
    navigate("/calenderuserinfo", { state: values });
  };

  const initialValuesUserInfo = {
    bodyType: "",
    weight: "",
    height: "",
    foodType: "",
    gymTime: "",
    gymAddress: "",
    diabetesNum: "",
  };
  return (
    <div className="flex h-screen">
      <div className="w-2/5 flex flex-col justify-center items-center py-[113px] pl-[38px]">
        <img src={handWriting} className="w-[35%]" alt="" />
        <div
          className="w-full h-full bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${loginPic})` }}
        ></div>
        <h1 className="text-center text-[#1769AE] text-5xl font-bold">
          تمتع بصحة أفضل مع رِشاق
        </h1>
      </div>
      <div
        className="w-3/5 flex flex-col justify-center items-center pl-20 pr-10"
        style={{ backgroundImage: `url(${bgVector})` }}
      >
        <div className="flex flex-col justify-center w-[60%]">
          <div className="bg-white flex flex-col justify-center items-center gap-5 px-20  py-5">
            <div className="w-full flex flex-row justify-center items-center mt-5">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2.5 rounded-full w-[70%]"></div>
              </div>
              <p className="text-blue-600">2/3</p>
            </div>
            <div>
              <h3 className="font-bold text-3xl leading-8 text-center text-[#1769AE]">
                يرجي استكمال البيانات
              </h3>
            </div>
            <Formik
              initialValues={initialValuesUserInfo}
              validationSchema={userInfoSchema}
              onSubmit={(values) => {
                console.log(values);
                verification(values);
              }}
            >
              {(props) => (
                <Form className="flex flex-col gap-5 w-[100%]">
                  <ImageDropdown
                    selectedOption={props.values.bodyType}
                    setSelectedOption={(value) => {
                      props.setFieldValue("bodyType", value);
                    }}
                  />{" "}
                  {/*
                  <select
                    dir="rtl"
                    className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                    name="bodyType"
                    id="bodyType"
                    onChange={(e) => {
                      props.handleChange("bodyType")(e);
                    }}
                    onBlur={props.handleBlur}
                    value={props.values.bodyType}
                  >
                    <option value="" hidden selected>
                      شكل الجسم
                    </option>
                    <option value="">
                      <div>
                        <img src={handWriting} className="w-[35%]" alt="" />
                      </div>
                    </option>
                    <option value="apple">تفاحه</option>
                    <option value="pearl">كمثري</option>
                    <option value="other">أخرى</option>
                  </select>
									*/}
                  <input
                    type="number"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.weight}
                    name="weight"
                    className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="الوزن"
                  />
                  <ErrorMessage
                    name="weight"
                    component="div"
                    className="text-xs text-red-500 text-right"
                  />
                  <input
                    type="number"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.height}
                    name="height"
                    className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="الطول"
                  />
                  <ErrorMessage
                    name="height"
                    component="div"
                    className="text-xs text-red-500 text-right"
                  />
                  <input
                    type="number"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.diabetesNum}
                    name="diabetesNum"
                    className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="الطول"
                  />
                  <ErrorMessage
                    name="diabetesNum"
                    component="div"
                    className="text-xs text-red-500 text-right"
                  />
                  <input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.foodType}
                    name="foodType"
                    className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                    placeholder="نوع الغذاء"
                  />
                  <ErrorMessage
                    name="foodType"
                    component="div"
                    className="text-xs text-red-500 text-right"
                  />
                  <input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.gymTime}
                    name="gymTime"
                    className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                    placeholder="الوقت المقرر للنادي"
                  />
                  <ErrorMessage
                    name="gymTime"
                    component="div"
                    className="text-xs text-red-500 text-right"
                  />
                  <input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.gymAddress}
                    name="gymAddress"
                    className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                    placeholder="عنوان النادي"
                  />
                  <ErrorMessage
                    name="gymAddress"
                    component="div"
                    className="text-xs text-red-500 text-right"
                  />
                  <button
                    type="submit"
                    className="w-[100%] h-[50px] rounded-lg bg-[#1769AE] text-white text-sm font-bold"
                  >
                    التالي
                  </button>
                  <p className="text-center text-[#1EA4A3] text-sm">
                    يمكنك ترك احد الحقول فارغة اذا لا تعلم اي من المتطلبات
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
