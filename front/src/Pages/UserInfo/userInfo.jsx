import React, { useState, useEffect } from 'react';
import loginPic from '../../assets/login.png';
import bgVector from '../../assets/bgVector.svg';
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { customToast } from "../../Utils/toast";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function UserInfo() {

	const backendUrl = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();

	const userInfoSchema = yup.object().shape({
		username: yup.string().required("required"),
		email: yup.string().required("required").email("invalid email"),
		phoneNumber: yup.string(),
		age: yup.string().required("required"),
		homeAddress: yup.string(),
		workAddress: yup.string(),
		job: yup.string(),
	});

	const verification = async (values) => { }


	const initialValuesUserInfo = {
		username: "",
		email: "",
		phoneNumber: "",
		age: "",
		homeAddress: "",
		workAddress: "",
		job: "",
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
								<div className="bg-blue-600 h-2.5 rounded-full w-[40%]"></div>
							</div>
							<p className='text-blue-600'>1/3</p>
						</div>
						<div>
							<h3 className='font-bold text-3xl leading-8 text-center text-[#1769AE]'>يرجي ادخال البيانات التالية</h3>
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
									<input type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.username} name="username" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='اسم المستخدم' />
									<input type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.phoneNumber} name="phoneNumber" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='رقم الجوال' />
									<input type="email" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.email} name="email" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='البريد الالكتروني' />
									<input type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.age} name="age" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='العمر' />
									<input type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.homeAddress} name="homeAddress" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='عنوان المنزل' />
									<input type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.workAddress} name="workAddress" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='عنوان العمل' />
									<input type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.job} name="job" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right font-bold text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='الوظيفه' />

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
