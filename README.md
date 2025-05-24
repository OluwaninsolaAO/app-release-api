# App Release API

The App Release API a NestJS application designed to retrieve the latest application versions from both the Google Play Store and Apple App Store. This API provides a unified endpoint to easily track and monitor app releases across major mobile platforms.

## Features

- **Google Play Store Version Retrieval:** Fetches the current live version of Android applications.
- **Apple App Store Version Retrieval:** Fetches the current live version of iOS applications.
- **Unified API Endpoint:** A single, consistent API call to get versions for both platforms.
- **NestJS Framework:** Built with a robust, scalable, and maintainable Node.js framework.
- **Input Validation:** Ensures robust handling of app IDs and bundle IDs.
- **Error Handling:** Provides clear and informative error responses for invalid requests or issues with store communication.

## Technologies Used

- **[NestJS](https://nestjs.com/)**: A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- **[TypeScript](https://www.typescriptlang.org/)**: A superset of JavaScript that adds static types.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Loads environment variables from a `.env` file.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: `^20.x` or higher (LTS recommended)
- **npm** or **Yarn**: `^10.x` or higher for npm, or `^1.2x` for Yarn.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/OluwaninsolaAO/app-release-api.git](https://github.com/OluwaninsolaAO/app-release-api.git)
    cd app-release-api
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # OR
    yarn install
    ```

### Running the Application

1.  **Create a `.env` file:**
    Copy the `.env.example` file to `.env` and configure your environment variables.

    ```bash
    cp .env.example .env
    ```

2.  **Start the application in development mode:**

    ```bash
    npm run start:dev
    # OR
    yarn start:dev
    ```

    The API will be accessible at `http://localhost:5000` (or the port you configure).

3.  **Build for production:**

    ```bash
    npm run build
    # OR
    yarn build
    ```

4.  **Start the application in production mode:**

    ```bash
    npm run start:prod
    # OR
    yarn start:prod
    ```

    ### API Documentation

    The API documentation is available and can be accessed at the following URL:

    ```
    http://localhost:5000/v1/docs
    ```

    This provides detailed information about the available endpoints, request/response formats, and other relevant details to help you integrate with the API effectively.
