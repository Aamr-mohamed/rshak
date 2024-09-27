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
import { MdFastfood } from "react-icons/md";
import CalendarCard from "../../Components/Calender/calender";

export default function LastUserInfo() {
	const backendUrl = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();
	const userInfoSchema = yup.object().shape({
		weight: yup.string().required("required"),
	});

	const initialValuesUserInfo = {
		monthlyCheckup: "",
		monthkyMealsCheckup: "",
		weeklyCheckupTimes: "",
		specialMeals: "",
		userNotes: "",
	};

	const verification = async (values) => { };
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
				<div className="flex flex-col justify-center w-[50%]">
					<div className="flex flex-col justify-center items-center gap-5 px-7 py-4 bg-[#FAFAFA]">
						<h3 className="font-bold text-3xl leading-8 text-center text-[#1769AE]">
							يرجي تحديد التالي
						</h3>
						<Formik
							initialValues={initialValuesUserInfo}
							validationSchema={userInfoSchema}
							onSubmit={(values) => {
								console.log(values);
								verification(values);
							}}
						>
							{(props) => (
								<Form className="flex flex-col w-[100%]">
									<div className="mb-4">
										<CalendarCard />
									</div>
									<div className="mb-4">
										<CalendarCard />
									</div>

									<div className="flex flex-row gap-2 mb-3">
										<select
											dir="rtl"
											className="w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]"
											name="monthlyCheckup"
											id="monthlyCheckup"
											onChange={(e) => {
												props.handleChange("monthlyCheckup")(e);
											}}
											onBlur={props.handleBlur}
											value={props.values.monthlyCheckup}
										>
											<option value="" hidden defaultValue>
												مرات اسبوعياً
											</option>
											<option value="1">1 مرات اسبوعياً</option>
											<option value="2">2 مرات اسبوعياً</option>
											<option value="3">3 مرات اسبوعياً</option>
											<option value="4">4 مرات اسبوعياً</option>
											<option value="5">5 مرات اسبوعياً</option>
											<option value="6">6 مرات اسبوعياً</option>
											<option value="7">7 مرات اسبوعياً</option>
										</select>

										<div className="relative">
											<input
												type="text"
												onChange={props.handleChange}
												onBlur={props.handleBlur}
												value={props.values.specialMeals}
												name="specialMeals"
												className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
												placeholder="وجبات مخصصة"
											/>
											<MdFastfood className="w-[20px] h-[20px] text-[#1EA4A3] absolute left-2 top-3" />
										</div>
									</div>

									<textarea
										rows={4}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
										value={props.values.userNotes}
										name="userNotes"
										className="w-full px-[10px] py-[10px] rounded-md border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#2222224D]"
										placeholder="اضافه ملاحظات عن المستخدم"
									/>

									<button
										type="submit"
										className="w-[100%] h-[50px] rounded-lg bg-[#1769AE] text-white text-sm font-bold border border-[#1769AE] border-solid mt-5"
									>
										التالي
									</button>
									<p className="text-[#22222299] mt-2 text-sm">
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
