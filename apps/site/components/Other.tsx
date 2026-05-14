import React from "react";

const Other = () => {
  return (
    <section className="px-2 sm:px-6 rounded-lg max-w-screen-2xl mx-auto relative pb-8 sm:pb-12 transform-gpu overflow-hidden">
      <div className="text-center py-12 sm:py-24 w-full transform-gpu">
        <h2 className="text-5xl md:text-6xl mb-2 text-gray-500 decorative-text">
          Want to see more?
        </h2>
        <p className="text-base sm:text-xl text-gray-700 max-w-4xl leading-relaxed mx-auto">
          Some projects from previous companies
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8 w-full mx-auto relative transform-gpu">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-7 gap-4 sm:gap-8">
          <div className="col-span-1 md:col-span-4 p-4 sm:p-8 bg-gray-800 rounded-xl shadow-xl text-white relative overflow-hidden flex flex-col transform-gpu">
            <div className="absolute -bottom-[25%] -left-16 w-56 h-56 bg-[#14851A] rounded-full opacity-30 blur-2xl transform-gpu"></div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-2 text-left">
              Oi - Brazil Telco
            </h3>
            <p className="text-base sm:text-lg text-gray-300 mb-6 text-left max-w-2xl">
              Contributed on digital transformation for one of Brazil’s largest telecom
              providers. 48M+ clients impacted.
            </p>

            <div className="flex flex-col gap-6 w-full mb-8">
              <div className="flex flex-col">
                <span className="font-bold">E-commerce from scratch:</span>
                <span className="text-gray-200">
                  Designed Oi’s first digital sales platform, driving +17%
                  online revenue in 6 months.
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Early AI innovation:</span>
                <span className="text-gray-200">
                  Led UX for Joice, Oi’s AI chatbot (2019), automating 5M+
                  tickets/month and saving $5m/year.
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Design system:</span>
                <span className="text-gray-200">
                  Co-created Oi’s first design system for UI, accessibility, and
                  brand consistency.
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <h4 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                    +17%
                  </h4>
                  <p className="text-gray-300 text-center">
                    revenue increase (2 quarters)
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <h4 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                    $7M
                  </h4>
                  <p className="text-gray-300 text-center">
                    Savings from AI chatbot
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <h4 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                    5M<span className="text-2xl">/mo</span>
                  </h4>
                  <p className="text-gray-300 text-center">
                    Automated tickets via AI
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-3 bg-gray-800 rounded-xl shadow-lg flex items-end transform-gpu z-15">
            <div className="w-full flex justify-center relative">
              <div className="absolute inset w-full h-full rounded-xl overflow-hidden transform-gpu">
                <div className="absolute -bottom-50 -right-50 w-120 h-120 bg-gradient-to-b from-[#14851A] to-[#00FF00] rounded-full z-0 transform-gpu"></div>
              </div>

              <img
                src="/images/cases/oi-mock.png"
                alt="Oi Telecom Mockup"
                className="w-100 md:scale-125 transform-gpu -translate-y-6"
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 p-4 sm:p-8 h-full w-full min-h-72 md:min-h-96 relative transform-gpu">
            <img
              src="/images/cases/works/museum-connections.jpg"
              alt="Museum Connections - 2016"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-lg"
            />
            <div className="absolute bottom-2 bg-white rounded-full shadow-m py-2 px-4 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
              <span className="font-bold text-gray-800">
                Paris 2016 - Museum - Awarded web app
              </span>
            </div>
          </div>
          <div className="col-span-1 md:col-span-4 p-4 sm:p-8 h-full w-full min-h-72 md:min-h-96 relative transform-gpu">
            <img
              src="/images/cases/works/method-coachella.png"
              alt="Coachella Festival Activation - 2018"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-lg"
            />
            <div className="absolute bottom-2 bg-white rounded-full shadow-m py-2 px-4 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
              <span className="font-bold text-gray-800">
                Coachella 2018 - Method - 360cam
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-2 grid grid-cols-1 gap-4 sm:gap-8 rounded-xl z-5">
            <div className="grid grid-cols-2 bg-slate-900 rounded-xl shadow-xl overflow-hidden">
              <img
                src="/images/cases/works/photo.png"
                alt="Quiz App"
                className="col-span-2  w-full h-auto max-w-full object-cover"
              />
              <img
                src="/images/cases/works/photo-1.png"
                alt="Quiz App"
                className="col-span-2  w-full h-auto max-w-full object-cover"
              />
              <img
                src="/images/cases/works/photo-2.png"
                alt="Quiz App"
                className="col-span-1 w-full h-auto max-w-full object-cover"
              />
              <img
                src="/images/cases/works/photo-3.png"
                alt="Quiz App"
                className="col-span-1 w-full h-auto max-w-full object-cover"
              />
              <img
                src="/images/cases/works/photo-4.png"
                alt="Quiz App"
                className="col-span-1 w-full h-auto max-w-full object-cover"
              />
              <img
                src="/images/cases/works/photo-5.png"
                alt="Quiz App"
                className="col-span-1 w-full h-auto max-w-full object-cover"
              />
            </div>

          <div className="p-4 sm:p-8 bg-slate-800 rounded-xl shadow-xl relative overflow-hidden">
            <div className="absolute -bottom-[25%] -right-16 w-32 h-32 bg-blue-400 rounded-full opacity-50 blur-2xl"></div>
            <p className="text-xl text-gray-200 mb-4">
              From 2014 to 2018, developed a wide range of digital solutions,
              including web and mobile apps, VR/AR training simulators,
              interactive motion-based experiences, immersive WebXR educational
              tools, and custom CMS platforms for various industries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Other;
