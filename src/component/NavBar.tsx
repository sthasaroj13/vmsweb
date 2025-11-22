"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-md">
      <div className=" mx-auto px-1 sm:px-1 lg:px-10">
        <div className="flex justify-between items-center h-16">
          <div>
            {/* <Image alt="vmslogo" src={vmslogo} className="h-12 w-auto" /> */}
            <h1 className=" text-2xl text-white font-bold">VMS</h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-10 text-white font-semibold text-lg">
            <li className="hover:text-gray-200 transition-colors duration-300 cursor-pointer">
              Dash Board
            </li>
            <li className="hover:text-gray-200 transition-colors duration-300 cursor-pointer">
              About Us
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          <div>
            <ul className=" bg-primary text-white font-semibold   flex  gap-2.5">
              <Link href="signuppage">
                <li className="hover:text-gray-200 transition-colors duration-300 cursor-pointer rounded-[.625rem] outline-1 px-2.5 py-1">
                  Sign up
                </li>
              </Link>

              <Link href="/loginpage">
                <li className="hover:text-gray-200 transition-colors duration-300 cursor-pointer outline-1 rounded-[.625rem] px-4.5 py-1">
                  Login
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-primary text-white font-semibold px-4 pt-2 pb-4 space-y-2">
          <li className="hover:text-gray-200 transition-colors duration-300 cursor-pointer">
            Home
          </li>
          <li className="hover:text-gray-200 transition-colors duration-300 cursor-pointer">
            Dash Board
          </li>
          <li className="hover:text-gray-200 transition-colors duration-300 cursor-pointer">
            About Us
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
