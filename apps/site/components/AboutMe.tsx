import React from "react";
import { profileData } from "@/lib/data";

const AboutMe = () => (
  <section className="py-5 md:py-16 px-2 sm:px-6 rounded-lg max-w-screen-2xl mx-auto mt-6 sm:mt-10 relative transform-gpu" id="about">
    <div className="absolute inset-0 pointer-events-none z-0 transform-gpu">
      <img src="/images/sketch-pantera.png" alt="My dog Panther" className="hidden md:block absolute bottom-10 right-15 w-[12%] opacity-50" />
      <img src="/images/sketch-car.png" alt="Car sketch" className="hidden md:block absolute bottom-0 left-5 w-[18%] rotate-[-5deg] opacity-50" />
      <img src="/images/sketch-plane.png" alt="Plane sketch" className="hidden md:block absolute -top-20 right-1/8 w-[30%] rotate-3 opacity-50" />
      <img src="/images/sketch-pen.png" alt="Pen sketch" className="hidden md:block absolute top-10 left-25 w-[15%] -translate-x-1/2 -translate-y-1/2 rotate-6 opacity-50" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-screen-lg mx-auto relative z-10 transform-gpu">
      <div className="col-span-1 flex flex-col justify-center">
        <h2 className="text-5xl md:text-6xl text-gray-500 decorative-text">About me</h2>
        <div className="flex flex-col mt-2">
          {profileData.about.map((paragraph, i) => (
            <p key={i} className="text-base sm:text-lg mb-4" dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      </div>
      <div className="col-span-1 p-0 sm:p-8">
        <img src="/images/cases/photo-vini.jpg" alt="About Me" className="w-64 h-auto md:w-full md:h-auto rounded-full md:rounded-lg shadow-lg mx-auto" />
      </div>
    </div>
  </section>
);

export default AboutMe;
