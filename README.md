# Keskpank - Central Bank API System

A lightweight central banking API system that allows banks to register themselves and retrieve information about other registered banks.

## Features
- Bank registration system
- Bank information retrieval via API
- API key authentication
- SQLite database for data persistence

## Getting Started

### Prerequisites
- Node.js (v14+) and npm 

### Installation and Setup
1. Clone this repository
2. Run `npm install` to install dependencies
3. Copy `.env.sample` to `.env` file (do not rename)
4. The SQLite database will be automatically created in the `data` directory

### Running the Application
- Development mode: `npm run dev` (uses nodemon for auto-reloading)
- Production mode: `npm start`

### API Documentation
- Visit [localhost:3000/docs](http://localhost:3000/docs) to access the Swagger UI documentation
- The API endpoints are documented with request/response examples and schema information

## API Endpoints

### GET /banks
Returns a list of all registered banks. Requires API key authentication.

### POST /banks
Registers a new bank in the system.

## Technical Details
- Built with Express.js
- Uses SQLite (better-sqlite3) for database
- Implements JWT validation via JWKS
