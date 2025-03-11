# CLAUDE.md - Guidance for the Keskpank Codebase

## Build/Run Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## Environment Setup
1. Copy `.env.sample` to `.env` (do not rename)
2. The SQLite database will be automatically created in the data directory

## Code Style Guidelines
- **Indentation**: 4 spaces
- **Quotes**: Prefer double quotes for strings
- **Semicolons**: Required at end of statements
- **Naming**: camelCase for variables/functions, PascalCase for models
- **Imports**: Group related imports, put Node.js requires at top
- **Error Handling**: Use try/catch blocks with clear error responses
- **API Responses**: Format as JSON, include appropriate status codes

## Architecture
- Express.js backend with SQLite (better-sqlite3)
- RESTful API structure
- Controllers handle business logic
- Models define data operations
- Middlewares for validation/authentication
- Database queries in database.js

## Validation
- Use express-validator for input validation
- Add validation rules to route definitions
- Use models/validators.js for model-level validation