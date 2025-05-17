import React from 'react';

const PrivacyPolicyPage = () => {
  return (
      <main className="max-w-4xl 3xl:max-w-7xl mx-auto px-4 3xl:px-20 py-10 3xl:py-24">
        <h1 className="text-3xl 3xl:text-6xl font-bold mb-6 3xl:mb-12">Privacy Policy</h1>

        <p className="text-lg 3xl:text-4xl mb-4 3xl:mb-8">
          This application was created as part of a diploma project and is intended for educational
          and demonstration purposes.
        </p>

        <p className="text-lg 3xl:text-4xl mb-4 3xl:mb-8">
          We respect your privacy. Any personal information shared within the app (such as your
          name, status, or activity data) is used solely for the purpose of enabling features like
          event sharing and status updates among teachers.
        </p>

        <p className="text-lg 3xl:text-4xl mb-4 3xl:mb-8">
          No data is shared with third parties, and we do not use your information for advertising
          or tracking.
        </p>

        <p className="text-lg 3xl:text-4xl mb-4 3xl:mb-8">
          While we aim to keep all data secure, please note that this is a student project and not a
          production-grade application. Use of the app should be limited to test or internal
          academic purposes.
        </p>

        <p className="text-lg 3xl:text-4xl">
          If you have any questions about privacy or how data is handled, feel free to reach out to
          the developer.
        </p>
      </main>

  );
};

export default PrivacyPolicyPage;
