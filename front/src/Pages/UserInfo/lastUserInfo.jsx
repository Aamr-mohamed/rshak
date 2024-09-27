import React, { useState } from "react";
import { Form, Formik, FieldArray } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GrGallery } from "react-icons/gr";
import handWriting from "../../assets/loginRaeshag.png";
import loginPic from "../../assets/login.png";
import bgVector from "../../assets/bgVector.svg";

export default function LastUserInfo() {
	const backendUrl = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();

	const userInfoSchema = yup.object().shape({
		weight: yup.string().required("required"),
		checkups: yup.array().of(
			yup.object().shape({
				checkupName: yup.string().required("Required"),
				checkupDate: yup.string().required("Required"),
				checkupPercentage: yup.string().required("Required"),
				checkupAverage: yup.string().required("Required"),
				checkupDescription: yup.string().required("Required"),
				checkupDescription2: yup.string().required("Required"),
			})
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
			},
		],
	};

	const verification = async (values) => {
		try {
			// Make an API call to submit the data
			await axios.post(`${backendUrl}/submit`, values);
			// Navigate to the next page after successful submission
			navigate("/next-page");
		} catch (error) {
			console.error("There was an error submitting the form!", error);
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
								verification(values);
							}}
						>
							{({ values, handleChange, handleBlur }) => (
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
										<input
											type="text"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.disease2}
											name="disease2"
											className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
											placeholder="مرض مزمن"
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
										<input
											type="text"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.disease4}
											name="disease4"
											className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
											placeholder="مرض مزمن"
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
										<input
											type="text"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.medicine2}
											name="medicine2"
											className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
											placeholder="دواء 2"
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
										<input
											type="text"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.medicine4}
											name="medicine4"
											className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
											placeholder="دواء 4"
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
															<div className="flex flex-row justify-between gap-24 my-5">
																<input
																	type="text"
																	onChange={handleChange}
																	onBlur={handleBlur}
																	value={values.checkups[index].checkupDate}
																	name={`checkups[${index}].checkupDate`}
																	className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
																	placeholder="سنة/شهر/يوم"
																/>

																<input
																	type="text"
																	onChange={handleChange}
																	onBlur={handleBlur}
																	value={values.checkups[index].checkupName}
																	name={`checkups[${index}].checkupName`}
																	className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
																	placeholder="اسم التحليل"
																/>
															</div>

															<div className="flex flex-row gap-5 mb-3">
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
															</div>

															<div className="flex flex-row gap-5">
																<input
																	type="text"
																	onChange={handleChange}
																	onBlur={handleBlur}
																	value={values.checkups[index].checkupPercentage}
																	name={`checkups[${index}].checkupPercentage`}
																	className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
																	placeholder="النسبة المئوية"
																/>

																<input
																	type="text"
																	onChange={handleChange}
																	onBlur={handleBlur}
																	value={values.checkups[index].checkupAverage}
																	name={`checkups[${index}].checkupAverage`}
																	className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
																	placeholder="المتوسط"
																/>
															</div>

															<div class="my-5">
																<button
																	type="button"
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

