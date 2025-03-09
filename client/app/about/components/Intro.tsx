import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="py-16 h-[100vh] flex items-center justify-center text-center">
      <div className="container mx-auto px-4 ">
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
          className="text-lg text-center  max-w-3xl mx-auto mb-24"
        >
          Minerva analyzes price differences (premiums) between domestic and
          international cryptocurrency exchanges in real-time, providing
          investors with optimal trading opportunities. Whether it's regional
          market premiums or cross-exchange arbitrage, find all the tools you
          need for more efficient cryptocurrency investment in one place.
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
  );
}
