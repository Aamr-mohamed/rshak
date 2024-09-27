import React from 'react';
import logo from '../../assets/loginRaeshag.png';
import { FaGear } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { PiUserListFill } from "react-icons/pi";

export default function Navbar() {
	const user = JSON.parse(localStorage.getItem('user'));
	return (
		<nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
			<div className="hidden w-full md:flex md:w-auto gap-6" id="navbar-default">
				<button>
					<ImExit className='h-5 w-5 text-[#1ea4a3]' />
				</button>
				<button>
					<FaGear className='h-5 w-5 text-[#1ea4a3]' />
				</button>
				<button className='bg-[#1ea4a3] p-2 rounded-lg text-white'>
					اضافه مستخدم اخر
				</button>
				<button className='bg-[#1769ae] p-2 rounded-lg text-white flex items-center gap-2'>
					<PiUserListFill className='h-5 w-5' />
					معلومات المستخدم
				</button>
			</div>
			<a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
				<img src={logo} className="h-20" alt="rshak logo" />
			</a>
		</nav>
	);
}										
