import React from 'react';
import { Book, HelpCircle, Mail, MessageCircle } from 'lucide-react';
import {FAQList} from './FAQList';
import ContactForm from './ContactForm';
import { useEffect } from "react";


const QuickLink: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md  duration-200 hover:scale-105 transition-all">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

const HelpCenter: React.FC = () => {
  useEffect(() => {
    console.log("HelpCenter mounted");
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <HelpCircle className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            How can we help you today?
          </h1>
          <p className="text-blue-100 text-lg">
            Browse our help resources or get in touch with our support team
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="grid md:grid-cols-3 gap-4">
          <QuickLink
            icon={<Book className="h-6 w-6" />}
            title="Documentation"
            description="Browse our detailed guides"
          />
          <QuickLink
            icon={<MessageCircle className="h-6 w-6" />}
            title="Community"
            description="Join our community forums"
          />
          <QuickLink
            icon={<Mail className="h-6 w-6" />}
            title="Email Support"
            description="Get help from our team"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <FAQList />
      </div>

      {/* Contact Section */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600">
            Our support team is always ready to assist you
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default HelpCenter;