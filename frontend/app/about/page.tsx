"use server"
import React from 'react';

const AboutPage = () => {
  return (
      <main className="max-w-4xl 3xl:max-w-7xl mx-auto px-4 3xl:px-20 py-10 3xl:py-24">
        <h1 className="text-3xl 3xl:text-6xl font-bold mb-6 3xl:mb-12">
          About This Project
        </h1>

        <p className="text-lg 3xl:text-5xl mb-4 3xl:mb-16">
          This web application was developed as part of a diploma project with the goal of simplifying internal coordination among teaching staff. It offers a centralized platform for teachers to share updates, track important events, and manage their daily responsibilities more effectively.
        </p>

        <p className="text-lg 3xl:text-5xl mb-4 3xl:mb-16">
          Designed with usability and collaboration in mind, the system allows users to:
        </p>

        <ul className="list-disc list-inside mb-4 3xl:mb-8 text-lg 3xl:text-5xl space-y-2 3xl:space-y-10">
          <li>Post and share event announcements</li>
          <li>Track the status of tasks and responsibilities</li>
          <li>Manage personal and group-related information</li>
          <li>Access dashboards tailored to individual users</li>
        </ul>

        <p className="text-lg 3xl:text-5xl mb-4 3xl:mb-8">
          Whether it's scheduling a department meeting, updating attendance information, or planning academic activities, this app aims to streamline communication and reduce administrative overhead.
        </p>

        <p className="text-lg 3xl:text-5xl">
          This project was built using modern web technologies including <strong>Next.js</strong>, <strong>TypeScript</strong>, and a modular design to ensure scalability and maintainability.
        </p>
      </main>
  );
};

export default AboutPage;
