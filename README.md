# keskpank

## Instructions
1. Install Node, npm if they're not already installed
1. `npm install`
1. Copy .env file from the .env.example. Do not rename!
1. Modify MONGO_URI in .env file to your database. You can use [Mongo Atlas](https://www.mongodb.com/cloud/atlas) service for your database.
1. Run `npm run dev`
1. Send `POST` request to `http://localhost:3000/banks` with `{"name": "barBank", "transactionUrl": "foo}` to test. With curl, its `curl -v http://localhost:3000/banks --data-binary '{"name": "barBank", "transactionUrl": "foo}' -H 'Content-Type: application/json'` 
   