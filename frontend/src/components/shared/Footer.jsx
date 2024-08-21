import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full absolute  left-0">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Career<span className="text-[#28A745]">Link</span>
            </h1>
            <p className="text-gray-400">Your gateway to a better career.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4 text-center w-full">
        <p className="text-gray-500">&copy; 2024 CareerLink. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
