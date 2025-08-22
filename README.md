AI-Text-to-Image

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to generate AI-based images from text prompts. Features include JWT authentication, credit-based generation, and PayPal integration for purchasing credits.

Features

User authentication with JWT

Generate AI images based on text prompts

Credit-based image generation system

PayPal integration for buying credits

Full-stack architecture with React frontend and Node.js backend

MongoDB for data storage

Getting Started
Prerequisites

Node.js and npm installed

MongoDB database (local or cloud)

PayPal developer account (for API credentials)

Installation

Clone the repository:

git clone https://github.com/joshu1024/AI-Text-to-Image-.git


Navigate to the project directory:

cd AI-Text-to-Image-


Install server dependencies:

cd server
npm install


Install client dependencies:

cd ../client
npm install

Configuration

Create a .env file in the server folder and add your environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

Running the Application
Start the server:
cd server
npm start

Start the client:
cd client
npm start


The app should now be running locally, accessible at http://localhost:3000.

Usage

Register or log in to your account

Purchase credits using PayPal

Use your credits to generate AI-based images from text prompts

View and manage your generated images

Folder Structure
AI-Text-to-Image-
├── client          # React frontend code
├── server          # Express backend code
└── .gitignore      # Git ignore rules

Contributing

Feel free to fork the project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

License

This project is licensed under the MIT License.
