import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage for saved user token/info
  useEffect(() => {
    try{
    const storedUser = localStorage.getItem("user");
    // setUser(storedUser ? JSON.parse(storedUser) : null);
    if (storedUser && storedUser !== "undefined") {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      setUser(null);
    }
    }
    catch(err){
      console.error("Failed to parse user from localstorage:",err);
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
