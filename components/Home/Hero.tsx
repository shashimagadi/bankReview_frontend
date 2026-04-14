import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden w-full h-screen flex items-center justify-center flex-col">
      <div className="px-4  sm:px-6 lg:px-8 py-24 text-center">
        
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Financial Instituation
            <span className="text-blue-600 block">Review PlatForm</span>
          </h1>

          <p className="sm:text-xl text-base mx-auto max-w-3xl">
            share your experience with banks and financial institutions. Help
            Others make informed decisions with authentic reviews and ratings.
            from real customers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5">
            
             <Link href="/share-story"
             className="inline-flex items-center px-8 py-3 border border-transparent text-base
             font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
             transition-colors duration-300 
             "
             >
             Share your story
            </Link>
             <Link href="/share-story"
             className="inline-flex items-center px-8 py-3 border border-gray-300 text-base
             font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 
             transition-colors duration-300 
             "
             >
             Browse Reviews
            </Link>
          </div>
        
      </div>
    </div>
  );
};

export default Hero;
