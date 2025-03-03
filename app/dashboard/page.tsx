"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import SideBarComp from "@/components/SideBarComp";

const Dashboard: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    router.push("/login");
  };


  return (
    <>
      <SideBarComp />
    </>
  );
};

export default Dashboard;
