import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/home';
import Login from './Pages/Login/login';
import UserInfo from './Pages/UserInfo/userInfo';
import SecUserInfo from './Pages/UserInfo/secUserInfo';
import LastUserInfo from './Pages/UserInfo/lastUserInfo';
import CalenderUserInfo from './Pages/UserInfo/calenderUserInfo';
import UserDashboard from './Pages/UserDashboard/UserDashboard';
import Users from './Pages/Users/Users';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/userDashboard" element={<UserDashboard />} />
				<Route path="/users" element={<Users />} />
				<Route path="/login" element={<Login />} />
				<Route path="/userInfo" element={<UserInfo />} />
				<Route path="/contUserInfo" element={<SecUserInfo />} />
				<Route path="/lastUserInfo" element={<LastUserInfo />} />
				<Route path="/calenderUserInfo" element={<CalenderUserInfo />} />

			</Routes>
		</div>
	);
}

export default App;
