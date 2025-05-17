import React from 'react';

const LicensingPage = () => {
  return (
      <main className="max-w-4xl 3xl:max-w-7xl mx-auto px-4 3xl:px-20 py-10 3xl:py-24">
        <h1 className="text-3xl 3xl:text-6xl font-bold mb-6 3xl:mb-12">Licensing</h1>

        <p className="text-lg 3xl:text-4xl mb-4 3xl:mb-8">
          This project was developed as part of a diploma thesis and is intended for educational and
          demonstration purposes only.
        </p>

        <p className="text-lg 3xl:text-4xl mb-4 3xl:mb-8">
          The codebase and materials may be freely viewed, modified, and reused for non-commercial,
          academic, or personal projects. No warranties are provided.
        </p>

        <p className="text-lg 3xl:text-4xl mb-4 3xl:mb-8">
          If you use any part of this project in your own work, attribution is appreciated but not
          required. A mention or link back would be a nice gesture.
        </p>

        <p className="text-lg 3xl:text-4xl mb-4 3xl:mb-8">
          Commercial use is not permitted without explicit permission from the author.
        </p>

        <p className="text-lg 3xl:text-4xl">
          For questions about usage or licensing, feel free to get in touch with the developer.
        </p>
      </main>

  );
};

export default LicensingPage;
