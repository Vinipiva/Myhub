"use client";

import { useEffect, useState } from "react";
import CloudLayer from "./CloudLayer";
import { profileData } from "@/lib/data";

export default function Hero() {
  const [showClouds, setShowClouds] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowClouds(window.innerWidth > 1024);
    }
  }, []);

  return (
    <div className="relative sm:h-[70vh] md:h-[80vh] min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
      <CloudLayer active={showClouds} />
      <section className="absolute inset-0 flex flex-col justify-center text-left px-4 z-20 mx-auto max-w-6xl sm:px-6 md:px-12">
        <h1 className="font-bold text-4xl sm:text-5xl md:text-7xl leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-t from-[hsla(0,0%,0%,80%)] to-[hsla(0,0%,50%,85%)]">
          {profileData.name}
        </h1>
        <h2 className="font-medium text-xl sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-t from-[hsla(0,0%,10%,70%)] to-[hsla(0,0%,50%,90%)]">
          {profileData.role}
        </h2>
        <p className="mt-4 max-w-full md:max-w-2xl text-base sm:text-lg md:text-2xl text-gray-500">
          {profileData.summary}
        </p>
        <button
          type="button"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-8 text-base sm:text-lg md:text-xl transition group flex h-12 sm:h-15 w-36 sm:w-40 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 p-[1.5px] text-white duration-300 hover:bg-gradient-to-l hover:shadow-2xl hover:shadow-purple-600/30 cursor-pointer"
        >
          <div className="flex px-4 h-full w-full items-center justify-center rounded-full bg-gray-900 transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900">
            Get in touch
          </div>
        </button>
      </section>
    </div>
  );
}
