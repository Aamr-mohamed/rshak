import React, { useRef } from "react";
import { Form, Formik, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { GrGallery } from "react-icons/gr";
import handWriting from "../../assets/loginRaeshag.png";
import loginPic from "../../assets/login.png";
import bgVector from "../../assets/bgVector.svg";
import { customToast } from "../../Utils/toast";

export default function LastUserInfo() {
  const backendUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const pastData = location.state;
  const fileInputRef = useRef(null);
  console.log(pastData);

  const userInfoSchema = yup.object().shape({
    disease1: yup.string(),
    disease2: yup.string(),
    disease3: yup.string(),
    disease4: yup.string(),
    checkups: yup.array().of(
      yup.object().shape({
        checkupName: yup.string().required("اسم التحليل مطلوب"),
        checkupDate: yup.string().required("تاريخ التحليل مطلوب"),
        checkupPercentage: yup.string().required("النسبة المئوية مطلوب"),
        checkupAverage: yup.string().required("المتوسط مطلوب"),
        checkupDescription: yup.string().required("وصف التحليل مطلوب"),
        checkupDescription2: yup.string().required("وصف التحليل 2 مطلوب"),
        checkupImageName: yup.string(),
      }),
    ),
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
    checkups: [
      {
        checkupName: "",
        checkupDate: "",
        checkupPercentage: "",
        checkupAverage: "",
        checkupDescription: "",
        checkupDescription2: "",
        checkupImageName: "",
      },
    ],
  };

  const transformAttendanceData = (selectedAttendanceDates) => {
    console.log(selectedAttendanceDates);

    if (
      !selectedAttendanceDates ||
      typeof selectedAttendanceDates !== "object"
    ) {
      console.error(
        "Invalid input: selectedAttendanceDates must be a valid object.",
      );
      return [];
    }
    return Object.entries(selectedAttendanceDates).map(([date, status]) => ({
      date,
      attendance: status === "attended",
    }));
  };

  const transformFoodData = (selectedFoodDates) => {
    console.log(selectedFoodDates);
    if (!selectedFoodDates || typeof selectedFoodDates !== "object") {
      console.error("Invalid input: selectedFoodDates must be a valid object.");
      return [];
    }
    return Object.entries(selectedFoodDates).map(([date, status]) => ({
      date,
      foodDispensing: status === "attended",
    }));
  };

  const verification = async (values) => {
    console.log(values);
    const attendanceDates = transformAttendanceData(
      pastData.selectedAttendaceDates,
    );
    const foodDates = transformFoodData(pastData.selectedFoodDates);
    values = { ...values, ...pastData };
    // Create a new FormData object
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "checkups" && values[key]) {
        // Serialize checkups data as JSON
        formData.append(
          key,
          JSON.stringify(
            values[key].map((checkup) => {
              // Avoid appending the file object itself in JSON
              const { checkupImageFile, ...checkupData } = checkup;
              return checkupData;
            }),
          ),
        );

        // Append each file for the checkups
        values[key].forEach((checkup, index) => {
          if (checkup.checkupImageFile) {
            formData.append(
              `checkups[${index}].checkupImageFile`,
              checkup.checkupImageFile,
            );
          }
        });
      } else {
        formData.append(key, values[key]); // Add other fields like user data
      }
    });

    // Add each value from the `values` object into FormData
    try {
      const res = await axios.post(`${backendUrl}/user/adduser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.status);
      if (res.status === 200) {
        console.log(res.data.result.id);
        try {
          const attend = await axios.patch(
            `${backendUrl}/user/update/attendance/${res.data.result.id}`,
            attendanceDates,
          );

          const food = await axios.patch(
            `${backendUrl}/user/update/fooddispensing/${res.data.result.id}`,
            foodDates,
          );
          console.log("attend", attend);
          console.log("food", food);
          customToast("success", "تم اضافة المستخدم بنجاح");
          navigate("/");
        } catch (error) {
          customToast("error", "حدث خطأ ما أثناء الإضافة");
        }
        // Navigate to the next page and pass formData as state
        customToast("success", "تم اضافة المستخدم بنجاح");
        // navigate("/users");
      } else {
        customToast("error", "حدث خطأ ما أثناء الإضافة");
      }
    } catch (error) {
      customToast("error", "حدث خطأ ما أثناء الإضافة");
    }
  };

  return (
    <div className="flex">
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
              {({ values, handleChange, handleBlur, setFieldValue }) => (
                <Form className="flex flex-col gap-5 w-[100%]">
                  {/* Display diseases input fields */}
                  <div className="flex flex-row gap-5">
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.disease1}
                      name="disease1"
                      className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="مرض مزمن"
                    />
                    <ErrorMessage
                      name="disease1"
                      component="div"
                      className="text-xs text-red-500 text-right"
                    />
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.disease2}
                      name="disease2"
                      className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="مرض مزمن"
                    />
                    <ErrorMessage
                      name="disease2"
                      component="div"
                      className="text-xs text-red-500 text-right"
                    />
                  </div>

                  <div className="flex flex-row gap-5">
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.disease3}
                      name="disease3"
                      className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="مرض مزمن"
                    />
                    <ErrorMessage
                      name="disease3"
                      component="div"
                      className="text-xs text-red-500 text-right"
                    />
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.disease4}
                      name="disease4"
                      className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="مرض مزمن"
                    />
                    <ErrorMessage
                      name="disease4"
                      component="div"
                      className="text-xs text-red-500 text-right"
                    />
                  </div>

                  {/* Display medicines input fields */}
                  <div className="flex flex-row gap-5">
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.medicine1}
                      name="medicine1"
                      className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="دواء 1"
                    />
                    <ErrorMessage
                      name="medicine1"
                      component="div"
                      className="text-xs text-red-500 text-right"
                    />
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.medicine2}
                      name="medicine2"
                      className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="دواء 2"
                    />
                    <ErrorMessage
                      name="medicine2"
                      component="div"
                      className="text-xs text-red-500 text-right"
                    />
                  </div>

                  <div className="flex flex-row gap-5">
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.medicine3}
                      name="medicine3"
                      className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="دواء 3"
                    />
                    <ErrorMessage
                      name="medicine3"
                      component="div"
                      className="text-xs text-red-500 text-right"
                    />
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.medicine4}
                      name="medicine4"
                      className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
                      placeholder="دواء 4"
                    />
                    <ErrorMessage
                      name="medicine4"
                      component="div"
                      className="text-xs text-red-500 text-right"
                    />
                  </div>

                  <FieldArray name="checkups">
                    {({ remove, push }) => (
                      <>
                        {values.checkups.map((_, index) => (
                          <div
                            key={index}
                            className="rounded-lg overflow-hidden shadow-lg p-3 w-full bg-white"
                          >
                            <div className="rounded-lg overflow-hidden shadow-lg p-3 bg-white">
                              <div className="flex flex-row justify-between gap-24 my-3">
                                <div>
                                  <input
                                    type="date"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.checkups[index].checkupDate}
                                    name={`checkups[${index}].checkupDate`}
                                    className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
                                    placeholder="سنة/شهر/يوم"
                                  />
                                  <ErrorMessage
                                    name={`checkups[${index}].checkupDate`}
                                    component="div"
                                    className="text-xs text-red-500 text-right"
                                  />
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.checkups[index].checkupName}
                                    name={`checkups[${index}].checkupName`}
                                    className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
                                    placeholder="اسم التحليل"
                                  />
                                  <ErrorMessage
                                    name={`checkups[${index}].checkupName`}
                                    component="div"
                                    className="text-xs text-red-500 text-right"
                                  />
                                </div>
                              </div>

                              <div className="flex flex-row gap-5 mb-3">
                                <div>
                                  <input
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={
                                      values.checkups[index].checkupDescription
                                    }
                                    name={`checkups[${index}].checkupDescription`}
                                    className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
                                    placeholder="وصف التحليل"
                                  />
                                  <ErrorMessage
                                    name={`checkups[${index}].checkupDescription`}
                                    component="div"
                                    className="text-xs text-red-500 text-right"
                                  />
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={
                                      values.checkups[index].checkupDescription2
                                    }
                                    name={`checkups[${index}].checkupDescription2`}
                                    className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
                                    placeholder="وصف التحليل 2"
                                  />
                                  <ErrorMessage
                                    name={`checkups[${index}].checkupDescription2`}
                                    component="div"
                                    className="text-xs text-red-500 text-right"
                                  />
                                </div>
                              </div>

                              <div className="flex flex-row gap-5">
                                <div>
                                  <input
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={
                                      values.checkups[index].checkupPercentage
                                    }
                                    name={`checkups[${index}].checkupPercentage`}
                                    className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
                                    placeholder="النسبة المئوية"
                                  />
                                  <ErrorMessage
                                    name={`checkups[${index}].checkupPercentage`}
                                    component="div"
                                    className="text-xs text-red-500 text-right"
                                  />
                                </div>

                                <div>
                                  <input
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={
                                      values.checkups[index].checkupAverage
                                    }
                                    name={`checkups[${index}].checkupAverage`}
                                    className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
                                    placeholder="المتوسط"
                                  />
                                  <ErrorMessage
                                    name={`checkups[${index}].checkupAverage`}
                                    component="div"
                                    className="text-xs text-red-500 text-right"
                                  />
                                </div>
                              </div>

                              <div class="my-5">
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  ref={fileInputRef}
                                  // onChange={(event) => {
                                  //   const file = event.target.files[0];
                                  //   if (file) {
                                  //     // Update the file and file name for this checkup
                                  //     setFieldValue(
                                  //       `checkups[${index}].checkupImageFile`,
                                  //       file, // Store the file for this checkup
                                  //     );
                                  //     setFieldValue(
                                  //       `checkups[${index}].checkupImageName`,
                                  //       file.name, // Store the file name for this checkup
                                  //     );
                                  onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                      // Update the file and file name for this checkup
                                      setFieldValue(
                                        `checkups[${index}].checkupImageFile`,
                                        file,
                                      );
                                      setFieldValue(
                                        `checkups[${index}].checkupImageName`,
                                        file.name,
                                      );
                                    }
                                  }}
                                  // setFieldValue("selectedFile", file);
                                  // const updatedCheckups = [
                                  //   ...values.checkups,
                                  // ];
                                  // updatedCheckups[index] = {
                                  //   ...updatedCheckups[index],
                                  //   checkupImageName: file.name, // Store the file name
                                  // };
                                  //
                                  // // Update the Formik values
                                  // setFieldValue(
                                  //   "checkups",
                                  //   updatedCheckups,
                                  // );
                                />
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current.click()} // Trigger the file input
                                  className="w-[100%] h-[50px] rounded-lg bg-[#1769AE] text-white text-sm font-bold"
                                >
                                  <p className="flex flex-row gap-2 items-center justify-center">
                                    <GrGallery className="w-[20px] h-[20px] text-white" />
                                    ارفاق صورة التحليل
                                  </p>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="w-full h-[50px] rounded-lg bg-red-600 text-white text-sm font-bold mt-2"
                                >
                                  ازاله التحليل
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            push({
                              checkupName: "",
                              checkupDate: "",
                              checkupPercentage: "",
                              checkupAverage: "",
                              checkupDescription: "",
                              checkupDescription2: "",
                              checkupImageName: "",
                              checkupImageFile: null,
                            })
                          }
                          className="w-full h-[50px] rounded-lg bg-[#1769AE] text-white text-sm font-bold mt-5"
                        >
                          اضافة تحليل اخر
                        </button>
                      </>
                    )}
                  </FieldArray>

                  <button
                    type="submit"
                    className="w-full h-[50px] rounded-lg bg-[#1769AE] text-white text-sm font-bold border border-[#1769AE] border-solid mt-5"
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
