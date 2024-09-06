import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { customToast } from "../../Utils/toast";
import { toast } from "react-toastify";
import handWriting from "../../assets/loginRaeshag.png";
import loginPic from "../../assets/login.png";
import bgVector from "../../assets/bgVector.svg";
import { GrGallery } from "react-icons/gr";

export default function LastUserInfo() {
  const backendUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const userInfoSchema = yup.object().shape({
    weight: yup.string().required("required"),
  });

  const initialValuesUserInfo = {
    disease1: "",
    disease2: "",
    disease3: "",
    disease4: "",
    medicine1: "",
    medicine2: "",
    medicine3: "",
    medicine4: "",
    checkupName: "",
    checkupDate: "",
    checkupDescription: "",
    checkupPercentage: "",
    checkupAverage: "",
  };

  const verification = async (values) => {};
  return (
    <div className="flex h-screen">
      <div className="w-2/5 flex flex-col justify-center items-center py-[113px] pl-[38px]">
        <img src={handWriting} className="w-[35%]" alt="" />
        <div
          className="w-full h-full bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${loginPic})` }}
        ></div>
        <h1 className="text-center text-[#1769AE] text-5xl font-bold mt-5">
          تمتع بصحة أفضل مع رِشاق
        </h1>
      </div>
      <div
        className="w-3/5 flex flex-col justify-center items-center pl-20 pr-10"
        style={{ backgroundImage: `url(${bgVector})` }}
      >
        <div className="flex flex-col justify-center w-[60%]">
          <div className="flex flex-col justify-center items-center gap-5 px-16 py-5 bg-[#FAFAFA]">
            <div className="w-full flex flex-row justify-center items-center mt-5">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2.5 rounded-full w-[100%]"></div>
              </div>
              <p className="text-blue-600">3/3</p>
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
                  <div className="flex flex-row gap-5">
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.weight}
                      name="weight"
                      className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="مرض مزمن"
                    />

                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.weight}
                      name="weight"
                      className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="مرض مزمن"
                    />
                  </div>

                  <div className="flex flex-row gap-5">
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.weight}
                      name="weight"
                      className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="مرض مزمن"
                    />
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.weight}
                      name="weight"
                      className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="مرض مزمن"
                    />
                  </div>

                  <div className="flex flex-row gap-5">
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.weight}
                      name="weight"
                      className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="دواء 2"
                    />
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.weight}
                      name="weight"
                      className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="دواء 1"
                    />
                  </div>

                  <div className="flex flex-row gap-5">
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.weight}
                      name="weight"
                      className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="دواء 4"
                    />
                    <input
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.weight}
                      name="weight"
                      className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="دواء 3"
                    />
                  </div>
                  <div class="rounded-lg overflow-hidden shadow-lg p-3 w-full bg-white">
                    <div class="rounded-lg overflow-hidden shadow-lg p-3 bg-white">
                      <div className="flex flex-row justify-between gap-52 my-5">
                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.weight}
                          name="weight"
                          className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
                          placeholder="سنة/شهر/يوم"
                        />

                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.weight}
                          name="weight"
                          className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
                          placeholder="اسم التحليل"
                        />
                      </div>
                      <div className="flex flex-row gap-2 mb-5">
                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.weight}
                          name="weight"
                          className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
                          placeholder="المتوسط"
                        />

                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.weight}
                          name="weight"
                          className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
                          placeholder="النسبة"
                        />
                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.weight}
                          name="weight"
                          className="w-full px-[7px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
                          placeholder="تفاصيل عن التحليل"
                        />
                      </div>

                      <div className="flex flex-row gap-5 mb-6">
                        <input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.weight}
                          name="weight"
                          className="w-full px-[20px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
                          placeholder="تفاصيل عن التحليل"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-[100%] h-[50px] rounded-lg bg-[#1769AE] text-white text-sm font-bold"
                      >
                        <p className="flex flex-row gap-2 items-center justify-center">
                          <GrGallery className="w-[20px] h-[20px] text-white" />
                          ارفاق صورة التحليل
                        </p>
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="w-[100%] h-[50px] rounded-lg bg-[#fffff] text-[#1769AE] text-sm font-bold border border-[#1769AE] border-solid mt-5"
                    >
                      اضافة تحليل اخر
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-[100%] h-[50px] rounded-lg bg-[#1769AE] text-white text-sm font-bold border border-[#1769AE] border-solid mt-5"
                  >
                    التالي
                  </button>
                  <p className="text-[#22222299] my-5 text-sm">
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
