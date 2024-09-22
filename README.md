# docDispenser

## Project Overview

**docDispenser** is a comprehensive web application designed to streamline the process of document management and distribution. It provides a user-friendly interface for users to upload, manage, and share documents securely. The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and offers robust features for both administrators and regular users.

## Project Structure

The project is divided into two main parts: the frontend and the backend.

### Frontend

The frontend is built using React.js and is responsible for the user interface and client-side logic. It includes components for user authentication, document management, and user interactions.

- **src**
  - **components**: Contains reusable UI components like Navbar, Dropdown, ProfileDropdown,Spinner, etc.
  - **pages**: Contains page components like Login, Signup, Create Document, Delete document, Edit Document, ApproveRequest, etc.
  - **services**: Contains API service functions for making HTTP requests.
  - **App.js**: The main application component.
  - **index.js**: The entry point of the React application.

### Backend

The backend is built using Node.js and Express.js and is responsible for handling API requests, authentication, and database interactions.

- **server**
  - **controllers**: Contains controller functions for handling requests and business logic.
  - **models**: Contains Mongoose models for MongoDB collections.
  - **routes**: Contains route definitions for different API endpoints.
  - **utils**: Contains utility functions like mailSender.
  - **index.js**: The entry point of the Node.js application.

## Project Architecture

The project follows a typical MERN stack architecture:

1. **Frontend (React.js)**:

   - Handles the user interface and client-side logic.
   - Communicates with the backend via RESTful API calls.
   - Uses Redux for state management.

2. **Backend (Node.js + Express.js)**:

   - Handles API requests and business logic.
   - Manages user authentication and authorization.
   - Interacts with the MongoDB database using Mongoose.

3. **Database (MongoDB)**:
   - Stores user data, documents, and other application data.
   - Provides a flexible schema for document management.

By using docDispenser, organizations and individuals can significantly improve their document management processes, ensuring secure, efficient, and accessible document handling.

Visit at <a href="https://doc-dispenser.vercel.app" target="_blank">docDispenser</a>
