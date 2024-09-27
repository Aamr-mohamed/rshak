import React, { useState, useEffect } from 'react';
import CalendarCard from '../../Components/Calender/calender';
import LineChartWithLabelsOnPoints from '../../Components/LineChart/LineChart';
import LineChartWithLabelsOnPointsNormal from '../../Components/LineChart/LineChartNormal';
import Navbar from '../../Components/Navbar/navbar';

export default function UserDashboard() {
	return (
		<div>
			<Navbar />
			<div className='flex flex-col bg-[#e8f0f7] rounded-3xl p-10 mx-10 gap-10'>
				<div className="w-full flex flex-row gap-5">
					<div className='w-[30%] rounded-3xl bg-[#fefefe] p-3 flex flex-col shadow-gray-300 shadow-sm gap-5'>
						<div className='flex flex-row items-center justify-center'>
							<p className='text-[#1769ae] font-medium'>الامراض والتحليل و الادوية</p>
						</div>
						<div className="flex justify-between items-center">
							<p>الضغط</p>
							<p className='text-[#1769ae] font-medium'>مرض مزمن 1</p>
						</div>

						<div className="flex justify-between items-center">
							<p>السكري</p>
							<p className='text-[#1769ae] font-medium'>مرض مزمن 2</p>
						</div>

						<div className="flex justify-between items-center">
							<p>الكوليسترول</p>
							<p className='text-[#1769ae] font-medium'>مرض مزمن 3</p>
						</div>

						<div className="flex justify-between items-center">
							<p>كونكور</p>
							<p className='text-[#1769ae] font-medium'>دواء 1</p>
						</div>

						<div className="flex justify-between items-center">
							<p>شوجر +</p>
							<p className='text-[#1769ae] font-medium'>دواء 2</p>
						</div>

						<div className="flex justify-between items-center">
							<p>جيستكول</p>
							<p className='text-[#1769ae] font-medium'>دواء 3</p>
						</div>
						<div className="border-t border-gray-200 my-4"></div>
						<div className="rounded-3xl bg-[#fefefe] p-3 shadow-gray-300 shadow-sm">
							{/* For each ta7aleel in the ta7aleel array, render a div with the ta7aleel's name and its value */}
							<div className='flex justify-between items-center '>
								<p className='text-[#1769ae] font-medium'>29/2/2024</p>
								<p className='text-[#1769ae] font-medium'>تحليل الحديد</p>
							</div>

							<div className='flex justify-between items-center '>
								<p className='text-[#1769ae] font-medium'>13-17</p>
								<p className='text-[#1769ae] font-medium'>نسبة الحديد في الدم</p>
							</div>
							<div className='flex flex-col justify-center items-center '>
								<img src="https://i.ibb.co/4b2r0r3/image.png" alt="image" />
								<p>image of the ta7aleel</p>
							</div>
							<p>extra ta7aleel if found</p>
						</div>
					</div>
					<div className='w-[30%] flex flex-col gap-5'>
						<div className=" rounded-3xl bg-[#fefefe] p-5 flex flex-col shadow-gray-300 shadow-sm gap-5">
							<div className='flex flex-row items-center justify-center'>
								<p className='text-[#1769ae] font-medium'>المعلومات الجسدية</p>
							</div>
							<div className="flex justify-between items-center">
								<p>الضغط</p>
								<p className='text-[#1769ae] font-medium'>شكل الجسم</p>
							</div>

							<div className="flex justify-between items-center">
								<p>السكري</p>
								<p className='text-[#1769ae] font-medium'>الوزن</p>
							</div>

							<div className="flex justify-between items-center">
								<p>الكوليسترول</p>
								<p className='text-[#1769ae] font-medium'>الطول</p>
							</div>

							<div className="flex justify-between items-center">
								<p>كونكور</p>
								<p className='text-[#1769ae] font-medium'>نوع الغذاء</p>
							</div>

							<div className="flex justify-between items-center">
								<p>شوجر +</p>
								<p className='text-[#1769ae] font-medium'>الوقت المقرر للنادي</p>
							</div>

							<div className="flex justify-between items-center">
								<p>جيستكول</p>
								<p className='text-[#1769ae] font-medium'>عنوان النادي</p>
							</div>
						</div>
						<div className="h-[350px] rounded-3xl bg-[#fefefe] p-3 shadow-gray-300 shadow-sm">
							<p className='text-[#1769ae] font-medium'>سجل الحضور الشهري</p>
							<CalendarCard />
						</div>
					</div>

					<div className='w-[30%] flex flex-col gap-5'>
						<div className=" rounded-3xl bg-[#fefefe] p-5 flex flex-col shadow-gray-300 shadow-sm gap-5">
							<div className='flex flex-row items-center justify-center'>
								<p className='text-[#1769ae] font-medium'>المعلومات الاساسية</p>
							</div>
							<div className="flex justify-between items-center">
								<p>الضغط</p>
								<p className='text-[#1769ae] font-medium'>اسم الامستخدم</p>
							</div>

							<div className="flex justify-between items-center">
								<p>السكري</p>
								<p className='text-[#1769ae] font-medium'>رقم الجوال</p>
							</div>

							<div className="flex justify-between items-center">
								<p>الكوليسترول</p>
								<p className='text-[#1769ae] font-medium'>البريد الالكتروني</p>
							</div>

							<div className="flex justify-between items-center">
								<p>كونكور</p>
								<p className='text-[#1769ae] font-medium'>العمر</p>
							</div>

							<div className="flex justify-between items-center">
								<p>شوجر +</p>
								<p className='text-[#1769ae] font-medium'>عنوان المنزل</p>
							</div>

							<div className="flex justify-between items-center">
								<p>جيستكول</p>
								<p className='text-[#1769ae] font-medium'>عنوان العمل</p>
							</div>
							<div className="flex justify-between items-center">
								<p>جيستكول</p>
								<p className='text-[#1769ae] font-medium'>الوظيفة</p>
							</div>
						</div>
						<div className="h-[350px] rounded-3xl bg-[#fefefe] p-3 shadow-gray-300 shadow-sm">
							<p className='text-[#1769ae] font-medium'>سجل صرف الاغذية</p>
							<CalendarCard />
						</div>
					</div>
				</div>
				<div className='flex flex-row gap-5'>
					<div className='w-[50%] rounded-3xl bg-[#fefefe] p-3 flex flex-col shadow-gray-300 shadow-sm gap-5'>
							<p className='text-[#1769ae] font-medium'>التغيير في الوزن</p>
							<LineChartWithLabelsOnPoints />
					</div>
					<div className='w-[50%] rounded-3xl bg-[#fefefe] p-3 flex flex-col shadow-gray-300 shadow-sm gap-5'>
							<p className='text-[#1769ae] font-medium'>السكر التراكمي</p>
							<LineChartWithLabelsOnPointsNormal />
					</div>
				</div>
			</div>
		</div>
	);
}
