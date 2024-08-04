import React from 'react';
import bgVector from '../../assets/bgVector.svg';
import loginPic from '../../assets/login.png';
import handWriting from '../../assets/loginRaeshag.png';

export default function Login() {
	return (
		<div className="flex h-screen">
			<div className='w-2/5 flex flex-col justify-center items-center py-[113px] pl-[38px]'>
				<div className='w-full h-full bg-contain bg-no-repeat bg-center' style={{ backgroundImage: `url(${loginPic})` }}></div>
			</div>
			<div className='w-3/5 flex flex-col justify-center items-center' style={{ backgroundImage: `url(${bgVector})` }}>
				<div className="w-[726px] h-[734px]">
					<img style={{ backgroundImage: `url(${handWriting})` }} className='w-[335px] h-[172px] px-[195px] bg-no-repeat' />
					<h1 className='font-bold text-5xl leading-8 text-center text-[#1769AE] py-[40px]'>تمتع بصحة أفضل مع رِشاق</h1>
					<div className="px-[88px] bg-white w-[550px] h-[452px]">
						<h1 className='font-bold text-2xl leading-8 text-[#1769AE]'>تسجيل الدخول</h1>
					</div>
				</div>
			</div>
		</div>
	);
}
