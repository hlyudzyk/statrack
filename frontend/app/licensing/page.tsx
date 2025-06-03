"use server"
import React from 'react';
const LicensingPage = () => {
  return (
      <main className="max-w-4xl 3xl:max-w-7xl mx-auto px-4 3xl:px-20 py-10 3xl:py-24">
        <h1 className="text-3xl 3xl:text-6xl font-bold mb-6 3xl:mb-12">Ліцензії</h1>

        <p className="text-lg 3xl:text-4xl mb-4 3xl:mb-8">
          Цей проєкт було розроблено в межах дипломної роботи й призначено виключно для освітніх та демонстраційних цілей.
        </p>

        <p className="text-lg 3xl:text-4xl mb-4 3xl:mb-8">
          Вихідний код і матеріали можна вільно переглядати, змінювати та використовувати в некомерційних, академічних або особистих проєктах. Жодних гарантій не надається.
        </p>

        <p className="text-lg 3xl:text-4xl mb-4 3xl:mb-8">
          Якщо ви використовуєте будь-яку частину цього проєкту у власній роботі — згадка про автора буде вдячно сприйнята, хоча й не є обов’язковою. Посилання на проєкт буде приємним жестом.
        </p>

        <p className="text-lg 3xl:text-4xl mb-4 3xl:mb-8">
          Комерційне використання заборонене без явного дозволу автора.
        </p>

        <p className="text-lg 3xl:text-4xl">
          Якщо у вас є питання щодо використання чи ліцензії — не соромтеся звернутися до розробника.
        </p>
      </main>
  );
};


export default LicensingPage;
