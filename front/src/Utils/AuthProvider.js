import axios from "axios";
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const res = await axios.post(`${backendUrl}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.data) {
        setUser(res.data);
        setToken(res.data.token);
        localStorage.setItem("site", res.data.token);
        navigate("/");
        return res.data;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
