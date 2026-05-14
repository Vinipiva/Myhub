"use client";

import React from "react";
import CasePepsiCo from "./CasePepsiCo";
import CaseRealtor from "./CaseRealtor";
import CaseAvail from "./CaseAvail";
import CaseFanfest from "./CaseFanfest";
import AboutMe from "./AboutMe";
import Other from "./Other";
import { profileData } from "@/lib/data";

export default function Cases() {
  return (
    <div>
      <div className="text-left px-4 sm:px-8 md:px-12 py-8 sm:py-12 z-20 max-w-7xl mb-8 mx-auto">
        <p className="text-2xl sm:text-3xl font-bold text-gray-700 max-w-4xl leading-relaxed border-l-4 border-gray-500 pl-4">
          {profileData.impactStatement}
        </p>
      </div>

      <div id="work">
        <h2 className="text-5xl md:text-6xl my-15 text-center md:my-24 text-gray-500 decorative-text">
          Recent works
        </h2>
        <CasePepsiCo />
        <CaseRealtor />
        <CaseAvail />
        <CaseFanfest />
      </div>
      <AboutMe />
      <Other />
    </div>
  );
}
