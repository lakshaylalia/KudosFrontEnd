import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
          required
        >
          <option value="">Select a topic</option>
          <option value="general">General Inquiry</option>
          <option value="technical">Technical Support</option>
          <option value="billing">Billing Question</option>
          <option value="feedback">Feedback</option>
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
          required
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Send className="w-5 h-5 mr-2" />
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;