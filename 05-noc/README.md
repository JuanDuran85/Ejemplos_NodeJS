# NOC APP - Node.js / TypeScript

A Network Operations Center (NOC) application built with Node.js and TypeScript that monitors service availability using scheduled health checks.

## Features

- **Automated Health Checks**: Periodically checks service endpoints to ensure they are operational
- **Logging System**: Records check results with different severity levels (LOW, ERROR)
- **File System Logging**: Stores logs in the local file system
- **Cron-based Scheduling**: Uses cron jobs for automated monitoring
- **Environment Configuration**: Configurable through environment variables
- **Clean Architecture**: Organized with domain-driven design principles

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd 05-noc
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Copy the environment template:
   ```bash
   cp .env.template .env
   ```

2. Update the `.env` file with your configuration:
   ```env
   PORT=3000
   PROD=true
   EMAIL_NAME=your-email@example.com
   EMAIL_KEY=your-email-api-key
   ```

   **Environment Variables:**
   - `PORT`: Port number for the application (default: 3000)
   - `PROD`: Production mode flag (true/false)
   - `EMAIL_NAME`: Email address for notifications
   - `EMAIL_KEY`: API key for email service

## Usage

### Development Mode
Run the application in development mode with hot reloading:
```bash
npm run dev
```

### Production Build
Build the application for production:
```bash
npm run build
```

### Production Start
Build and start the production version:
```bash
npm start
```

## How It Works

The application performs automated health checks on configured services:

1. **Cron Scheduling**: Runs health checks every 10 seconds using cron expressions
2. **Service Monitoring**: Checks HTTP endpoints (currently configured for `http://localhost:3000`)
3. **Status Verification**: Validates response status and availability
4. **Logging**: Records successful checks and errors with timestamps
5. **Callbacks**: Executes success or error callbacks based on check results

### Current Configuration
- **Check Interval**: Every 10 seconds (`*/10 * * * * *`)
- **Target Service**: `http://localhost:3000`
- **Log Storage**: File system (logs directory)

## Project Structure

```
05-noc/
├── src/
│   ├── app.ts                 # Application entry point
│   ├── config/                # Configuration plugins
│   ├── domain/                # Business logic and entities
│   │   ├── entities/          # Domain entities (LogEntity)
│   │   ├── repository/        # Repository interfaces
│   │   └── use-cases/         # Application use cases
│   ├── infrastructure/        # External dependencies
│   │   ├── datasources/       # Data access implementations
│   │   └── repositories/      # Repository implementations
│   └── presentation/          # Application interface
│       ├── cron/              # Cron job services
│       └── server.ts          # Main server application
├── dist/                      # Compiled JavaScript output
├── logs/                      # Log files storage
├── node_modules/              # Dependencies
├── .env                       # Environment variables
├── .env.template              # Environment template
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## Dependencies

### Production
- `cron`: Task scheduling
- `dotenv`: Environment variable loading
- `env-var`: Environment variable validation

### Development
- `@types/node`: Node.js type definitions
- `rimraf`: Cross-platform rm -rf utility
- `ts-node-dev`: TypeScript development server
- `typescript`: TypeScript compiler

## Development Notes

- The application uses Clean Architecture principles
- Currently, `ServerApp.start()` is commented out in `app.ts` - uncomment it to enable the monitoring functionality
- Logs are stored in the `logs/` directory
- The application is configured for TypeScript with strict type checking

## License

ISC