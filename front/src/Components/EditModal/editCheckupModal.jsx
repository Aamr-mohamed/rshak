import { ErrorMessage, Form, Field, FieldArray, Formik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import CheckupModal from "../ImageModal/imageModal";
import { customToast } from "../../Utils/toast";
import axios from "axios";

const CheckupInfoModal = ({ onClose, isModalOpen, data, userId }) => {
  console.log(data);
  const backendUrl = process.env.REACT_APP_API_URL;

  // <FieldArray name="checkups">
  //   {({ remove, push }) => (
  //     <div>
  //       <h3 className="text-xl font-bold text-[#1EA4A3] text-right">
  //         التحليل
  //       </h3>
  //       {values.checkups.map((checkup, index) => (
  //         <div
  //           key={index}
  //           className="border p-4 rounded-lg mb-4"
  //         >
  //           <h4 className="font-semibold mb-2 text-right text-[#1EA4A3]">
  //             التحليل {index + 1}
  //           </h4>
  //           <div className="grid grid-cols-2 gap-4">
  //             <Field
  //               name={`checkups.${index}.checkupName`}
  //               placeholder="اسم التحليل"
  //               className="w-full px-4 py-2 rounded-lg border border-gray-300 text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
  //             />
  //             <Field
  //               name={`checkups.${index}.checkupDate`}
  //               placeholder="سنة/شهر/يوم"
  //               type="text"
  //               className="w-full px-4 py-2 rounded-lg border border-gray-300 text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
  //             />
  //             <Field
  //               name={`checkups.${index}.checkupPercentage`}
  //               placeholder="النسبة"
  //               className="w-full px-4 py-2 rounded-lg border border-gray-300 text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
  //             />
  //             <Field
  //               name={`checkups.${index}.checkupAverage`}
  //               placeholder="المتوسط"
  //               className="w-full px-4 py-2 rounded-lg border border-gray-300 text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
  //             />
  //             <Field
  //               name={`checkups.${index}.checkupDescription`}
  //               placeholder="تفاصيل عن التحليل"
  //               className="w-full px-4 py-2 rounded-lg border border-gray-300 text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
  //             />
  //             <Field
  //               name={`checkups.${index}.checkupDescription2`}
  //               placeholder="تفاصيل عن التحليل"
  //               className="w-full px-4 py-2 rounded-lg border border-gray-300 text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
  //             />
  //
  //           </div>
  //           <button
  //             type="button"
  //             className="text-[#1769AE] text-sm mt-2 border-[1.5px] rounded-lg border-[#1769AE] px-4 py-2"
  //             onClick={() => remove(index)}
  //           >
  //             ازاله التحليل
  //           </button>
  //         </div>
  //       ))}
  //       <button
  //         type="button"
  //         className="mt-2 px-4 py-2 h-[50px] rounded-lg bg-[#1769AE] text-white text-sm font-bold"
  //         onClick={() =>
  //           push({
  //             checkupName: "",
  //             checkupDate: "",
  //             checkupPercentage: "",
  //             checkupAverage: "",
  //             checkupDescription: "",
  //             checkupDescription2: "",
  //             checkupImageName: "",
  //           })
  //         }
  //       >
  //         اضافة تحليل اخر
  //       </button>
  //     </div>
  //   )}
  // </FieldArray>

  const initialEditValues = {
    disease1: data.disease1 || "",
    disease2: data.disease2 || "",
    disease3: data.disease3 || "",
    disease4: data.disease4 || "",
    medicine1: data.medicine1 || "",
    medicine2: data.medicine2 || "",
    medicine3: data.medicine3 || "",
    medicine4: data.medicine4 || "",
  };

  const editSchema = yup.object().shape({
    disease1: yup.string(),
    disease2: yup.string(),
    disease3: yup.string(),
    disease4: yup.string(),
    medicine1: yup.string(),
    medicine2: yup.string(),
    medicine3: yup.string(),
    medicine4: yup.string(),
  });

  const verification = async (values) => {
    console.log("Final Values:", values);

    values.id = data.id;
    try {
      const response = await axios.patch(
        `${backendUrl}/user/update/checkups/${userId}`,
        values,
      );
      customToast("success", "تم تعديل المعلومات بنجاح");
      onClose();
    } catch (error) {
      customToast("error", "حدث خطأ أثناء تعديل المعلومات");
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on component unmount
    };
  }, [isModalOpen]);
  if (!isModalOpen) return null;

  return (
    <div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={onClose}
        >
          <div
            className="bg-white p-5 rounded-lg relative max-w-screen-lg max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold">المعلومات الأساسية</h2>
            <div className="flex flex-col gap-5 p-12">
              <Formik
                initialValues={initialEditValues}
                validationSchema={editSchema}
                onSubmit={(values) => verification(values)}
              >
                {({ values, handleChange, handleBlur }) => (
                  <Form className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Static Fields */}
                      {["disease1", "disease2", "disease3", "disease4"].map(
                        (field) => (
                          <div key={field} className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-[#1EA4A3] text-right">
                              مرض مزمن{field[7]}
                            </label>
                            <Field
                              name={field}
                              type="text"
                              placeholder={`مرض مزمن ${field[7]}`}
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-right"
                            />
                            <ErrorMessage
                              name={field}
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>
                        ),
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {["medicine1", "medicine2", "medicine3", "medicine4"].map(
                        (field) => (
                          <div key={field} className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-[#1EA4A3] text-right">
                              دواء {field[8]}
                            </label>
                            <Field
                              name={field}
                              type="text"
                              placeholder={`دواء ${field[8]}`}
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-right"
                            />
                            <ErrorMessage
                              name={field}
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>
                        ),
                      )}
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

export default CheckupInfoModal;
