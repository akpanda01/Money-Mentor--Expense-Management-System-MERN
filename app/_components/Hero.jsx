import Image from 'next/image';
import React from 'react';

const cards = [
  {
    title: 'Track Your Expenses',
    description: 'Effortlessly monitor your expenses with advanced tracking tools that provide detailed insights into your spending patterns, helping you stay on top of your finances and make smarter financial decisions.',
  },
  {
    title: 'Create Budgets',
    description: 'Create budgets to take control of your finances, track spending, and achieve your financial goals effortlessly.',
  },
  {
    title: 'Analyze Your Financial Trends',
    description: 'Gain valuable insights into your spending patterns with interactive charts and graphs, empowering you to make informed financial decisions and improve your overall money management strategy.',
  },
];

const faqs = [
  { question: 'Is this tool free to use?', answer: 'Yes, our basic features are free.' },
  { question: 'How do I track my spending categories?', answer: 'You can categorize your expenses, and track them with charts to understand your spending patterns better.' },
  { question: 'Is my financial data secure?', answer: 'Absolutely! Your data is encrypted and stored securely.' },
];

function MoneyMentor() {
  return (
    <section className="bg-gradient-to-r from-black to-blue-950 text-gray-200">
      {/* Hero Section */}
      <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:items-center">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
            Take Control of Your Finances
          </h1>
          <p className="mt-4 text-lg">
            Manage your expenses effectively and track your financial progress with our intuitive tracker. Achieve your financial goals with ease.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start gap-4">
            <a
              href="/sign-up"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="mt-10 lg:mt-0 lg:w-1/2">
          <Image
            src="/hero.png"
            alt="Financial Management"
            width={700}
            height={400}
            className="rounded-lg shadow-lg transform hover:scale-105 transition duration-500"
          />
        </div>
      </div>

      <div className="relative mb-5">
        <div className="absolute inset-0 bg-black opacity-10"></div> {/* Optional: add overlay */}
        <img
          src="/Dashboard.png"
          alt="Website Image"
          className="max-w-[90%] h-auto rounded-lg shadow-xl object-cover mx-auto"
        />
      </div>

      <div id="about" className="bg-gradient-to-r from-blue-950 to-black text-white py-16">
  <div className="max-w-screen-xl mx-auto px-6 text-center lg:flex items-center">
    <div className="lg:w-1/2 lg:pr-12">
      <h2 className="text-4xl font-bold mb-4 text-white">About Money Mentor</h2>
      <p className="text-lg mb-8 max-w-3xl mx-auto">
        Money Mentor is designed to help individuals take full control of their financial journey. With a focus on simplicity and usability, our platform equips users with powerful tools to effectively track spending, set realistic budgets, and make informed, data-driven decisions to pave the way for financial freedom. Whether you're aiming to save more, eliminate debt, or plan for future goals, Money Mentor provides the essential resources and insights needed to manage your finances with confidence. Our mission is to empower users to not only track their finances but also understand their spending habits and make smarter financial choices that will lead to long-term success and security.
      </p>
    </div>
    <div className="lg:w-1/2 mt-8 lg:mt-0">
      <img
        src="/About.png"  // You can replace this with your image path
        alt="Money Mentor"
        className="w-3/4 h-auto mx-auto rounded-lg  transform transition duration-500 hover:scale-105"
      />
    </div>

  </div>
</div>

      {/* Features Section */}
      <div id="features" className="py-16  bg-gradient-to-r from-black to-blue-950 text-white">
        <h2 className="text-4xl font-bold text-center">Key Features</h2>
        <p className="text-center text-white mt-2">Unlock the Full Potential of Your Finances with Money Mentor</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-800 hover:bg-gray-600 p-6 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-gray-300">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gradient-to-r from-blue-950 to-black">
        <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="mt-8 max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-bold">{faq.question}</h3>
              <p className="mt-2 text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>


      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-4">
        <div className="text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Money Mentor. All Rights Reserved.</p>
          <div className="mt-2">
            <a href="#" className="hover:text-gray-100 mx-2">Privacy Policy</a>
            <a href="#" className="hover:text-gray-100 mx-2">Terms of Service</a>
            <a href="#" className="hover:text-gray-100 mx-2">Contact Us</a>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default MoneyMentor;
