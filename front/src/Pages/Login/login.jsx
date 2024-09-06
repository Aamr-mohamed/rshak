import React from 'react';
import bgVector from '../../assets/bgVector.svg';
import loginPic from '../../assets/login.png';
import handWriting from '../../assets/loginRaeshag.png';
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { customToast } from "../../Utils/toast";
import { toast } from "react-toastify";

export default function Login() {
	const backendUrl = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();

	const loginSchema = yup.object().shape({
		email: yup.string().email("invalid email").required("required"),
		password: yup.string().required("required"),
	});
	const verification = async (values) => {
		try {
			const loggedInResponse = await axios.post(`${backendUrl}/login`, values, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			const loggedIn = loggedInResponse.data;
			console.log(loggedIn);

			if (loggedIn.success === false) {
				customToast("error", loggedInResponse.message);
			} else {
				localStorage.setItem("user", JSON.stringify(loggedIn.user));
				customToast("success", "logged in successfully");
				toast.success("logged in successfully", {
					position: "top-right",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
					onClose: () => {
						navigate("/");
					},
				});
			}
		} catch (error) {
			if (error.response && error.response.data) {
				const errorData = error.response.data;
				if (typeof errorData === "object") {
					const messages = Object.values(errorData).flat().join(", ");
					customToast("error", `Error: ${messages}`);
				} else {
					customToast("error", "An error occurred. Please try again.");
				}
			} else {
				customToast("error", error.message);
			}
		}
	};

	const initialValuesLogin = {
		email: "",
		password: "",
	};
	return (
		<div className="flex h-screen">
			<div className='w-2/5 flex flex-col justify-center items-center py-[113px] pl-[38px]'>
				<div className='w-full h-full bg-contain bg-no-repeat bg-center' style={{ backgroundImage: `url(${loginPic})` }}></div>
			</div>
			<div className='w-3/5 flex flex-col justify-center items-center' style={{ backgroundImage: `url(${bgVector})` }}>
				<div className="w-[726px] h-[734px] flex flex-col justify-center items-center">
					<img src={handWriting} className="w-[30%]" alt="" />
					<h1 className='font-bold text-4xl leading-8 text-center text-[#1769AE] py-[40px]'>تمتع بصحة أفضل مع رِشاق</h1>
					<div className="w-[70%] px-[88px] bg-white mx-20 py-6 rounded-lg">
						<Formik
							initialValues={initialValuesLogin}
							validationSchema={loginSchema}
							onSubmit={(values) => {
								console.log(values);
								verification(values);
							}}
						>
							{(props) => (
								<Form className='flex flex-col gap-10'>
									<h1 className='font-bold text-2xl leading-8 text-[#1EA4A3]'>تسجيل الدخول</h1>
									<div className='relative w-[100%]'>
										<input type="email" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.email} name="email" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm font-bold text-right text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='البريد الإلكتروني' />
										<MdOutlineEmail className='absolute left-[5%] top-[50%] translate-y-[-50%] text-[#1EA4A3]' />
									</div>
									<div className='relative w-[100%]'>
										<input type="password" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.password} name="password" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right text-[#1EA4A3] font-bold placeholder-[#1EA4A3]' placeholder='كلمة المرور' />
										<input type="email" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.email} name="email" className='w-full px-[20px] py-[10px] rounded-lg border-[1.5px] border-[#1769AE] text-sm text-right text-[#1EA4A3] placeholder-[#1EA4A3]' placeholder='البريد الإلكتروني' />
										<MdOutlineEmail className='absolute left-[5%] top-[50%] translate-y-[-50%] text-[#1EA4A3]' />
									</div>
									<button type='submit' className='w-[100%] h-[50px] rounded-lg bg-[#1769AE] text-white text-sm font-bold'>تسجيل الدخول</button>
									<a href='/register' className='text-center text-[#1EA4A3] font-bold text-sm underline'>تسجيل الدخول عن طريق نفاذ</a>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
}
