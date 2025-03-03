"use client";
import SideBarComp from "@/components/SideBarComp";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { useState, useEffect } from "react";


export default function Home() {
  const getData = async () => {
    const data = await fetch('api'); //  Backend event card data api
    const arr = await data.json();
    setEventData(arr);
  }
  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="w-full h-screen flex">
      <SideBarComp />
      <div className="max-w-5xl mx-auto px-2 overflow-y-scroll">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}

export const projects = [
  {
    title: "Stripe",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
    status: "Active",
    date: "March 1, 2025",
    buttonText: "Visit Stripe",
  },
  {
    title: "Netflix",
    description: "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
    status: "Completed",
    date: "February 20, 2025",
    buttonText: "Explore Netflix",
  },
  {
    title: "Google",
    description: "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
    status: "Pending",
    date: "March 5, 2025",
    buttonText: "Go to Google",
  },
  {
    title: "Meta",
    description: "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
    status: "Active",
    date: "February 28, 2025",
    buttonText: "Check Meta",
  },
  {
    title: "Amazon",
    description: "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
    status: "Completed",
    date: "March 2, 2025",
    buttonText: "Shop on Amazon",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
    status: "Pending",
    date: "March 4, 2025",
    buttonText: "Visit Microsoft",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft2.com",
    status: "Pending",
    date: "March 4, 2025",
    buttonText: "Visit Microsoft",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft1.com",
    status: "Pending",
    date: "March 4, 2025",
    buttonText: "Visit Microsoft",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsof3t.com",
    status: "Pending",
    date: "March 4, 2025",
    buttonText: "Visit Microsoft",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://4.com",
    status: "Pending",
    date: "March 4, 2025",
    buttonText: "Visit Microsoft",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://mi4crosoft.com",
    status: "Pending",
    date: "March 4, 2025",
    buttonText: "Visit Microsoft",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://mic5rosoft.com",
    status: "Pending",
    date: "March 4, 2025",
    buttonText: "Visit Microsoft",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://micro5soft.com",
    status: "Pending",
    date: "March 4, 2025",
    buttonText: "Visit Microsoft",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://micros6oft.com",
    status: "Pending",
    date: "March 4, 2025",
    buttonText: "Visit Microsoft",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://1microsoft.com",
    status: "Pending",
    date: "March 4, 2025",
    buttonText: "Visit Microsoft",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://mi2crosoft.com",
    status: "Pending",
    date: "March 4, 2025",
    buttonText: "Visit Microsoft",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://micros5oft.com",
    status: "Pending",
    date: "March 4, 2025",
    buttonText: "Visit Microsoft",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://micr9osoft.com",
    status: "Pending",
    date: "March 4, 2025",
    buttonText: "Visit Microsoft",
  },
];
