# Node.js implementation of a RedHat demo Java application.
This Node.js API is a replica of the Java version (no authentication - to be added later). This API is built to work with the Aerogear Aerodoc application. The endpoint URL in the dataservice.js file in the Aerodoc project must be updated to point at the URL of this API. The endpoint URL must also be updated in the lead controller of the Aerodoc project. This API will be used as a reference to build a microservices version of this API.

## Running 

1. Install Mongo

    Mongo needs to be installed and running.
    
2. Install dependencies

        npm install

3. Populate the database with the sales agents for logging into the system.

        npm run populateDb

4. Start the server on port 3000

        npm start
    
## Running Tests

       npm test

## Running Coverage 

      npm run coverage
      
## The API 
  
   API docs can be found at 'localhost:3000/docs'
   
