"use client";
import React from "react";
import { availData } from "@/lib/data";

export default function CaseAvail() {
  const data = availData;
  return (
    <section id="avail" className="relative pt-12 sm:pt-24 overflow-hidden pb-8 sm:pb-12 transform-gpu">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f3e6f] via-[#0f3e6f] to-[#2566b3] clip-house z-0 transform-gpu"></div>
      <div className="relative max-w-screen-2xl mx-auto px-2 sm:px-4 z-10 transform-gpu">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 sm:gap-8">
          <div className="col-span-1 md:col-span-3 relative pt-4 sm:pt-10 pb-10 sm:pb-20">
            <h2 className="text-4xl sm:text-6xl text-gray-300">{data.company}</h2>
            <p className="text-2xl sm:text-4xl text-gray-200 mb-4 decorative-text">{data.role}</p>
            <div className="flex left mt-2">
              <span className="text-md font-bold text-white bg-[#0a2c4d] px-4 py-2 rounded-full">{data.period}</span>
              <span className="text-md font-bold text-white bg-[#0a2c4d] px-4 py-2 rounded-full ml-4">{data.type}</span>
            </div>
            <div className="w-full bg-black/40 backdrop-blur-md rounded-lg p-4 sm:p-8 shadow-lg text-gray-200 text-left text-base sm:text-lg mt-6">
              {data.paragraphs.map((p, i) => (
                <p key={i} className="mb-6 last:mb-0" dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
            <div className="flex justify-between mt-6 gap-6 text-center transform-gpu">
              {data.metrics.map((m, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-lg w-1/2">
                  <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-b text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to bottom, ${m.colorFrom}, ${m.colorTo})` }}>
                    {m.value}{m.suffix && <span className="text-3xl">{m.suffix}</span>}
                  </div>
                  <p className="text-md md:text-lg text-white font-bold mt-2">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 md:col-span-4 relative flex justify-end transform-gpu">
            <img src="/images/cases/avail-screens.png" alt="Avail mockups" className="w-full h-auto object-contain translate-x-0 md:translate-x-[5vw] scale-120 translate-x-[10vw] md:scale-110 md:-translate-y-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
