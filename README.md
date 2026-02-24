# FIXR BACKEND

## Technologies Used
    - Node.js v22.16.0
    - Express.js
    - MongoDB + Mongoose
    - npm

## How to run the server
    - npm install
    - npm start

## MongoDB Connection (Database)
    - mongoose.connect(process.env.MONGO_URI)

## Project Structure
        controllers/
        middlewares/
        models/
        routes/
        uploads/
        utils/
        .env.example
        .gitignore
        package.json
        server.js

## Cross-origin resource sharing (CORS) configuration
    - origin: process.env.CLIENT_URL,

## Logs
    - Logs are done with console.log

## API Documentation
    - ![](./docs/openapi.yaml)
