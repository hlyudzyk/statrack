import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const ContactPage = () => {
  return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Contact</h1>

        <p className="text-lg mb-6">
          If you have any questions, feedback, or ideas, feel free to reach out through any of the channels below.
        </p>

        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <IoMail className="w-5 h-5 text-gray-700" />
            <a href="mailto:your.email@example.com" className="text-blue-600 hover:underline">
              your.email@example.com
            </a>
          </li>
          <li className="flex items-center space-x-3">
            <FaGithub className="w-5 h-5 text-gray-700" />
            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              github.com/your-username
            </a>
          </li>
          <li className="flex items-center space-x-3">
            <FaLinkedin className="w-5 h-5 text-gray-700" />
            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              linkedin.com/in/your-profile
            </a>
          </li>
        </ul>
      </main>
  );
};

export default ContactPage;
