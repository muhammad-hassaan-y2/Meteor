# Meteor Linker

Meteor Linker is an AI-powered chatbot built with Next.js and TypeScript, designed to simplify travel planning. Using the Google Gemini model, Meteor Linker assists users in booking flights, checking weather conditions, and choosing travel destinations. It incorporates custom AI actions for enhanced functionality and integrates the Open Meteo API for real-time weather updates.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [API Overview](#api-overview)
- [Setup and Deployment](#setup-and-deployment)
- [Running Locally](#running-locally)
- [Development Information](#development-information)
- [Developers](#developers)

---

## Project Overview

Meteor Linker is tailored to provide seamless assistance in travel planning. Whether booking a flight, checking destination weather, or receiving tailored travel suggestions, this chatbot leverages cutting-edge AI to make your journey effortless.

### Use Cases:
- **Flight Bookings**: Simplifies the booking process by understanding user preferences.
- **Weather Updates**: Fetches real-time weather data for any location.
- **Travel Suggestions**: Provides curated travel recommendations based on user preferences and trends.

---

## Features

### Core Capabilities
- **Flight Booking Assistance**: Custom AI actions simplify the process of finding and booking flights.
- **Destination Recommendations**: Helps users choose ideal travel spots using Gemini’s advanced reasoning.
- **Weather Integration**: Real-time weather updates powered by the Open Meteo API.

### Built with Next.js and TypeScript
- Advanced routing with the Next.js App Router.
- Fully typed architecture for maintainability and scalability.

### Backend and Storage
- **Custom AI Actions**: Enable seamless execution of travel-related tasks.
- **Vercel Postgres**: Efficiently store user interactions and data.
- **Vercel Blob Storage**: Manage media and object storage efficiently.

### Authentication
- **NextAuth.js**: Secure, customizable user authentication.

---

## API Overview

Meteor Linker relies on the following integrations:

### Google Gemini Model
- Processes natural language queries to provide flight options and travel suggestions.
- Offers conversational interactions and dynamic decision-making.

### Custom AI Actions
- **Flight Booking**: Handles preferences and connects users with flight booking systems.
- **Destination Selection**: Suggests destinations based on user input, preferences, and trends.

### Open Meteo API
- Fetches accurate weather information for any location globally.

---

## Setup and Deployment

### Deployment on Vercel
Deploy Meteor Linker to Vercel with the click of a button.

### Environment Variables
Set the following variables in your environment:
- `AUTH_SECRET`: For authentication.
- `GOOGLE_GENERATIVE_AI_API_KEY`: Access key for the Google Gemini model.
- `OPEN_METEO_API_KEY`: API key for fetching weather data from Open Meteo.

> **Note**: Keep sensitive credentials out of source control.

---

## Running Locally

Follow these steps to set up Meteor Linker on your local machine:

### Clone the Repository
```bash
git clone https://github.com/your-repo-name/meteor-linker.git
cd meteor-linker
```
# Install Dependencies
To get started, follow these steps:

### Install Dependencies
```bash
pnpm install
```

### run the project
```bash
pnpm dev
```

Start your travel journey today with Meteor Linker – your AI travel assistant that makes planning trips effortless!
