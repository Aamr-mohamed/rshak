import { ErrorMessage, Form, Field, FieldArray, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import CheckupModal from "../ImageModal/imageModal";
import { customToast } from "../../Utils/toast";
import axios from "axios";
import { GrGallery } from "react-icons/gr";

const EditSingleCheckupModal = ({
  onClose,
  isModalOpen,
  userId,
  onChange,
  data,
}) => {
  const backendUrl = process.env.REACT_APP_API_URL;
  console.log("hennna tany", data);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const editSchema = yup.object().shape({
    checkupName: yup.string(),
    checkupDate: yup.string(),
    checkupPercentage: yup.string(),
    checkupAverage: yup.string(),
    checkupDescription: yup.string(),
    checkupDescription2: yup.string(),
  });

  const initialEditValues = {
    checkupName: data.checkupName || "",
    checkupDate: data.checkupDate || "",
    checkupPercentage: data.checkupPercentage || "",
    checkupAverage: data.checkupAverage || "",
    checkupDescription: data.checkupDescription || "",
    checkupDescription2: data.checkupDescription2 || "",
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Display selected image
      setSelectedFile(file);
    }
  };

  const verification = async (values) => {
    if (values.checkupImage) {
      values.checkupImageName = selectedFile.name;
    }
    console.log("values", values);

    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      // If there's a selected image, append it to the FormData
      if (selectedImage) {
        formData.append("checkupImage", selectedFile);
      }
      // if (selectedImage) { const file = fileInputRef.current.files[0];
      //   formData.append("checkupImage", file);
      // }

      const response = await axios.patch(
        `${backendUrl}/user/${userId}/checkups/edit/${data.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        customToast("success", "تم التحليل بنجاح");
        onChange();
        onClose();
      } else {
        customToast("error", "حدث خطأ ما أثناء التحليل");
      }
    } catch (error) {
      customToast("error", "حدث خطأ ما أثناء التحليل");
    }
  };

  const removeImage = () => {
    setSelectedImage(null); // Remove the selected image
    fileInputRef.current.value = null; // Reset the file input
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
            className="bg-white p-16 rounded-lg relative max-w-screen-lg max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#1EA4A3] text-right mb-3">
              التحليل
            </h3>
            <Formik
              initialValues={initialEditValues}
              validationSchema={editSchema}
              onSubmit={(values) => verification(values)}
            >
              {(props) => (
                <Form className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col">
                      <input
                        name="checkupName"
                        placeholder=""
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.checkupName}
                        className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                      />
                      <ErrorMessage
                        name="checkupName"
                        component="div"
                        className="text-xs text-red-500 text-right"
                      />
                    </div>

                    <div className="flex flex-col">
                      <input
                        name="checkupDate"
                        placeholder="سنة/شهر/يوم"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.checkupDate}
                        type="date"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                      />
                      <ErrorMessage
                        name="checkupDate"
                        component="div"
                        className="text-xs text-red-500 text-right"
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        name="checkupPercentage"
                        placeholder="النسبة"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.checkupPercentage}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                      />
                      <ErrorMessage
                        name="checkupPercentage"
                        component="div"
                        className="text-xs text-red-500 text-right"
                      />
                    </div>
                    <div className="flex flex-col text-right">
                      <input
                        name="checkupAverage"
                        placeholder="المتوسط"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.checkupAverage}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                      />
                      <ErrorMessage
                        name="checkupAverage"
                        component="div"
                        className="text-xs text-red-500 text-right"
                      />
                    </div>
                    <div className="flex flex-col text-right">
                      <input
                        name="checkupDescription"
                        placeholder="تفاصيل عن التحليل"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.checkupDescription}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                      />
                      <ErrorMessage
                        name="checkupDescription"
                        component="div"
                        className="text-xs text-red-500 text-right"
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        name="checkupDescription2"
                        placeholder="تفاصيل عن التحليل"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.checkupDescription2}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 text-right text-[#1EA4A3] placeholder-[#1EA4A3]"
                      />
                      <ErrorMessage
                        name="checkupDescription2"
                        component="div"
                        className="text-xs text-red-500 text-right"
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()} // Trigger the file input
                      className="w-[100%] py-4 px-4 rounded-lg bg-[#1769AE] text-white text-sm font-bold"
                    >
                      <p className="flex flex-row gap-2 items-center justify-center">
                        <GrGallery className="w-[20px] h-[20px] text-white" />
                        ارفاق صورة التحليل
                      </p>
                    </button>
                  </div>
                  {selectedImage && (
                    <div className="mt-4 w-[50%] relative">
                      <img
                        src={`${backendUrl}/uploads/${data.checkupImageName}`}
                        alt="Selected"
                        className="w-40 h-40 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage} // Remove the image
                        className="text-black text-md hover:underline text-right absolute top-2 right-2"
                      >
                        X
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="mt-2 px-4 py-3 rounded-lg bg-[#1769AE] text-white text-sm font-bold w-[50%]"
                    >
                      اضافة التحليل
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <button
              className="absolute top-2 left-2 text-black text-xl"
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
export default EditSingleCheckupModal;
