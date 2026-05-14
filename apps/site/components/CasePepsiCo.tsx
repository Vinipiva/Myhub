"use client";
import React from "react";
import { pepsicoData } from "@/lib/data";

export default function CasePepsiCo() {
  const data = pepsicoData;
  return (
    <section id="pepsico" className="relative py-12 sm:py-20 overflow-hidden transform-gpu bg-[#f8f8f8]">
      <div className="relative max-w-screen-2xl mx-auto px-2 sm:px-4 transform-gpu">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 sm:gap-6">

          {/* Left: company info */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="text-4xl sm:text-6xl text-gray-800">{data.company}</h2>
              <p className="text-2xl sm:text-4xl text-gray-500 mb-4 decorative-text">{data.role}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-md font-bold text-white bg-gray-700 px-4 py-2 rounded-full">{data.period}</span>
                <span className="text-md font-bold text-white bg-gray-700 px-4 py-2 rounded-full">{data.type}</span>
              </div>
            </div>
            <div className="bg-gray-800/90 p-6 sm:p-8 rounded-2xl shadow-lg">
              <p className="text-base sm:text-lg text-white leading-relaxed">{data.summary}</p>
            </div>
            {/* KPI mock cards */}
            <div className="grid grid-cols-2 gap-3">
              {data.kpiCards.map((kpi, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{kpi.value}</p>
                  <p className={`text-sm font-semibold mt-1 ${kpi.trend.startsWith("+") ? "text-emerald-500" : "text-red-400"}`}>{kpi.trend}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Center: abstract data viz */}
          <div className="col-span-1 md:col-span-3 flex items-center justify-center">
            <div className="w-full rounded-2xl bg-[#0a1628] p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-semibold text-lg">Global KPI Dashboard</span>
                <span className="text-gray-400 text-sm">Power BI</span>
              </div>
              {/* Fake chart bars */}
              <div className="space-y-3">
                {[
                  { label: "EMEA", value: 87, color: "bg-blue-400" },
                  { label: "APAC", value: 63, color: "bg-indigo-400" },
                  { label: "LATAM", value: 74, color: "bg-violet-400" },
                  { label: "NA", value: 92, color: "bg-cyan-400" },
                ].map((bar, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-gray-400 text-xs w-12">{bar.label}</span>
                    <div className="flex-1 bg-white/10 rounded-full h-3">
                      <div className={`${bar.color} h-3 rounded-full opacity-80`} style={{ width: `${bar.value}%` }} />
                    </div>
                    <span className="text-white text-xs w-8 text-right">{bar.value}%</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { label: "Clarity Score", value: "9.1" },
                  { label: "Adoption", value: "87%" },
                  { label: "Friction ↓", value: "41%" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-blue-300 text-xl font-bold">{stat.value}</p>
                    <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: team details */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            {data.teams.map((team, i) => (
              <div key={i} className="bg-gray-800/90 p-6 sm:p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-white mb-2">{team.name}</h3>
                <p className="text-gray-300 text-base mb-4">{team.description}</p>
                <ul className="space-y-3 text-gray-200 text-sm">
                  {team.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-blue-400 mt-0.5">▸</span>
                      <span><strong className="text-white">{b.label}: </strong>{b.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-6 rounded-2xl shadow-lg text-center">
              <p className="text-gray-300 text-sm uppercase tracking-widest mb-2">Scale</p>
              <p className="text-white text-3xl font-bold">Enterprise</p>
              <p className="text-blue-300 text-sm mt-1">Global cross-functional teams</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
