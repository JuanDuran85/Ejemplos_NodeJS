# 07-RestWeb

A Node.js/TypeScript project demonstrating different approaches to building and serving web applications using Express.js, native HTTP modules, and HTTP/2.

## Description

This project showcases multiple server implementations for serving web content:

- **Express Server** (`src/app.ts`): Modern Express.js server with static file serving and SPA routing
- **Basic HTTP Server** (`src/app.http.ts`): Native Node.js HTTP server implementation
- **HTTP/2 Server** (`src/app.http2.ts`): Secure HTTP/2 server with SSL certificates

The project includes two example web applications:

- A modern Single Page Application (SPA) built with Vite
- A simple HTML/CSS/JavaScript example

## Features

- TypeScript configuration for type safety
- Environment variable management with `env-var`
- Static file serving
- SPA routing support
- Multiple server implementations (Express, HTTP, HTTP/2)
- Bootstrap and Animate.css integration
- Hero images from DC and Marvel universes

## Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   cd 07-restweb
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the environment template:

   ```bash
   cp .env.template .env
   ```

4. Configure your environment variables in `.env`:
   ```
   PORT=3000
   PUBLIC_PATH=public
   ```

## Usage

### Development

Run the Express server in development mode:

```bash
npm run dev
```

This will start the server with hot reloading using `ts-node-dev`.

### Production

1. Build the TypeScript code:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Alternative Server Implementations

To run the basic HTTP server:

```bash
npx ts-node src/app.http.ts
```

To run the HTTP/2 server (requires SSL certificates in `keys/` directory):

```bash
npx ts-node src/app.http2.ts
```

## Project Structure

```
07-restweb/
├── src/
│   ├── app.ts                 # Main Express server
│   ├── app.http.ts            # Basic HTTP server
│   ├── app.http2.ts           # HTTP/2 secure server
│   ├── config/
│   │   └── envs.ts            # Environment configuration
│   └── presentation/
│       └── server.ts          # ServerApp class
├── public/
│   ├── index.html             # Main SPA entry point
│   ├── assets/                # Built assets (JS, images)
│   └── backout/               # Alternative HTML example
├── keys/                      # SSL certificates (for HTTP/2)
├── .env                       # Environment variables
├── .env.template              # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

| Variable      | Description        | Default |
| ------------- | ------------------ | ------- |
| `PORT`        | Server port number | 3000    |
| `PUBLIC_PATH` | Static files path  | public  |

## Technologies Used

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **dotenv** - Environment variable management
- **env-var** - Environment validation
- **Vite** - Frontend build tool
- **Bootstrap** - CSS framework
- **Animate.css** - CSS animations

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (currently not implemented)

## API Endpoints

The servers serve static files and provide SPA routing. The main endpoints are:

- `GET /` - Serves the main application
- `GET /*` - SPA routing (serves index.html for client-side routing)
- Static assets are served from the configured `PUBLIC_PATH`

## SSL Certificates (HTTP/2)

For the HTTP/2 server, you'll need to generate SSL certificates:

```bash
# Generate self-signed certificates for development
openssl req -x509 -newkey rsa:4096 -keyout keys/server.key -out keys/server.crt -days 365 -nodes
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License
