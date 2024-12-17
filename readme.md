

[CursorSurroundingLines]
[/CursorSurroundingLines]

# Backend Project README
==========================

Table of Contents
-----------------

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Dependencies](#dependencies)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Functions and Modules](#functions-and-modules)
7. [Database](#database)
8. [Security](#security)
9. [Testing](#testing)
10. [Deployment](#deployment)

## Overview

This is a comprehensive README document for the backend project. The project is built using Node.js, Express.js, and various dependencies to provide a robust and scalable backend infrastructure.

## Project Structure

The project is organized into the following directories:

* `app`: Contains the main application code, including routes, controllers, and models.
* `functions`: Contains reusable functions and modules for tasks such as AI processing and file handling.
* `lib`: Contains library code for tasks such as PDF parsing and embedding generation.
* `routes`: Contains route handlers for API endpoints.
* `server`: Contains the main server code, including setup and configuration.

## Dependencies

The project depends on the following packages:

* `express`: For building the web server and handling requests.
* `axios`: For making HTTP requests to external APIs.
* `dotenv`: For loading environment variables from a .env file.
* `morgan`: For logging HTTP requests.
* `cors`: For enabling CORS support.
* `multer`: For handling file uploads.
* `pdfreader`: For parsing PDF files.
* `cohere-ai`: For generating embeddings and processing AI tasks.
* `openai`: For interacting with the OpenAI API.
* `google/generative-ai`: For interacting with the Google Generative AI API.

## Environment Variables

The project uses the following environment variables:

* `PORT`: The port number to listen on.
* `OPEN_API_KEY`: The OpenAI API key.
* `COHERE_API_KEY`: The Cohere API key.
* `GEMINI_API_KEY`: The Google Generative AI API key.

## API Endpoints

The project provides the following API endpoints:

* `GET /api/process`: Processes a text input using the Cohere AI model.
* `POST /api/upload`: Uploads a file and generates embeddings using the Cohere AI model.
* `GET /api/fetch`: Retrieves relevant documents based on a user query.
* `POST /api/create-thread`: Creates a new thread using the OpenAI API.
* `POST /api/run-thread`: Runs a thread using the OpenAI API.
* `GET /api/retrive-thread-messages`: Retrieves messages from a thread using the OpenAI API.

## Functions and Modules

The project uses the following functions and modules:

* `getCohereChat`: Generates a response using the Cohere AI model.
* `getChatCompletionGPT`: Generates a response using the OpenAI API.
* `getChatCompletionGemini`: Generates a response using the Google Generative AI API.
* `createOpenAIThread`: Creates a new thread using the OpenAI API.
* `addMessageToThread`: Adds a message to a thread using the OpenAI API.
* `runOpenAIThread`: Runs a thread using the OpenAI API.
* `retriveThreadMessages`: Retrieves messages from a thread using the OpenAI API.
* `parsePdf`: Parses a PDF file using the `pdfreader` library.
* `generateEmbeddings`: Generates embeddings using the Cohere AI model.

## Database

The project does not use a database.

## Security

The project uses the following security measures:

* CORS support is enabled to allow cross-origin requests.
* Environment variables are used to store sensitive API keys.
* HTTPS is not enabled by default, but can be configured using a reverse proxy or SSL certificate.

## Testing

The project does not include tests.

## Deployment

The project can be deployed using the following steps:

1. Install dependencies using `npm install`.
2. Start the server using `npm start`.
3. Configure environment variables using a .env file or environment variables.
4. Deploy the server to a production environment using a reverse proxy or containerization.


## API Documentation

### Process Route

The process route is responsible for handling requests related to text processing.

#### Create Thread

Creates a new thread.

##### Request

```bash
curl -X POST \
  http://localhost:8000/api/process/create-thread \
  -H 'Content-Type: application/json' \
  -d '{"userId": "12345"}'
```

##### Response

```json
{
  "success": true,
  "message": "Thread created successfully."
}
```

#### Run Thread

Runs a thread.

##### Request

```bash
curl -X POST \
  http://localhost:8000/api/process/run-thread \
  -H 'Content-Type: application/json' \
  -d '{"threadId": "12345", "isGPTResponse": true, "message": "Hello, world!", "relevantText": "This is the relevant text."}'
```

##### Response

```json
{
  "success": true,
  "message": "Thread run successfully."
}
```

#### Create and Run Thread

Creates and runs a thread.

##### Request

```bash
curl -X POST \
  http://localhost:8000/api/process/create-thread-and-run \
  -H 'Content-Type: application/json' \
  -d '{"message": "Hello, world!", "relevantText": "This is the relevant text."}'
```

##### Response

```json
{
  "success": true,
  "message": "Thread created and run successfully."
}
```

#### Retrieve Thread Messages

Retrieves the messages of a thread.

##### Request

```bash
curl -X POST \
  http://localhost:8000/api/process/retrive-thread-messages \
  -H 'Content-Type: application/json' \
  -d '{"threadId": "12345"}'
```

##### Response

```json
{
  "success": true,
  "message": "Thread messages retrieved successfully."
}
```

### Upload Route

The upload route is responsible for handling file uploads.

#### Generate Embeddings

Generates embeddings for a document.

##### Request

```bash
curl -X POST \
  http://localhost:8000/api/upload/generate-embeddings \
  -H 'Content-Type: application/json' \
  -d '{"file": "@path/to/file.pdf"}'
```

##### Response

```json
{
  "success": true,
  "message": "Embeddings generated successfully."
}
```

### Fetch Route

The fetch route is responsible for handling requests related to fetching data.

#### Find Relevant Documents

Finds relevant documents based on a user's question.

##### Request

```bash
curl -X POST \
  http://localhost:8000/api/fetch/find-relevant-documents \
  -H 'Content-Type: application/json' \
  -d '{"userQuestion": "What is the meaning of life?", "embeddingsDocs": [{"docId": "12345", "embedding": [0.1, 0.2, 0.3]}]}'
```

##### Response

```json
{
  "success": true,
  "message": "Relevant documents found successfully."
}
```

## Environment Variables

The following environment variables are required for this project:

* `OPEN_API_KEY`: the API key for OpenAI
* `COHERE_API_KEY`: the API key for Cohere AI
* `GEMINI_API_KEY`: the API key for Google's Generative AI API
* `PORT`: the port number for the server

These environment variables can be set in a .env file in the root of the project.

## Starting the Server

To start the server, run the following command : `npm start`