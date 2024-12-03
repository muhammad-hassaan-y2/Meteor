'use client'

import { Plane } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* App Name */}
        <h1 className="text-2xl font-bold text-black flex items-center space-x-2">
          <Plane className="text-black w-6 h-6" /> {/* Adjusted icon size */}
          <Link href="/" className="hover:underline">
            Meteor Linker
          </Link>
        </h1>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-lg">
          <Link
            href="/"
            className={`${
              pathname === "/" ? "text-indigo-600 font-bold" : "text-gray-700"
            } hover:text-black font-medium transition duration-200`}
          >
            Home
          </Link>
          <Link
            href="/features"
            className={`${
              pathname === "/features" ? "text-indigo-600 font-bold" : "text-gray-700"
            } hover:text-black font-medium transition duration-200`}
          >
            Features
          </Link>
          <Link
            href="/contact-us"
            className={`${
              pathname === "/contact-us" ? "text-indigo-600 font-bold" : "text-gray-700"
            } hover:text-black font-medium transition duration-200`}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
