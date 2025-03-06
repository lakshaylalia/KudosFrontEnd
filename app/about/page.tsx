"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
  { name: "John Doe", role: "Founder & CEO", image: "/john.jpg" },
  { name: "Jane Smith", role: "CTO", image: "/jane.jpg" },
  { name: "Michael Lee", role: "Lead Designer", image: "/michael.jpg" },
  { name: "Emily Davis", role: "Head of Marketing", image: "/emily.jpg" },
];

const Values = [
  { name: "Integrity", description: " Honest work, no shortcuts." },
  { name: "Innovation", description: "Evolving, not just adapting." },
  { name: "Collaboration", description: "Win together, grow together." },
  { name: "Excellence", description: "Aim high, stay humble." },
];

const AboutPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-white px-8 py-16 relative overflow-hidden"
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 bg-white opacity-10 rounded-full"
            animate={{ y: [0, 20, 0], x: [0, -20, 20] }}
            transition={{ duration: 8, repeat: Infinity, delay: i * 1.5 }}
            style={{ top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` }}
          />
        ))}
      </motion.div>

      {/* About Section */}
      <section className="max-w-5xl w-full text-center relative z-10">
        <h1 className="text-5xl font-extrabold mb-6">About Kudos</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          <span className="font-semibold text-black dark:text-white">Kudos</span> is an integrated platform designed to streamline professional event management within organizations.
          We enable employees to track attended events, manage Jira tickets, monitor analytics, and redeem earned points in an exclusive rewards store.
          Our goal is to enhance workplace engagement, productivity, and recognition through a seamless and efficient system.
        </p>
      </section>

      {/* Our Values */}
      <section className="max-w-5xl w-full mt-12 space-y-10 relative z-10">
        <h2 className="text-4xl font-semibold text-center mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {Values.map((value, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">{value.name}</h3>
              <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="max-w-5xl w-full mt-16 text-center relative z-10">
        <h2 className="text-4xl font-semibold mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-lg"
              />
              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;