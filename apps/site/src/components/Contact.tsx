"use client";

import React, { useState } from "react";

export default function Contact() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate(form: HTMLFormElement) {
    const newErrors: { [key: string]: string } = {};
    const nameEl = form.elements.namedItem("full-name") as HTMLInputElement;
    const emailEl = form.elements.namedItem("email") as HTMLInputElement;
    if (!nameEl?.value?.trim()) newErrors["full-name"] = "Full name is required.";
    if (!emailEl?.value?.trim()) newErrors.email = "Email is required.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailEl.value.trim()))
      newErrors.email = "Please enter a valid email address.";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const validation = validate(formEl);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    setSubmitting(true);
    await fetch("https://formsubmit.co/vinicius.piva@hotmail.com", {
      method: "POST",
      body: new FormData(formEl),
      headers: { Accept: "application/json" },
    });
    setSubmitting(false);
    setSuccess(true);
    formEl.reset();
  }

  return (
    <section id="contact" className="isolate px-2 sm:px-6 py-12 sm:py-24 lg:px-8 relative overflow-hidden">
      <div className="absolute bottom-0 -z-10 overflow-hidden blur-3xl" aria-hidden="true">
        <div
          className="translate-x-100 relative -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-[#9089fc] opacity-40 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-gray-600 text-5xl md:text-6xl decorative-text">
          Contact
        </h2>
      </div>
      <div className="mx-auto max-w-6xl mt-8 sm:mt-16 grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-16">
        {/* Left: contact info */}
        <div className="flex flex-col items-start justify-start gap-8">
          <div>
            <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">Contact info</h3>
            <ul className="space-y-4 text-lg">
              <li>
                <span className="font-semibold text-gray-700 text-lg">Email:</span>{" "}
                <a
                  href="mailto:vinicius.piva@hotmail.com?subject=Contact%20Request&body=Please%20describe%20your%20inquiry."
                  className="text-bold text-cyan-700 hover:underline"
                >
                  vinicius.piva@hotmail.com
                </a>
              </li>
              <li>
                <span className="font-semibold text-gray-700">LinkedIn:</span>{" "}
                <a
                  href="https://www.linkedin.com/in/vpcarvalho/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-700 hover:underline"
                >
                  linkedin.com/in/viniciuspiva
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: form */}
        <form
          action="https://formsubmit.co/vinicius.piva@hotmail.com"
          method="POST"
          className="w-full max-w-xl mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6">
            <div className="sm:col-span-2">
              <label htmlFor="full-name" className="block text-sm/6 font-semibold text-gray-900">
                Full name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autoComplete="name"
                  required
                  className={`block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 ${errors["full-name"] ? "border border-red-500" : ""}`}
                />
                {errors["full-name"] && (
                  <span className="text-red-600 text-xs mt-1 block">{errors["full-name"]}</span>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm/6 font-semibold text-gray-900">
                Company
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="organization"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className={`block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 ${errors.email ? "border border-red-500" : ""}`}
                />
                {errors.email && (
                  <span className="text-red-600 text-xs mt-1 block">{errors.email}</span>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4">
            {success && (
              <div className="p-4 rounded bg-green-100 text-green-800 border border-green-300 text-center">
                Thank you! Your message was sent successfully.
              </div>
            )}
            {Object.values(errors).some(Boolean) && (
              <div className="p-4 rounded bg-red-100 text-red-800 border border-red-300 text-center">
                Please correct the highlighted fields.
              </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="mx-auto md:mx-0 mt-0 text-xl transition group flex h-15 w-56 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 p-[1.5px] text-white duration-300 hover:bg-gradient-to-l hover:shadow-2xl hover:shadow-purple-600/30 cursor-pointer"
            >
              <div className="flex px-4 h-full w-full items-center justify-center rounded-full bg-gray-900 transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900">
                {submitting ? "Sending..." : "Send your message"}
              </div>
            </button>
          </div>
          <input type="hidden" name="_captcha" value="false" />
        </form>
      </div>
    </section>
  );
}
