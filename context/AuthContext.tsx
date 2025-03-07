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
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ email: "dummy@example.com" });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post("https://bcef-2409-40d7-e2-5a06-b1d1-e695-5425-a00d.ngrok-free.app/login", { email, password });
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const signup = async (data: SignUpFormInputs) => {
    try {
      const res = await axios.post("https://bcef-2409-40d7-e2-5a06-b1d1-e695-5425-a00d.ngrok-free.app/register", {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        username: data.email,
        signup: true,
      });

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
