# NOC APP - Node.js / TypeScript

A Network Operations Center (NOC) application built with Node.js and TypeScript that monitors service availability using scheduled health checks.

## Features

- **Automated Health Checks**: Periodically checks service endpoints to ensure they are operational
- **Multi-Datasource Logging**: Records check results to multiple storage systems:
  - File System (local logs directory)
  - MongoDB database
  - PostgreSQL database
- **Severity-Based Logging**: Different log levels (LOW, MEDIUM, HIGH, ERROR)
- **Email Notifications**: Send log reports via email with file attachments
- **Cron-based Scheduling**: Uses cron jobs for automated monitoring
- **Environment Configuration**: Fully configurable through environment variables
- **Clean Architecture**: Organized with domain-driven design principles
- **TypeScript**: Built with TypeScript for type safety

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- MongoDB (local installation or cloud service like MongoDB Atlas)
- PostgreSQL (local installation or cloud service)
- Email service account (e.g., Gmail, Outlook) for notifications

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

4. Generate Prisma Client based on your introspected schema:
   ```bash
   npx prisma generate
   ```

5. Create and apply a migration:
   ```bash
   npx prisma migrate dev
   ```

## Configuration

1. Copy the environment template:
    ```bash
    cp .env.template .env
    ```

2. Update the `.env` file with your configuration. All variables are required for full functionality:

    ```env
    # Application
    PORT=3000
    PROD=false
    ENV=development

    # MongoDB Configuration
    MONGO_URL=mongodb://localhost:27017
    MONGO_DB_NAME=noc_db
    MONGO_USER=your-mongo-username
    MONGO_PASSWORD=your-mongo-password

    # PostgreSQL Configuration
    DATABASE_URL=postgresql://username:password@localhost:5432/noc_db
    POSTGRES_DB=noc_db
    POSTGRES_USER=your-postgres-username
    POSTGRES_PASSWORD=your-postgres-password

    # Email Configuration
    EMAIL_NAME=your-email@example.com
    EMAIL_KEY=your-email-password-or-api-key
    EMAIL_SERVICE=gmail
    ```

    **Environment Variables:**
    - `PORT`: Port number for the application (default: 3000)
    - `PROD`: Production mode flag (true/false)
    - `ENV`: Environment type (development/production)
    - `MONGO_URL`: MongoDB connection URL
    - `MONGO_DB_NAME`: MongoDB database name
    - `MONGO_USER`: MongoDB username
    - `MONGO_PASSWORD`: MongoDB password
    - `DATABASE_URL`: PostgreSQL connection URL
    - `POSTGRES_DB`: PostgreSQL database name
    - `POSTGRES_USER`: PostgreSQL username
    - `POSTGRES_PASSWORD`: PostgreSQL password
    - `EMAIL_NAME`: Email address for notifications
    - `EMAIL_KEY`: Email password or API key
    - `EMAIL_SERVICE`: Email service provider (gmail, outlook, etc.)

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

1. **Database Initialization**: Connects to MongoDB and sets up required databases
2. **Cron Scheduling**: Runs health checks every 10 seconds using cron expressions
3. **Service Monitoring**: Checks HTTP endpoints for availability and response status
4. **Multi-Datasource Logging**: Records results to:
   - Local file system (organized by severity levels)
   - MongoDB collections
   - PostgreSQL tables
5. **Status Verification**: Validates HTTP responses and handles success/error scenarios
6. **Callbacks**: Executes custom success and error handlers

### Current Configuration
- **Check Interval**: Every 10 seconds (`*/10 * * * * *`)
- **Target Service**: Configurable via code (default checks a test endpoint)
- **Log Storage**: Multiple datasources (File System, MongoDB, PostgreSQL)
- **Log Levels**: LOW, MEDIUM, HIGH, ERROR

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
- `cron`: Task scheduling for automated checks
- `dotenv`: Environment variable loading
- `env-var`: Environment variable validation and parsing
- `mongoose`: MongoDB object modeling
- `pg`: PostgreSQL client
- `@prisma/client`: Database ORM for PostgreSQL
- `@prisma/adapter-pg`: PostgreSQL adapter for Prisma
- `nodemailer`: Email sending functionality

### Development
- `@types/node`: Node.js type definitions
- `@types/nodemailer`: Nodemailer type definitions
- `@types/pg`: PostgreSQL type definitions
- `rimraf`: Cross-platform rm -rf utility
- `ts-node-dev`: TypeScript development server with hot reloading
- `typescript`: TypeScript compiler
- `prisma`: Database toolkit and ORM

## Development Notes

- The application uses Clean Architecture principles with domain-driven design
- Built with TypeScript for type safety and better development experience
- Multi-datasource logging allows comparison of different storage approaches
- Email service is configured but not automatically triggered in the current cron job
- For production deployment, ensure all database connections are properly secured
- The application connects to MongoDB on startup - ensure MongoDB is running
- PostgreSQL tables are created automatically via Prisma migrations (run `npx prisma migrate dev` if needed)
- Logs are stored in multiple locations:
  - File system: `logs/` directory with severity-based files
  - MongoDB: Collections for different log levels
  - PostgreSQL: Tables for log entries

## License

ISC