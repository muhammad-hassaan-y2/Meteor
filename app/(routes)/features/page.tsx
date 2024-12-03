"use client";

import { Cloud, Plane, MapPin } from "lucide-react";
import React from "react";

const FeaturesPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 py-24 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-indigo-600 sm:text-5xl">
            Discover the World with Meteor Linker
          </h1>
          <p className="mt-4 text-lg text-gray-600 sm:text-xl max-w-3xl mx-auto">
            Your ultimate travel assistant, helping you pick the perfect destination, book your flights, and stay updated with the weather.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: Choosing Travel Destinations */}
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full">
              <MapPin className="text-indigo-600 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Choose Your Destination
            </h2>
            <p className="text-gray-600">
              Get tailored recommendations based on your preferences, budget, and travel interests.
            </p>
          </div>

          {/* Feature 2: Booking Flights */}
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full">
              <Plane className="text-indigo-600 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Book Your Flights
            </h2>
            <p className="text-gray-600">
              Seamlessly search and book flights that match your schedule and budget.
            </p>
          </div>

          {/* Feature 3: Weather Updates */}
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full">
              <Cloud className="text-indigo-600 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Weather Updates
            </h2>
            <p className="text-gray-600">
              Stay informed with real-time weather updates for your travel destination.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default FeaturesPage;
