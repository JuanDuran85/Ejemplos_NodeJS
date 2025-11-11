## Steps to Use Node with TypeScript and Nodemon

1.  **Install TypeScript and Node types as a development dependency**
    ```bash
    npm i -D typescript @types/node
    ```

2.  **Initialize the TypeScript configuration file (Can be configured to your liking)**
    ```bash
    npx tsc --init --outDir dist/ --rootDir src
    ```

3.  **Optional** - **To transpile the code, you can use this command**
    ```bash
    npx tsc
    npx tsc --watch
    ```

4.  **Configure Nodemon and ts-node**
    ```bash
    npm install -D ts-node nodemon
    ```

5.  **Create Nodemon configuration file - `nodemon.json`**
    ```json
    {
      "watch": ["src"],
      "ext": ".ts,.js",
      "ignore": [],
      "exec": "npx ts-node ./src/app.ts"
    }
    ```
    
6.  **Create script to run in development in the `package.json`**
    ```json
    "dev": "nodemon"
    "dev": "npx nodemon" // In case you don't want to install nodemon
    ```

7.  **Install rimraf (Tool that works similarly to `rm -f`) to delete a directory**
    ```bash
    npm install -D rimraf
    ```

8.  **Create scripts in `package.json` to build and start in production**
    ```json
       "build": "rimraf ./dist && tsc",
       "start": "npm run build && node dist/app.js"
    ```