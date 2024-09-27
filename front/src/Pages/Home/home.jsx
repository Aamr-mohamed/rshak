import React from 'react';
import BarChart from '../../Components/BarChart/BarChart';
import CalendarCard from '../../Components/Calender/calender';
import DoughnutChart from '../../Components/DoughnutChart/DoughnutChart';
import DoughnutChartSlim from '../../Components/DoughnutChart/DoughnutChartSlim';
import LineChart from '../../Components/LineChart/LineChart';
import LineChartWithLabelsOnPointsNormal from '../../Components/LineChart/LineChartNormal';
import Navbar from '../../Components/Navbar/navbar';
import PieChart from '../../Components/PieChart/PieChart';

export default function Home() {
	return (
		<div className="w-full">
			<Navbar />
			<div className='flex flex-col bg-[#e8f0f7] rounded-3xl p-10 mx-10 gap-10'>
				<div className='flex flex-row items-center justify-center gap-10 rounded-3xl '>
					<div className='w-[50%] rounded-3xl bg-[#fefefe] p-3 flex flex-col items-center justify-center shadow-gray-300 shadow-sm'>
						<p className='text-[#1769ae] font-medium'>اعمار المستخدمين</p>
						<div className="bg-white w-[500px] h-[400px] flex justify-center items-center">
							<DoughnutChart />
						</div>
					</div>
					<div className='w-[50%] rounded-3xl bg-[#fefefe] p-3 flex flex-col items-center justify-center shadow-gray-300 shadow-sm'>
						<p className='text-[#1769ae] font-medium'>اوزان المستخدمين</p>
						<div className="bg-white w-[500px] h-[400px] flex justify-center items-center">
							<BarChart />
						</div>
					</div>
				</div>
				<div className='flex flex-row items-center justify-center gap-10 bg-[#e8f0f7] rounded-3xl'>
					<div className='w-[40%] h-[300px] rounded-3xl bg-[#fefefe] p-3 flex flex-col items-center justify-center shadow-gray-300 shadow-sm'>
						<p className='text-[#1769ae] font-medium'>التغيير في الوزن</p>
						<LineChart />
					</div>
					<div className='w-[29%] h-[300px] rounded-3xl bg-[#fefefe] p-3 flex flex-col items-center justify-center shadow-gray-300 shadow-sm'>
						<p className='text-[#1769ae] font-medium'>شكل الجسم</p>
						<DoughnutChartSlim />
					</div>
					<div className='w-[30%] h-[300px] rounded-3xl bg-[#fefefe] p-3 flex flex-col items-center justify-center shadow-gray-300 shadow-sm'>
						<p className='text-[#1769ae] font-medium'>سجل الحضور الشهري</p>
						<CalendarCard />
					</div>
				</div>

				<div className='flex flex-row items-center justify-center gap-10 bg-[#e8f0f7] rounded-3xl '>
					<div className='w-[39%] h-[350px] rounded-3xl bg-[#fefefe] p-3 flex flex-col items-center justify-center shadow-gray-300 shadow-sm'>
						<p className='text-[#1769ae] font-medium'>الامراض المشتركة</p>
						<DoughnutChartSlim />
					</div>
					<div className='w-[61%] h-[350px] rounded-3xl bg-[#fefefe] p-3 flex flex-col items-center justify-center shadow-gray-300 shadow-sm'>
						<p className='text-[#1769ae] font-medium'>الادوية المشتركة</p>
						<DoughnutChartSlim />
					</div>
				</div>

				<div className='flex flex-row items-center justify-start bg-[#e8f0f7] rounded-3xl '>
					<div className='w-[37%] h-[300px] rounded-3xl bg-[#fefefe] p-3 flex flex-col items-center justify-center shadow-gray-300 shadow-sm'>
						<p className='text-[#1769ae] font-medium'>السكر التراكمي</p>
						<LineChartWithLabelsOnPointsNormal />
					</div>
				</div>
			</div>
		</div>
	);
}
