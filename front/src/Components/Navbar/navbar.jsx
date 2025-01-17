import React from "react";
import logo from "../../assets/loginRaeshag.png";
import { FaGear } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { PiUserListFill } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/AuthProvider";

export default function Navbar() {
  // const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const auth = useAuth();
  const specificPage = location.pathname === "/users";
  const navigate = useNavigate();
  return (
    <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} className="h-20" alt="rshak logo" />
      </a>
      <div
        className="hidden w-full md:flex md:w-auto gap-6"
        id="navbar-default"
      >
        {specificPage ? (
          <button
            className="bg-[#1769ae] p-2 rounded-lg text-white"
            onClick={() => navigate("/")}
          >
            الرسوم البيانية
          </button>
        ) : (
          <button
            className="bg-[#1769ae] p-2 rounded-lg text-white"
            onClick={() => navigate("/users")}
          >
            معلومات المستخدمين
          </button>
        )}
        <button
          className="bg-[#1ea4a3] p-2 rounded-lg text-white"
          onClick={() => navigate("/userInfo")}
        >
          اضافه مستخدم اخر
        </button>
        <button>
          <FaGear className="h-5 w-5 text-[#1ea4a3]" />
        </button>
        <button onClick={() => auth.logOut()}>
          <ImExit className="h-5 w-5 text-[#1ea4a3]" />
        </button>
      </div>
    </nav>
  );
}
