"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import bg from "@/public/bg.jpg";
import star from "@/public/star.avif";
import sphere from "@/public/sphere.avif";
import rhombus from "@/public/rhombus.avif";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Header Background Section */}
      <div className="relative h-[50vh] w-full bg-gradient-to-r">
        <Image
          src={bg}
          alt="Minerva"
          fill
          style={{ objectFit: "fill" }}
          // quality={100}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Welcome to <span className="text-[#28f4af]">Minerva</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl max-w-2xl"
          >
            The Global Premium Analysis Platform for Optimal Cryptocurrency
            Trading Opportunities
          </motion.p>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#28f4af]"
          >
            Smart Trading Leveraging Global Cryptocurrency Market Price
            Differences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-center  max-w-3xl mx-auto mb-12"
          >
            Minerva analyzes price differences (premiums) between domestic and
            international cryptocurrency exchanges in real-time, providing
            investors with optimal trading opportunities. From Kimchi Premium to
            arbitrage between global exchanges, discover all the tools you need
            for more efficient cryptocurrency investment in one place.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-center mt-20 mb-12 text-[#28f4af]"
          >
            MINERVA'S STRENGTHS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-center  max-w-3xl mx-auto mb-16"
          >
            With real-time data analysis and an intuitive interface, anyone can
            easily capture opportunities in the global cryptocurrency market.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "3+", text: "Supported Exchanges" },
              { number: "300+", text: "Analyzed Coin Pairs" },
              { number: "Real-time", text: "Premium Monitoring" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="text-center p-6 border-2 border-slate-700 rounded-lg shadow-sm"
              >
                <h3 className="text-5xl font-bold text-[#28f4af] mb-4">
                  {item.number}
                </h3>
                <p className="text-lg">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 ">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-center mb-16 text-[#28f4af]"
          >
            Optimal Solutions for Arbitrage Trading
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                ),
                title: "Real-time Premium Analysis",
                description:
                  "Monitor price differences between major domestic and international exchanges in real-time to capture optimal trading timing.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                ),
                title: "Multiple Exchange Comparison",
                description:
                  "Compare prices across various exchanges including Binance, Upbit, Bithumb, Coinone, OKX, and more at a glance.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                ),
                title: "Efficient Arbitrage Strategies",
                description:
                  "Receive optimal arbitrage strategies that consider exchange fees, deposit/withdrawal times, and spreads.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="p-6 rounded-lg shadow-sm border-1 border-slate-700"
              >
                <div className="w-16 h-16 bg-[#28f4af]/20 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#28f4af]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {service.icon}
                  </svg>
                </div>
                <h3 className="text-xl text-[#28f4af] font-semibold mb-4">
                  {service.title}
                </h3>
                <p className="">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-16 relative overflow-hidden bg-black">
        {/* 중앙에서 퍼져나가는 블러 효과 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full bg-blue-700 opacity-30 blur-[120px]"></div>
        </div>

        {/* 추가 블러 효과로 깊이감 추가 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[300px] h-[300px] rounded-full bg-indigo-600 opacity-40 blur-[80px]"></div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[150px] h-[150px] rounded-full bg-purple-500 opacity-50 blur-[40px]"></div>
        </div>

        {/* 배경 위에 표시될 콘텐츠 */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          >
            A New Perspective on the Global Cryptocurrency Market
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-center max-w-3xl mx-auto text-white"
          >
            Minerva goes beyond simple price comparison, analyzing global
            cryptocurrency market trends and providing investors with optimal
            trading opportunities. Turn the volatility of the Kimchi Premium
            into opportunity and implement more efficient investment strategies
            through arbitrage between global exchanges.
          </motion.p>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-[#28f4af]">
                Global Markets at a Glance
              </h2>
              <p className="text-lg mb-6">
                Check price differences between major exchanges worldwide in
                real-time through Minerva's intuitive dashboard. We help you not
                miss optimal trading opportunities by clearly visualizing
                complex data.
              </p>
              <ul className="space-y-2">
                {[
                  "Real-time Premium Charts",
                  "Exchange Price Comparison",
                  "Profitability Analysis Tools",
                  "Alert Configuration",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-[#28f4af] mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              {/* Dashboard image placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br  flex items-center justify-center">
                <p className="text-xl">Dashboard Image</p>
                {/* <Image src="/dashboard.png" alt="Minerva Dashboard" fill style={{ objectFit: 'cover' }} /> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-center mb-16 text-[#28f4af]"
          >
            Why Choose Minerva
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Accurate Real-time Data",
                description:
                  "We provide the most accurate and fast market information through real-time data streaming using WebSocket technology. We capture even millisecond price changes to help you find the optimal trading timing.",
              },
              {
                title: "User-Centric Interface",
                description:
                  "We provide complex market data through an intuitive and easy-to-understand interface. We aim to create a platform that anyone from beginners to professional traders can use easily.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-[#28f4af]">
                  {item.title}
                </h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#28f4af]"
          >
            Key Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { title: "Global Exchange Comparison", image: sphere },
              { title: "Arbitrage Calculator", image: star },
              { title: "Alert Service", image: rhombus },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative overflow-hidden rounded-lg shadow-md group border border-slate-700 bg-black"
              >
                <div className="relative p-6 h-96 flex flex-col justify-between">
                  <div className="w-full h-64 relative mb-4">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      style={{ objectFit: "contain" }}
                      className="p-3"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {card.title}
                    </h3>
                    <div className="w-12 h-1 bg-[#28f4af] mb-4"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-center mb-16 text-[#28f4af]"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "What is the Kimchi Premium?",
                answer:
                  "The Kimchi Premium refers to the phenomenon where cryptocurrency prices on Korean exchanges are higher than on global exchanges. This occurs due to the uniqueness of the Korean market and capital controls, sometimes resulting in price differences of over 10%.",
              },
              {
                question: "How does arbitrage trading work?",
                answer:
                  "Arbitrage trading is a strategy that profits from price differences between different exchanges. It involves buying on exchanges with lower prices and selling on exchanges with higher prices, while considering factors such as fees, transfer times, and market volatility.",
              },
              {
                question: "Which exchanges does Minerva support?",
                answer:
                  "Minerva supports domestic exchanges like Upbit, Bithumb, and Coinone, as well as global exchanges including Binance, OKX, Bybit, and Coinbase. We continuously expand our supported exchanges.",
              },
              {
                question: "How accurate is the real-time data?",
                answer:
                  "Minerva provides millisecond-level real-time data using WebSocket technology. We collect data through official APIs from each exchange, ensuring highly accurate information.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="mb-6 border-b border-gray-200 pb-6"
              >
                <motion.h3
                  className="text-xl font-semibold mb-2 cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  {faq.question}
                </motion.h3>
                <p className="text-gray-700 hidden">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
