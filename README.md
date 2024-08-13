
# Express MongoDB API

Welcome to the **Express MongoDB API** repository! This project is a robust and scalable RESTful API built using Express.js and MongoDB. It provides a clean and efficient backend solution for managing data and handling various API requests in a Node.js environment.

## Table of Contents

- [Features](#features)
- [Badges](#badges)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Build](#build)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [Support](#support)
- [Feedback](#feedback)
- [Contributing](#contributing)
- [FAQ](#faq)
- [Acknowledgements](#acknowledgements)
- [Author](#author)
- [License](#license)


## Features

- **RESTful API**: Fully functional REST API endpoints for data management.
- **MongoDB Integration**: Utilizes MongoDB for data storage with efficient querying.
- **JWT Authentication**: Secure endpoints with JSON Web Token (JWT) based authentication.
- **Role-Based Access Control**: Manage user permissions with role-based access.
- **Validation Middleware**: Validate incoming requests using express-validator.
- **Logging Middleware**: Request logging for monitoring and debugging.
- **Error Handling**: Comprehensive error handling for robust API performance.
- **Unit Tests**: Includes unit tests for middleware and controller functions to ensure code reliability.

## Badges

![Node.js CI](https://github.com/jsuyog2/express-mongodb-api/actions/workflows/node.js.yml/badge.svg)

![License](https://img.shields.io/badge/license-MIT-blue.svg)

![Coverage](https://img.shields.io/codecov/c/github/jsuyog2/express-mongodb-api)

![Version](https://img.shields.io/github/package-json/v/jsuyog2/express-mongodb-api.svg)

![Maintenance](https://img.shields.io/maintenance/yes/2024.svg)

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Testing:** Jest
- **Validation:** express-validator
- **Environment Management:** dotenv


## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jsuyog2/express-mongodb-api.git
   cd express-mongodb-api
   ```

2. **Install Dependencies**

   Ensure you have Node.js and npm installed. Then run:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

Create a `.env` file in the root directory of the project. Configure the environment variables as described in [Environment Variables](#environment-variables).

## Usage

### Run Locally

Start the server

```bash
  npm run start
```


## Build

To build the project using Webpack, use the following commands:

### Production Build

To create an optimized production build:

```bash
  npm run build
```

This command will generate the bundled files optimized for production in the `dist` directory.

### Start the Server

After building the project, you can start the server with:

```bash
  npm run prod
```

This command builds the project (if not already built) and then starts the server using the generated `bundle.js` file in the `dist` directory.

## Environment Variables

To run this project, you need to configure the following environment variables in your `.env` file:

- **`PRODUCTION`**: Set to `true` for production mode or `false` for development mode.
- **`BASE_URL`**: The base URL for the application (e.g., `http://127.0.0.1:3000`).
- **`PORT`**: The port on which the application will run (e.g., `3000`).
- **`CORS_LIST`**: Comma-separated list of allowed origins for CORS (e.g., `http://localhost:4200`).
- **`JWT_SECRET`**: Secret key for signing JWT tokens.
- **`JWT_PUBLICKEY_PATH`**: Path to the public key file for JWT verification.
- **`JWT_PRIVATEKEY_PATH`**: Path to the private key file for JWT signing.
- **`SESSION_SECRET`**: Secret key used for session management.
- **`MONGO_URI`**: Connection string for MongoDB database (e.g., `mongodb://localhost:27017/mydatabase`).
- **`MAIL_HOST`**: SMTP server host for sending emails.
- **`MAIL_PORT`**: SMTP server port for sending emails (e.g., `465`).
- **`MAIL_USERNAME`**: SMTP server username.
- **`MAIL_PASSWORD`**: SMTP server password.

Here’s an example `.env` file with the required variables:

```dotenv
PRODUCTION=false
BASE_URL=http://127.0.0.1:3000
PORT=3000
CORS_LIST=http://localhost:4200

JWT_SECRET=api_secret_key
JWT_PUBLICKEY_PATH=E:/Clouds/express-mongodb-api/key/public.key
JWT_PRIVATEKEY_PATH=E:/Clouds/express-mongodb-api/key/private.key

SESSION_SECRET=api_session_secret

MONGO_URI=mongodb://localhost:27017/mydatabase

MAIL_HOST=smtp.example.com
MAIL_PORT=465
MAIL_USERNAME=example@example.com
MAIL_PASSWORD=your_email_password
```

Ensure that you replace the placeholder values with your actual configuration details.

## Generating Keys Using OpenSSL

Now you need to create Private and Public Key to generate a Token.

1. **Generate an RSA private key, of size 2048, and output it to a file named `private.key`:**

   ```bash
   openssl genrsa -out key/private.key 2048
   ```

2. **Extract the public key from the key pair, which can be used in a certificate:**

   ```bash
   openssl rsa -in key/private.key -outform PEM -pubout -out key/public.key
   ```

   **Note:** Make sure both `key/private.key` and `key/public.key` are saved in the `key` folder.

## API Endpoints

This section provides an overview of the available API endpoints for the application. For detailed request and response formats, refer to the [Postman Documentation](https://documenter.getpostman.com/view/30249900/2sA3s3Jrw9).

### Authentication

- **Login**
  - **Endpoint:** `POST /login`
  - **Description:** Authenticates a user and returns a JWT token.
  - **Body:**
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Responses:**
    - **200 OK:** Success
    - **401 Unauthorized:** Invalid credentials

- **Signup**
  - **Endpoint:** `POST /signup`
  - **Description:** Registers a new user.
  - **Body:**
    ```json
    {
      "username": "string",
      "password": "string",
      "email": "string"
    }
    ```
  - **Responses:**
    - **201 Created:** Success
    - **400 Bad Request:** Validation errors

- **Logout**
  - **Endpoint:** `POST /logout`
  - **Description:** Logs out the user and invalidates the session.
  - **Responses:**
    - **200 OK:** Success

### User Management

- **Get User Profile**
  - **Endpoint:** `GET /user`
  - **Description:** Retrieves the authenticated user's profile.
  - **Headers:**
    - **Authorization:** Bearer token
  - **Responses:**
    - **200 OK:** Success
    - **401 Unauthorized:** Invalid token

- **Update User Profile**
  - **Endpoint:** `PUT /user`
  - **Description:** Updates the authenticated user's profile information.
  - **Headers:**
    - **Authorization:** Bearer token
  - **Body:**
    ```json
    {
      "username": "string",
      "email": "string"
    }
    ```
  - **Responses:**
    - **200 OK:** Success
    - **400 Bad Request:** Validation errors

---

For further details and examples, please refer to the [Postman Collection](https://documenter.getpostman.com/view/30249900/2sA3s3Jrw9).

## Testing

To run the unit tests for the project, use:

```bash
npm test
```

This command will execute all the tests defined in the `test` directory.


## Roadmap

The roadmap outlines planned features and improvements for the Express MongoDB API project. We aim to continuously enhance the project based on user feedback and evolving requirements.

### Planned Features

- **Enhanced Security**: Implement advanced security features like rate limiting and IP whitelisting.
- **User Roles and Permissions**: Expand role-based access control with more granular permissions.
- **API Rate Limiting**: Introduce rate limiting to prevent abuse and ensure fair usage.
- **Documentation Improvements**: Enhance API documentation with more detailed examples and usage guidelines.
- **Performance Optimizations**: Optimize query performance and server response times.
- **Internationalization (i18n)**: Add support for multiple languages to accommodate global users.
- **Additional Endpoints**: Add new endpoints based on user needs and project requirements.

### Future Improvements

- **Docker

 Support**: Containerize the application for easier deployment and scalability.
- **Monitoring and Analytics**: Integrate monitoring and analytics tools to track API usage and performance.
- **GraphQL Support**: Explore adding GraphQL support for more flexible querying options.
- **Admin Dashboard**: Develop an admin dashboard for managing users and monitoring application health.

We welcome contributions and suggestions from the community. Feel free to open issues or submit pull requests to help us improve the project.

## Support

For any issues or questions, please create a [GitHub issue](https://github.com/jsuyog2/express-mongodb-api/issues) or reach out to us via email at jsuyog2@gmail.com.

## Feedback

We value your feedback! If you have any suggestions or comments, please share them with us. Your input helps us improve the project and better serve our users.

## Contributing

We welcome contributions from the community! If you’d like to contribute to this project, please follow these steps:

1. **Fork the Repository**: Create a personal copy of the repository by forking it.
2. **Create a Branch**: Create a new branch for your changes.
3. **Make Changes**: Implement your changes or additions.
4. **Submit a Pull Request**: Open a pull request with a description of your changes.

Please refer to the [contributing guidelines](CONTRIBUTING.md) for more detailed instructions.

## FAQ

**Q: How do I configure the application for production use?**

A: Ensure that you set the `PRODUCTION` environment variable to `true` and configure your environment variables appropriately for production.

**Q: What should I do if I encounter issues with MongoDB connection?**

A: Check your `MONGO_URI` environment variable for accuracy. Ensure that MongoDB is running and accessible from your application.

**Q: How can I contribute to the project?**

A: Follow the [contributing guidelines](CONTRIBUTING.md) to submit your contributions. We appreciate any help you can provide!

## Acknowledgements

We would like to thank the contributors and the open-source community for their support and resources that made this project possible.

## Author

**Suyog Dinesh Jadhav**

- Email: jsuyog2@gmail.com

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.