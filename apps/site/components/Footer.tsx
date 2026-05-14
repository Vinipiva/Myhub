import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 sm:py-6 text-center w-full">
      <div className="max-w-5xl mx-auto px-2 sm:px-4">
        <p className="text-xs sm:text-sm">
          © {new Date().getFullYear()} Vinicius Piva - All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;''