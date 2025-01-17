import "./App.css";
import { Routes, Route, Router } from "react-router-dom";
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import UserInfo from "./Pages/UserInfo/userInfo";
import SecUserInfo from "./Pages/UserInfo/secUserInfo";
import LastUserInfo from "./Pages/UserInfo/lastUserInfo";
import CalenderUserInfo from "./Pages/UserInfo/calenderUserInfo";
import UserDashboard from "./Pages/UserDashboard/userDashboard";
import Users from "./Pages/Users/Users";
import PrivateRoute from "./Utils/PrivateRoute";
import AuthProvider from "./Utils/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/contUserInfo" element={<SecUserInfo />} />
            <Route path="/lastUserInfo" element={<LastUserInfo />} />
            <Route path="/calenderUserInfo" element={<CalenderUserInfo />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
