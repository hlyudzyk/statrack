"use server"
import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
const ContactPage = () => {
  return (
      <main className="max-w-4xl 3xl:max-w-7xl mx-auto px-4 3xl:px-20 py-10 3xl:py-24">
        <h1 className="text-3xl 3xl:text-6xl font-bold mb-6 3xl:mb-12">Контакти</h1>

        <p className="text-lg 3xl:text-4xl mb-6 3xl:mb-12">
          Якщо у вас є запитання, відгуки або ідеї — не соромтеся звертатися через будь-який із каналів нижче.
        </p>

        <ul className="space-y-4 3xl:space-y-8 text-lg 3xl:text-4xl">
          <li className="flex items-center space-x-3">
            <IoMail className="w-5 h-5 3xl:w-8 3xl:h-8 text-gray-700" />
            <a
                href={process.env.NEXT_PUBLIC_ML_LINK}
                className="text-blue-600 hover:underline"
            >
              {process.env.NEXT_PUBLIC_ML_LINK}
            </a>
          </li>
          <li className="flex items-center space-x-3">
            <FaGithub className="w-5 h-5 3xl:w-8 3xl:h-8 text-gray-700" />
            <a
                href={process.env.NEXT_PUBLIC_GH_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
            >
              {process.env.NEXT_PUBLIC_GH_LINK}
            </a>
          </li>
          <li className="flex items-center space-x-3">
            <FaLinkedin className="w-5 h-5 3xl:w-8 3xl:h-8 text-gray-700" />
            <a
                href={process.env.NEXT_PUBLIC_LN_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
            >
              {process.env.NEXT_PUBLIC_LN_LINK}
            </a>
          </li>
        </ul>
      </main>
  );
};


export default ContactPage;
