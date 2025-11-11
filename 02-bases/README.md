# 02 Bases

## To RUN
```bash
npm run dev
```

# ⚙️ Steps to configure Jest with TypeScript, in Node 

[Official Jest Documentation](https://jestjs.io/docs/getting-started)

1. **Development Installations** (supertest is useful for testing Express)
   
```bash
npm install -D jest @types/jest ts-jest supertest

```

2. Create Jest configuration file

```bash
npx jest --init
```

3. In the jest.config.js file, configure the following:

```javascript
preset: 'ts-jest',
testEnvironment: "jest-environment-node",

// Optional - The paths to modules that run some code to configure or set up the testing environment before each test
// setupFiles: ['dotenv/config'],
```

4. Create scripts in the package.json file

```json
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
```