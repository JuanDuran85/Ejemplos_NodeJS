# User Store - Rest API + TypeScript

This project is a RESTful API for a user store, built with Node.js, Express, and TypeScript. It includes user authentication, and product and category management.

## Features

-   User registration and login
-   JWT-based authentication
-   Email verification
-   Category management (create, get)
-   Product management (create, get)
-   Clean architecture pattern

## Installation

1.  Clone the repository.
2.  Create a `.env` file by copying `.env.template` and configure the environment variables:
    -   `PORT`: Port for the server (e.g., 3000)
    -   `MONGO_URL`: MongoDB connection URL
    -   `MONGO_DB_NAME`: MongoDB database name
    -   `JWT_SEED`: Seed for JWT token generation
    -   `EMAIL_SERVICE`: Email service provider (e.g., gmail)
    -   `EMAIL_NAME`: Your email address
    -   `EMAIL_KEY`: Your email password or app key
    -   `SEND_EMAIL`: Set to `true` to enable email sending
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  If you are using a local database, configure `docker-compose.yml` and run:
    ```bash
    docker-compose up -d
    ```
5.  Run the project in development mode:
    ```bash
    npm run dev
    ```

## API Endpoints

### Authentication

-   `POST /api/auth/login`

    **Body:**

    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```

-   `POST /api/auth/register`

    **Body:**

    ```json
    {
        "name": "Test User",
        "email": "user@example.com",
        "password": "password123"
    }
    ```

-   `GET /api/auth/validate-email/:token`

### Categories

-   `GET /api/categories`

-   `POST /api/categories` (Requires authentication)

    **Body:**

    ```json
    {
        "name": "Electronics",
        "available": true
    }
    ```

### Products

-   `GET /api/products`

-   `POST /api/products` (Requires authentication)

    **Body:**

    ```json
    {
        "name": "iPhone 15",
        "price": 1000,
        "description": "The latest iPhone",
        "category": "60d0fe4f5311236168a109ca",
        "available": true
    }
    ```

## Database Schema

### User

-   `name`: `String` (Required)
-   `email`: `String` (Required, Unique)
-   `emailValidated`: `Boolean` (Default: `false`)
-   `password`: `String` (Required)
-   `img`: `String`
-   `role`: `[String]` (Default: `["USER_ROLE"]`, Enum: `["ADMIN_ROLE", "USER_ROLE"]`)
-   `status`: `Boolean` (Default: `true`)

### Category

-   `name`: `String` (Required, Unique)
-   `available`: `Boolean` (Default: `false`)
-   `user`: `ObjectId` (Ref: `User`, Required)

### Product

-   `name`: `String` (Required, Unique)
-   `available`: `Boolean` (Default: `false`)
-   `price`: `Number` (Default: `0`)
-   `description`: `String`
-   `user`: `ObjectId` (Ref: `User`, Required)
-   `category`: `ObjectId` (Ref: `Category`, Required)
