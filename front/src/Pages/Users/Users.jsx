import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/navbar";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { customToast } from "../../Utils/toast";

export default function Users() {
  // will make an api call to get all users
  const backendUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isUsersChanged, setIsUsersChanged] = useState(false);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${backendUrl}/user/delete/${id}`);
      customToast("success", "تم حذف المستخدم بنجاح");
      setIsUsersChanged(!isUsersChanged);
    } catch (error) {
      customToast("error", "حدث خطأ ما أثناء حذف المستخدم");
    }
  };
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/getusers`);
        console.log(response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, [isUsersChanged]);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col bg-gradient-to-bl from-[#eaf1f7] to-[#bfd7e8] rounded-3xl mx-10 gap-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-black">
            <thead className="text-xs text-black uppercase">
              <tr className="text-gray-700 bg-white border border-gray-200 rounded-3xl">
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  الاسم
                </th>
                <th scope="col" className="px-6 py-3">
                  البريد الالكتروني
                </th>
                <th scope="col" className="px-6 py-3">
                  رقم الجوال
                </th>
                <th scope="col" className="px-6 py-3">
                  الخيارات
                </th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id} className="bg-transparent border-b">
                    <td
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => navigate(`/userdashboard?id=${user.id}`)}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => navigate(`/userdashboard?id=${user.id}`)}
                    >
                      {user.username || "غير متوفر"}
                    </td>
                    <td
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => navigate(`/userdashboard?id=${user.id}`)}
                    >
                      {user.email || "غير متوفر"}
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-black whitespace-nowrap"
                    >
                      {user.phoneNumber || "غير متوفر"}
                    </th>
                    <td className="px-6 py-4">
                      <button
                        className="ml-2 text-red-500 bg-[#f2d3d6] p-2 rounded-md hover:text-red-700"
                        onClick={() => deleteUser(user.id)}
                      >
                        <FaRegTrashAlt className="w-4 h-4" />
                      </button>
                      <button
                        className="ml-2 text-white bg-[#2d1566] p-2 rounded-md hover:text-[#160a33]"
                      onClick={() => navigate(`/userdashboard?id=${user.id}`)}
                      >
                        <FiEdit3 className="w-4 h-4" />
                      </button>
                      <button className="ml-2 text-white bg-[#1ea4a3] p-2 rounded-md hover:text-[#147170]">
                        <MdOutlineFileDownload className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border border-gray-200 rounded-3xl">
                  <td colSpan={5} className="text-center px-6 py-3">
                    لا يوجد مستخدمين حالياً
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
