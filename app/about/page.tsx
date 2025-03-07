"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SideBarComp from "@/components/SideBarComp";

const teamMembers = [
  { name: "Akshit Dogra", role: "Backend Developer", image: "/akshit.jpg" },
  { name: "Aryan Chaudhary", role: "Backend Developer", image: "/aryan.jpg" },
  { name: "Ayush Sharma", role: "Designer & Frontend Developer", image: "/ayush.jpg" },
  { name: "Lakshay Lalia", role: "Frontend Developer", image: "/lakshay.jpg" },
];

const Values = [
  { name: "Integrity", description: " Honest work, no shortcuts." },
  { name: "Innovation", description: "Evolving, not just adapting." },
  { name: "Collaboration", description: "Win together, grow together." },
  { name: "Excellence", description: "Aim high, stay humble." },
];

const AboutPage: React.FC = () => {
  return (
    <section className="w-full h-screen flex">
      <SideBarComp />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full min-h-screen flex flex-col items-center justify-start bg-gray-100 text-gray-900 px-8 py-16 relative overflow-y-scroll"
      >
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-24 h-24 bg-gray-300 opacity-10 rounded-full"
              animate={{ y: [0, 20, 0], x: [0, -20, 20] }}
              transition={{ duration: 8, repeat: Infinity, delay: i * 1.5 }}
              style={{ top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` }}
            />
          ))}
        </motion.div>

        {/* About Section */}
        <section className="max-w-5xl w-full text-center relative z-10">
          <h1 className="text-5xl font-extrabold mb-6 text-gray-900">About Kudos</h1>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-gray-900">Kudos</span> is an integrated platform designed to streamline professional event management within organizations.
            We enable employees to track attended events, manage Jira tickets, monitor analytics, and redeem earned points in an exclusive rewards store.
            Our goal is to enhance workplace engagement, productivity, and recognition through a seamless and efficient system.
          </p>
        </section>

        {/* Our Values */}
        <section className="max-w-5xl w-full mt-12 space-y-10 relative z-10">
          <h2 className="text-4xl font-semibold text-center mb-6 text-gray-900">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {Values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900">{value.name}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="max-w-5xl w-full mt-16 text-center relative z-10">
          <h2 className="text-4xl font-semibold mb-8 text-gray-900">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-4 text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </section>
  );
};

export default AboutPage;