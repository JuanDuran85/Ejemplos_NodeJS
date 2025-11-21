# Node.js Examples Collection

This repository contains a comprehensive collection of Node.js examples, ranging from basic server setups to advanced applications with databases, authentication, and more. Each example is organized in its own directory for easy reference and learning.

## Basic Examples

1. **01-fundamentals** - Fundamental Node.js concepts and basics
2. **02-bases** - Basic Node.js server implementations
3. **03-typescript** - Introduction to TypeScript with Node.js
4. **04-terminal-app** - Terminal-based applications
5. **05-noc** - Network Operations Center (NOC) application with health monitoring, logging to multiple datasources (File System, MongoDB, PostgreSQL), and email notifications
6. **06-json-server** - REST API using JSON Server for mock data

## Express.js Examples

7. **ejemplo1** - Basic server with Node.js
8. **ejemplo2** - Server with Express.js (GET/POST operations)
9. **ejemplo3** - Express.js server with file handling
10. **ejemplo4** - Express.js server with cookies and sessions
11. **ejemplo5** - Working with SQLite3 database and ORM
12. **ejemplo6** - MVC project structure
13. **ejemplo7** - Advanced Express.js patterns
14. **ejemplo8** - Express.js with JSON data and repositories
15. **ejemplo9** - Express.js application with Jade templating
16. **ejemplo10** - Login system with Express.js
17. **ejemplo11** - Image handling with Express.js
18. **ejemplo12** - File uploads with Express.js
19. **ejemplo13** - Command-line table generation
20. **ejemplo14** - Task management application

## Advanced Applications

21. **api-server-ts** - API server built with TypeScript
22. **auth-server** - Authentication server
23. **clima-app** - Weather application
24. **restserver** - REST API server with authentication and user management
25. **web-server** - General web server implementation

## Testing Examples

26. **test-node** - Comprehensive testing examples including unit tests, integration tests, and frontend testing

## Prerequisites

- Node.js (version 14 or higher recommended)
- npm or yarn package manager

## Getting Started

Each example is self-contained. Navigate to the desired example directory and follow the instructions in its README.md file (if available) or check the package.json for available scripts.

```bash
cd <example-directory>
npm install
npm start
```

## Contributing

Feel free to contribute additional examples or improvements to existing ones.

## License

See LICENSE file for details.

## Additional Notes

### Heroku Deployment
- View logs: `heroku logs -n 1000 --tail -a=<app-name>`
- Set remote: `heroku git:remote -a <repo-name>`
- View config: `heroku config`
- Set config: `heroku config:set VARIABLE="value"`

### Git
- Remove file from cache: `git rm .env --cached`