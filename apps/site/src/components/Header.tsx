"use client";

import React, { useEffect, useState } from "react";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);

      let current = "";
      for (const { href } of navLinks) {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            current = href;
            break;
          }
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled ? "backdrop-blur-md bg-white/70 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <div
            className={`text-lg sm:text-xl font-semibold transition-opacity ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          >
            Vinicius Piva
          </div>

          {/* Desktop Nav */}
          <ul className="hidden sm:flex space-x-4 md:space-x-6">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`text-base md:text-lg hover:text-gray-900 hover:font-bold transition-colors duration-300 ${
                    active === href ? "text-gray-900 font-bold" : "text-gray-700"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Nav Toggle */}
          <button
            className="sm:hidden flex items-center px-2 py-1"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h20M4 14h20M4 21h20" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden absolute top-16 left-0 w-full bg-white shadow-md z-50">
            <ul className="flex flex-col py-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={`block px-6 py-3 text-base hover:text-gray-900 hover:font-bold transition-colors duration-300 ${
                      active === href ? "text-gray-900 font-bold" : "text-gray-700"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
