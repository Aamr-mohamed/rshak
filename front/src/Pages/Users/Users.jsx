import React from 'react';
import Navbar from '../../Components/Navbar/navbar';
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";

export default function Users() {
	return (
		<div>
			<Navbar />
			<div className='flex flex-col bg-gradient-to-bl from-[#eaf1f7] to-[#bfd7e8] rounded-3xl mx-10 gap-10'>
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left rtl:text-right text-black">
						<thead className="text-xs text-black uppercase">
							<tr className="text-gray-700 bg-white border border-gray-200 rounded-3xl">
								<th scope="col" className="px-6 py-3">
									الخيارات
								</th>
								<th scope="col" className="px-6 py-3">
									رقم الجوال
								</th>
								<th scope="col" className="px-6 py-3">
									البريد الالكتروني
								</th>
								<th scope="col" className="px-6 py-3">
									الاسم
								</th>
								<th scope="col" className="px-6 py-3">
									#
								</th>
							</tr>
						</thead>
						<tbody className='bg-transparent'>
							<tr className="border-b">
								<td className="px-6 py-4">
									<button className="ml-2 text-white bg-[#1ea4a3] p-2 rounded-md hover:text-[#147170]">
										<MdOutlineFileDownload className='w-4 h-4'/>
									</button>
									<button className="ml-2 text-white bg-[#2d1566] p-2 rounded-md hover:text-[#160a33]">
										<FiEdit3 className='w-4 h-4'/>
									</button>

									<button className="ml-2 text-red-500 bg-[#f2d3d6] p-2 rounded-md hover:text-red-700">
										<FaRegTrashAlt className='w-4 h-4'/>
									</button>
								</td>
								<th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
									01234567890
								</th>
								<td className="px-6 py-4">
									Silver
								</td>
								<td className="px-6 py-4">
									Laptop
								</td>
								<td className="px-6 py-4">
									1
								</td>
							</tr>
							<tr className=" border-b ">
								<td className="px-6 py-4 ">
									<button className="ml-2 text-white bg-[#1ea4a3] p-2 rounded-md hover:text-[#147170]">
										<MdOutlineFileDownload className='w-4 h-4'/>
									</button>
									<button className="ml-2 text-white bg-[#2d1566] p-2 rounded-md hover:text-[#160a33]">
										<FiEdit3 className='w-4 h-4'/>
									</button>

									<button className="ml-2 text-red-500 bg-[#f2d3d6] p-2 rounded-md hover:text-red-700">
										<FaRegTrashAlt className='w-4 h-4'/>
									</button>
								</td>
								<th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap ">
									Microsoft Surface Pro
								</th>
								<td className="px-6 py-4">
									White
								</td>
								<td className="px-6 py-4">
									Laptop PC
								</td>
								<td className="px-6 py-4">
									2
								</td>
							</tr>
							<tr className=" ">
								<td className="px-6 py-4 ">
									<button className="ml-2 text-white bg-[#1ea4a3] p-2 rounded-md hover:text-[#147170]">
										<MdOutlineFileDownload className='w-4 h-4'/>
									</button>
									<button className="ml-2 text-white bg-[#2d1566] p-2 rounded-md hover:text-[#160a33]">
										<FiEdit3 className='w-4 h-4'/>
									</button>

									<button className="ml-2 text-red-500 bg-[#f2d3d6] p-2 rounded-md hover:text-red-700">
										<FaRegTrashAlt className='w-4 h-4'/>
									</button>
								</td>
								<th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap ">
									Magic Mouse 2
								</th>
								<td className="px-6 py-4">
									Black
								</td>
								<td className="px-6 py-4">
									Accessories
								</td>
								<td className="px-6 py-4">
									3
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
