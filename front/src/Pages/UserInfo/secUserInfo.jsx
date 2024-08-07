import React, { useState, useEffect } from 'react';
import loginPic from '../../assets/login.png';
import bgVector from '../../assets/bgVector.svg';
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { customToast } from "../../Utils/toast";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function SecUserInfo() {

	const backendUrl = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();

	const userInfoSchema = yup.object().shape({
		bodyType: yup.string().required("required"),
		weight: yup.string(),
		height: yup.string().required("required"),
		foodType: yup.string(),
		gymTime: yup.string(),
		gymAddress: yup.string(),
	});

	const verification = async (values) => { }


	const initialValuesUserInfo = {
		bodyType: "",
		weight: "",
		height: "",
		foodType: "",
		gymTime: "",
		gymAddress: "",
	};
	return (
		<div className="flex h-screen">
			<div className='w-2/5 flex flex-col justify-center items-center py-[113px] pl-[38px]'>
				<div className='w-full h-full bg-contain bg-no-repeat bg-center' style={{ backgroundImage: `url(${loginPic})` }}></div>
			</div>
			<div className='w-3/5 flex flex-col justify-center items-center pl-20 pr-10' style={{ backgroundImage: `url(${bgVector})` }}>
				<div className="flex flex-col justify-center w-[70%]">
					<div className='bg-white flex flex-col justify-center items-center gap-5 px-20  py-5'>
						<div className="w-full flex flex-row justify-center items-center mt-5">
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div className="bg-blue-600 h-2.5 rounded-full w-[70%]"></div>
							</div>
							<p className='text-blue-600'>2/3</p>
						</div>
						<div>
							<h3 className='font-bold text-3xl leading-8 text-center text-[#1769AE]'>يرجي استكمال البيانات</h3>
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
								<Form className='flex flex-col gap-5 w-[100%]'>
									<select dir='rtl' className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]' name="bodyType" id="bodyType"
										onChange={(e) => {
											props.handleChange("bodyType")(e);
										}}
										onBlur={props.handleBlur}
										value={props.values.bodyType}
									>
										<option value="" hidden selected>شكل الجسم</option>
										<option value="apple">تفاحه</option>
										<option value="pearl">كمثري</option>
										<option value="other">أخرى</option>
									</select>
									<input type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.weight} name="weight" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='الوزن' />
									<input type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.height} name="height" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='الطول' />
									<input type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.foodType} name="foodType" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='نوع الغذاء' />
									<input type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.gymTime} name="gymTime" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='الوقت المقرر للنادي' />
									<input type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.gymAddress} name="gymAddress" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='عنوان النادي' />

									<button type='submit' className='w-[100%] h-[50px] rounded-lg bg-[#1769AE] text-white text-sm font-bold'>التالي</button>
									<p className='text-center text-[#1EA4A3] text-sm'>يمكنك ترك احد الحقول فارغة اذا لا تعلم اي من المتطلبات</p>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
}
