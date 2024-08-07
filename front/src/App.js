import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/home';
import Login from './Pages/Login/login';
import UserInfo from './Pages/UserInfo/userInfo';
import SecUserInfo from './Pages/UserInfo/secUserInfo';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/userInfo" element={<UserInfo />} />
				<Route path="/contUserInfo" element={<SecUserInfo />} />

			</Routes>
		</div>
	);
}

export default App;
