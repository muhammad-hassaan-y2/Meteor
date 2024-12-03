import { z } from "zod";
import {
  generateReservationPrice,
  generateSampleFlightSearchResults,
  generateSampleFlightStatus,
  generateSampleSeatSelection,
} from "@/ai/actions";
import { auth } from "@/app/(auth)/auth";
import { createReservation, getReservationById } from "@/db/queries";
import { generateUUID } from "@/lib/utils";

export const chatTools = {
  getWeather: {
    description: "Get the current weather at a location",
    parameters: z.object({
      latitude: z.number().describe("Latitude coordinate"),
      longitude: z.number().describe("Longitude coordinate"),
    }),
    execute: async ({ latitude, longitude }: any) => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`,
      );
      return await response.json();
    },
  },
  displayFlightStatus: {
    description: "Display the status of a flight",
    parameters: z.object({
      flightNumber: z.string().describe("Flight number"),
      date: z.string().describe("Date of the flight"),
    }),
    execute: async ({ flightNumber, date }: any) => {
      return await generateSampleFlightStatus({ flightNumber, date });
    },
  },
  searchFlights: {
    description: "Search for flights based on the given parameters",
    parameters: z.object({
      origin: z.string().describe("Origin airport or city"),
      destination: z.string().describe("Destination airport or city"),
    }),
    execute: async ({ origin, destination }: any) => {
      return await generateSampleFlightSearchResults({ origin, destination });
    },
  },
  selectSeats: {
    description: "Select seats for a flight",
    parameters: z.object({
      flightNumber: z.string().describe("Flight number"),
    }),
    execute: async ({ flightNumber }: any) => {
      return await generateSampleSeatSelection({ flightNumber });
    },
  },
  createReservation: {
    description: "Display pending reservation details",
    parameters: z.object({
      seats: z.string().array().describe("Array of selected seat numbers"),
      flightNumber: z.string().describe("Flight number"),
      departure: z.object({
        cityName: z.string().describe("Name of the departure city"),
        airportCode: z.string().describe("Code of the departure airport"),
        timestamp: z.string().describe("ISO 8601 date of departure"),
        gate: z.string().describe("Departure gate"),
        terminal: z.string().describe("Departure terminal"),
      }),
      arrival: z.object({
        cityName: z.string().describe("Name of the arrival city"),
        airportCode: z.string().describe("Code of the arrival airport"),
        timestamp: z.string().describe("ISO 8601 date of arrival"),
        gate: z.string().describe("Arrival gate"),
        terminal: z.string().describe("Arrival terminal"),
      }),
      passengerName: z.string().describe("Name of the passenger"),
    }),
    execute: async (props: any) => {
      const { totalPriceInUSD } = await generateReservationPrice(props);
      const session = await auth();

      if (!session?.user?.id) {
        return { error: "User is not signed in to perform this action!" };
      }

      const id = generateUUID();
      await createReservation({
        id,
        userId: session.user.id,
        details: { ...props, totalPriceInUSD },
      });

      return { id, ...props, totalPriceInUSD };
    },
  },
  authorizePayment: {
    description: "User will enter credentials to authorize payment, wait for user to respond when they are done",
    parameters: z.object({
      reservationId: z.string().describe("Unique identifier for the reservation"),
    }),
    execute: async ({ reservationId }: any) => ({ reservationId }),
  },
  verifyPayment: {
    description: "Verify payment status",
    parameters: z.object({
      reservationId: z.string().describe("Unique identifier for the reservation"),
    }),
    execute: async ({ reservationId }: any) => {
      const reservation = await getReservationById({ id: reservationId });
      return { hasCompletedPayment: reservation.hasCompletedPayment };
    },
  },
  displayBoardingPass: {
    description: "Display a boarding pass",
    parameters: z.object({
      reservationId: z.string().describe("Unique identifier for the reservation"),
      passengerName: z.string().describe("Name of the passenger, in title case"),
      flightNumber: z.string().describe("Flight number"),
      seat: z.string().describe("Seat number"),
      departure: z.object({
        cityName: z.string().describe("Name of the departure city"),
        airportCode: z.string().describe("Code of the departure airport"),
        airportName: z.string().describe("Name of the departure airport"),
        timestamp: z.string().describe("ISO 8601 date of departure"),
        terminal: z.string().describe("Departure terminal"),
        gate: z.string().describe("Departure gate"),
      }),
      arrival: z.object({
        cityName: z.string().describe("Name of the arrival city"),
        airportCode: z.string().describe("Code of the arrival airport"),
        airportName: z.string().describe("Name of the arrival airport"),
        timestamp: z.string().describe("ISO 8601 date of arrival"),
        terminal: z.string().describe("Arrival terminal"),
        gate: z.string().describe("Arrival gate"),
      }),
    }),
    execute: async (boardingPass: any) => boardingPass,
  },
  recommendDestinations: {
    description: "Recommend destinations based on user preferences and budget",
    parameters: z.object({
      tripType: z.string().describe("Type of trip: adventure, beach, cultural, etc."),
      budget: z.number().optional().describe("User's budget for the trip"),
    }),
    execute: async ({ tripType }: any) => {
      const recommendations = [
        { name: "Bali", description: "A tropical paradise with beaches and culture." },
        { name: "Paris", description: "The city of light, perfect for cultural exploration." },
        { name: "Dubai", description: "Luxury, modernity, and adventure in one." },
      ].filter((dest) => tripType.toLowerCase().includes(dest.name.toLowerCase()));

      return recommendations.length
        ? recommendations
        : [{ name: "Default Destination", description: "No specific match found, but this is great!" }];
    },
  },
  finalizeTrip: {
    description: "Assist users in finalizing their trip plans",
    parameters: z.object({
      destination: z.string().describe("Finalized destination for the user's trip."),
      travelDates: z.object({
        startDate: z.string().describe("Start date of the trip (ISO 8601 format)."),
        endDate: z.string().describe("End date of the trip (ISO 8601 format)."),
      }),
      passengers: z.array(
        z.object({
          name: z.string().describe("Name of the passenger."),
          age: z.number().describe("Age of the passenger."),
        })
      ).describe("List of passengers for the trip."),
    }),
    execute: async ({ destination, travelDates, passengers }: any) => ({
      message: `Trip finalized to ${destination} from ${travelDates.startDate} to ${travelDates.endDate} for ${passengers.length} passengers.`,
    }),
  },
};

