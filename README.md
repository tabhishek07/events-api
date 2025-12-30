# Events API

A backend REST API for managing events, built using Node.js, Express, and the native MongoDB driver.

## Features

- Create an event with image upload
- Fetch all events
- Pagination support
- Fetch event by ID
- Update event
- Delete event

## Tech Stack

- Node.js
- Express.js
- MongoDB (Native Driver)
- Multer
- dotenv

> Note: Mongoose is NOT used as per the assignment requirement.

## Project Structure

events-api/
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── utils/
│ ├── db.js
│ └── app.js
├── uploads/
├── .env.example
├── .gitignore
└── README.md

## Setup Instructions

### 1. Clone the repository
git clone <repository-url>
cd events-api

### 2. Install dependencies
npm install

### 3. Environment variables
Create a `.env` file using `.env.example` as reference.

### 4. Start the server
node src/app.js

## API Endpoints

Base URL:

### Create Event
POST /api/v3/app/events

### Get All Events
GET /api/v3/app/events  
GET /api/v3/app/events?page=1&limit=5

### Get Event by ID
GET /api/v3/app/events/:id

### Update Event
PUT /api/v3/app/events/:id

### Delete Event
DELETE /api/v3/app/events/:id

## Image Upload

- Images are uploaded using Multer
- Stored locally in the `uploads/` directory
- Only the file path is stored in MongoDB


## Assignment Constraints Followed

- Native MongoDB driver used
- No Mongoose
- No fixed schema
- MongoDB `_id` used as the primary identifier

  
## Status

Backend assignment completed successfully.



