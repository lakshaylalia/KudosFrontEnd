"use client";
import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-blue-800 to-blue-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Kudos</h3>
            <p className="text-gray-300">
              Connecting people through memorable events since 2023.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Events", "Categories", "About Us"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="text-lg font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              {["Help Center", "Contact Us", "FAQs", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {["facebook", "twitter", "instagram"].map((platform, index) => (
                <Link key={index} href="#" className="text-gray-300 hover:text-white transition-transform hover:scale-110">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="..." />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Kudos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
