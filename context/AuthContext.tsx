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
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token || user) return;

      try {
        console.log("Fetching user...");
        const res = await axios.get("https://your-java-backend.com/user", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        console.log("User fetched:", res.data);
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };

    fetchUser();
  }, [user]);



  const login = async (email: string, password: string) => {
    if (user) return;

    try {
      console.log("Attempting to login...");

      const res = await axios.post(
        "https://9f27-2409-40d7-e2-5a06-81ba-b18c-dab7-e5e7.ngrok-free.app/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login successful:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);

      setTimeout(() => {
        router.push("/");
      }, 100);
    } catch (error) {
      console.error("Login failed", error);
    }
  };




  const signup = async (data: SignUpFormInputs) => {
    try {
      const res = await axios.post("https://9f27-2409-40d7-e2-5a06-81ba-b18c-dab7-e5e7.ngrok-free.app/register",
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

      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
