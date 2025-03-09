import { motion } from "framer-motion";

export default function Innovation() {
  return (
    <section className="py-16 relative overflow-hidden h-[100vh] flex items-center justify-center text-center">
      {/* 중앙에서 퍼져나가는 블러 효과 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[50vw] h-[40vw] rounded-full bg-blue-700 opacity-30 blur-[120px]"></div>
      </div>

      {/* 추가 블러 효과로 깊이감 추가 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[30vw] h-[20vw] rounded-full bg-indigo-600 opacity-40 blur-[80px]"></div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[10vw] h-[10vw] rounded-full bg-purple-400 opacity-50 blur-[40px]"></div>
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
          Minerva goes beyond simple price comparison, offering deep insights
          into global cryptocurrency market trends and uncovering optimal
          trading opportunities. Leverage market price discrepancies and execute
          more efficient investment strategies through cross-exchange arbitrage.
        </motion.p>
      </div>
    </section>
  );
}
