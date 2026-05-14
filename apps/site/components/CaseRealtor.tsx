"use client";
import React from "react";
import { realtorData } from "@/lib/data";

export default function CaseRealtor() {
  const data = realtorData;
  return (
    <section id="realtor" className="relative py-8 sm:py-12 bg-gray-50 overflow-hidden transform-gpu">
      <div className="absolute inset-0 pointer-events-none transform-gpu">
        <img src="/images/cases/realtor-bg.svg" alt="" className="w-full h-full object-contain opacity-10" />
      </div>
      <div className="relative max-w-screen-2xl mx-auto px-2 sm:px-4 transform-gpu">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 transform-gpu">
          {/* Left col */}
          <div className="col col-span-1 md:col-span-2 relative transform-gpu">
            <div className="w-full">
              <h2 className="text-4xl sm:text-6xl text-gray-800">{data.company}</h2>
              <p className="text-2xl sm:text-4xl text-gray-500 mb-4 decorative-text">{data.role}</p>
              <div className="flex left mt-2">
                <span className="text-md font-bold text-white bg-gray-700 px-4 py-2 rounded-full">{data.period}</span>
                <span className="text-md font-bold text-white bg-gray-700 px-4 py-2 rounded-full ml-4">{data.type}</span>
              </div>
            </div>
            <div className="flex justify-center mb-4 bg-gray-800/90 p-4 sm:p-8 rounded-2xl shadow-lg mt-6 transform-gpu">
              <p className="text-base sm:text-xl text-white max-w-3xl mx-auto text-leading-relaxed text-left">{data.summary}</p>
            </div>
            <div className="flex flex-col items-center justify-center mt-6 transform-gpu">
              <div className="grid grid-cols-2 gap-6 transform-gpu">
                {data.metrics.map((m, i) => (
                  <div key={i} className="bg-gray-800/90 p-8 rounded-2xl shadow-lg">
                    <div className={`text-4xl md:text-5xl font-extrabold bg-gradient-to-b ${m.color} text-transparent bg-clip-text`}>{m.value}</div>
                    <p className="text-md md:text-lg text-white font-bold mt-2">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <img src="/images/cases/family.png" alt="" className="w-40 sm:w-80 absolute -bottom-15 md:bottom-0 right-5 md:-right-8" />
          </div>

          {/* Center col */}
          <div className="col col-span-1 md:col-span-3 transform-gpu">
            <img src="/images/cases/rdc.png" alt="Realtor.com mockup" className="w-full h-full object-contain" />
          </div>

          {/* Right col - teams */}
          <div className="col col-span-1 md:col-span-2 transform-gpu">
            <div className="flex flex-col items-start space-y-6 text-left transform-gpu">
              {data.teams.map((team, i) => (
                <div key={i} className="bg-gray-800/90 p-8 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold text-white">{team.name}</h3>
                  <p className="text-lg text-gray-200 mb-4">{team.description}</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-200">
                    {team.bullets.map((b, j) => (
                      <li key={j}>
                        {b.label && <strong>{b.label}: </strong>}{b.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
