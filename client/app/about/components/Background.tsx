import { motion } from "framer-motion";
import Image from "next/image";
import bg from "@/public/bg.jpg";

export default function Background() {
  return (
    <div className="relative h-[100vh] w-full">
      <Image
        src={bg}
        alt="Minerva"
        fill
        style={{ objectFit: "cover" }}
        // quality={100}
      />
      <div className="absolute inset-0 bg-black/20"></div>
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
          className="text-xl w-full"
        >
          The Global Premium Analysis Platform for Optimal Cryptocurrency
          Trading Opportunities
        </motion.p>
      </div>
    </div>
  );
}
