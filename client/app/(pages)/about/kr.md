"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
return (
<div className="flex flex-col min-h-screen">
{/_ 헤더 배경 이미지 섹션 _/}
<div className="relative h-[50vh] w-full bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900">
<div className="absolute inset-0 bg-black/50"></div>
<div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
<motion.h1
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7 }}
className="text-4xl md:text-6xl font-bold text-white mb-6" >
Welcome to <span className="text-[#28f4af]">Minerva</span>
</motion.h1>
<motion.p
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.7, delay: 0.3 }}
className="text-xl text-white max-w-2xl" >
최적의 암호화폐 거래 기회를 발견하는 글로벌 프리미엄 분석 플랫폼
</motion.p>
</div>
</div>

      {/* 회사 소개 섹션 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            글로벌 암호화폐 시장의 가격 차이를 활용한 스마트 트레이딩
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12"
          >
            Minerva는 국내외 다양한 암호화폐 거래소 간의 가격 차이(프리미엄)를
            실시간으로 분석하여 투자자에게 최적의 거래 기회를 제공합니다.
            김치프리미엄부터 글로벌 거래소 간 차익거래까지, 더 효율적인 암호화폐
            투자를 위한 모든 도구를 한 곳에서 만나보세요.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-center mt-20 mb-12"
          >
            MINERVA의 강점
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-center text-gray-800 max-w-3xl mx-auto mb-16"
          >
            실시간 데이터 분석과 직관적인 인터페이스로 누구나 쉽게 글로벌
            암호화폐 시장의 기회를 포착할 수 있습니다.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "20+", text: "지원 거래소" },
              { number: "100+", text: "분석 코인 페어" },
              { number: "실시간", text: "프리미엄 모니터링" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="text-center p-6 bg-gray-50 rounded-lg shadow-sm"
              >
                <h3 className="text-5xl font-bold text-[#28f4af] mb-4">
                  {item.number}
                </h3>
                <p className="text-lg text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 섹션 */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-center mb-16"
          >
            차익거래를 위한 최적의 솔루션
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
                title: "실시간 프리미엄 분석",
                description:
                  "국내외 주요 거래소 간의 가격 차이를 실시간으로 모니터링하여 최적의 거래 타이밍을 포착합니다.",
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
                title: "다양한 거래소 비교",
                description:
                  "바이낸스, 업비트, 빗썸, 코인원, OKX 등 국내외 다양한 거래소의 가격을 한눈에 비교할 수 있습니다.",
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
                title: "효율적인 차익거래 전략",
                description:
                  "거래소 간 수수료, 입출금 시간, 스프레드를 고려한 최적의 차익거래 전략을 제시합니다.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="p-6 rounded-lg shadow-sm"
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
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 혁신 섹션 */}
      <section className="py-16 bg-gradient-to-r from-[#28f4af] via-teal-500 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            글로벌 암호화폐 시장의 새로운 관점
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-center max-w-3xl mx-auto"
          >
            Minerva는 단순한 가격 비교를 넘어, 글로벌 암호화폐 시장의 흐름을
            분석하고 투자자에게 최적의 거래 기회를 제공합니다. 김치프리미엄의
            변동성을 기회로 바꾸고, 글로벌 거래소 간 차익거래를 통해 더 효율적인
            투자 전략을 실현하세요.
          </motion.p>
        </div>
      </section>

      {/* 이미지 섹션 추가 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-6">글로벌 시장을 한눈에</h2>
              <p className="text-lg text-gray-700 mb-6">
                Minerva의 직관적인 대시보드를 통해 전 세계 주요 거래소의 가격
                차이를 실시간으로 확인하세요. 복잡한 데이터를 시각적으로
                명확하게 표현하여 최적의 거래 기회를 놓치지 않도록 도와드립니다.
              </p>
              <ul className="space-y-2">
                {[
                  "실시간 프리미엄 차트",
                  "거래소별 가격 비교",
                  "수익성 분석 도구",
                  "알림 설정 기능",
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
              {/* 여기에 대시보드 이미지를 넣을 수 있습니다 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                <p className="text-white text-xl">대시보드 이미지</p>
                {/* <Image src="/dashboard.png" alt="Minerva Dashboard" fill style={{ objectFit: 'cover' }} /> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 경쟁 우위 섹션 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-center mb-16"
          >
            Minerva를 선택해야 하는 이유
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "정확한 실시간 데이터",
                description:
                  "WebSocket 기술을 활용한 실시간 데이터 스트리밍으로 가장 정확하고 빠른 시장 정보를 제공합니다. 밀리세컨드 단위의 가격 변동도 놓치지 않고 포착하여 최적의 거래 타이밍을 찾아드립니다.",
              },
              {
                title: "사용자 중심 인터페이스",
                description:
                  "복잡한 시장 데이터를 직관적이고 이해하기 쉬운 인터페이스로 제공합니다. 초보자부터 전문 트레이더까지 누구나 쉽게 사용할 수 있는 플랫폼을 지향합니다.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 카드 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            주요 기능
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "김치프리미엄 분석", color: "bg-blue-900" },
              { title: "글로벌 거래소 비교", color: "bg-indigo-900" },
              { title: "차익거래 계산기", color: "bg-purple-900" },
              { title: "알림 서비스", color: "bg-pink-900" },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative overflow-hidden rounded-lg shadow-md group"
              >
                <div
                  className={`absolute inset-0 ${card.color} opacity-80 group-hover:opacity-90 transition-opacity`}
                ></div>
                <div className="relative p-8 h-64 flex flex-col justify-end">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <div className="w-12 h-1 bg-[#28f4af] mb-4"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-center mb-16"
          >
            자주 묻는 질문
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "김치프리미엄이란 무엇인가요?",
                answer:
                  "김치프리미엄은 한국 암호화폐 거래소의 가격이 글로벌 거래소 대비 높게 형성되는 현상을 말합니다. 이는 한국 시장의 특수성과 자본 통제로 인해 발생하며, 때로는 10% 이상의 가격 차이가 나타나기도 합니다.",
              },
              {
                question: "차익거래는 어떻게 진행하나요?",
                answer:
                  "차익거래는 서로 다른 거래소 간의 가격 차이를 이용하여 이익을 얻는 전략입니다. 가격이 낮은 거래소에서 구매하고 높은 거래소에서 판매하는 방식으로 진행되며, 수수료, 전송 시간, 시장 변동성 등을 고려해야 합니다.",
              },
              {
                question: "Minerva는 어떤 거래소를 지원하나요?",
                answer:
                  "Minerva는 업비트, 빗썸, 코인원과 같은 국내 거래소와 바이낸스, OKX, 바이비트, 코인베이스 등 글로벌 주요 거래소를 지원합니다. 지속적으로 지원 거래소를 확대하고 있습니다.",
              },
              {
                question: "실시간 데이터는 얼마나 정확한가요?",
                answer:
                  "Minerva는 WebSocket 기술을 활용하여 밀리세컨드 단위의 실시간 데이터를 제공합니다. 각 거래소의 공식 API를 통해 데이터를 수집하므로 매우 정확한 정보를 얻을 수 있습니다.",
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
