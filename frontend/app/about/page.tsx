import React from 'react';

const AboutPage = () => {
  return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">About This Project</h1>

        <p className="text-lg mb-4">
          This web application was developed as part of a diploma project with the goal of simplifying internal coordination among teaching staff. It offers a centralized platform for teachers to share updates, track important events, and manage their daily responsibilities more effectively.
        </p>

        <p className="text-lg mb-4">
          Designed with usability and collaboration in mind, the system allows users to:
        </p>

        <ul className="list-disc list-inside mb-4 text-lg space-y-2">
          <li>Post and share event announcements</li>
          <li>Track the status of tasks and responsibilities</li>
          <li>Manage personal and group-related information</li>
          <li>Access dashboards tailored to individual users</li>
        </ul>

        <p className="text-lg mb-4">
          Whether it's scheduling a department meeting, updating attendance information, or planning academic activities, this app aims to streamline communication and reduce administrative overhead.
        </p>

        <p className="text-lg">
          This project was built using modern web technologies including <strong>Next.js</strong>, <strong>TypeScript</strong>, and a modular design to ensure scalability and maintainability.
        </p>
      </main>
  );
};

export default AboutPage;
