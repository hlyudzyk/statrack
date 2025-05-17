import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const ContactPage = () => {
  return (
      <main className="max-w-4xl 3xl:max-w-7xl mx-auto px-4 3xl:px-20 py-10 3xl:py-24">
        <h1 className="text-3xl 3xl:text-6xl font-bold mb-6 3xl:mb-12">Contact</h1>

        <p className="text-lg 3xl:text-4xl mb-6 3xl:mb-12">
          If you have any questions, feedback, or ideas, feel free to reach out through any of the
          channels below.
        </p>

        <ul className="space-y-4 3xl:space-y-8 text-lg 3xl:text-4xl">
          <li className="flex items-center space-x-3">
            <IoMail className="w-5 h-5 3xl:w-8 3xl:h-8 text-gray-700"/>
            <a
                href="mailto:your.email@example.com"
                className="text-blue-600 hover:underline"
            >
              your.email@example.com
            </a>
          </li>
          <li className="flex items-center space-x-3">
            <FaGithub className="w-5 h-5 3xl:w-8 3xl:h-8 text-gray-700"/>
            <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
            >
              github.com/your-username
            </a>
          </li>
          <li className="flex items-center space-x-3">
            <FaLinkedin className="w-5 h-5 3xl:w-8 3xl:h-8 text-gray-700"/>
            <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
            >
              linkedin.com/in/your-profile
            </a>
          </li>
        </ul>
      </main>

  );
};

export default ContactPage;
