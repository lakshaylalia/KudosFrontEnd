"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface SignUpFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
}

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignUpFormInputs) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        console.log("Fetching user...");

        const res = await axios.get("https://your-java-backend.com/user", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        console.log("User fetched:", res.data);
        setUser(res.data); // Corrected to set res.data directly
        localStorage.setItem("user", JSON.stringify(res.data)); // Store the whole data
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };

    fetchUser();
  }, []);


  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting to login...");
      console.log(email, password);

      const res = await axios.post(
        "https://kudos-backend-idtg.onrender.com/login",
        { username: email, password: password },
        { withCredentials: true }
      );

      console.log("Login successful:", res.data);

      const token = res.data.data;

      localStorage.setItem("token", token);
      setUser({ email });
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };


  const signup = async (data: SignUpFormInputs) => {
    try {
      const res = await axios.post(
        "https://kudos-backend-idtg.onrender.com/register",
        {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          username: data.email,
          signup: true,
        },
        { withCredentials: true }
      );

      setUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      router.push("/");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };


  const logout = async () => {
    try {
      await axios.post(
        "https://kudos-backend-idtg.onrender.com/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout failed", error);
    }

    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };


  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
