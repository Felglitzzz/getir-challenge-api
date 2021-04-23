# Getir-Challenge-API

## Description
A RESTful API with a single endpoint that fetches the data in the provided mongo db collection

## Technologies Used

* [NodeJS](https://nodejs.org/en/) - A Javascript runtime built on chrome V8 engine that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJs](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [Mongoose](https://mongoosejs.com//) - An ODM for Node.js that provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
* [MongoDb](https://www.mongodb.com//) - A powerful, open source object-relational database system.
* [Eslint](https://eslint.org/) - an open source JavaScript linting utility
* [Babel](https://babeljs.io/) - Babel is a JavaScript compiler



## Running the Server Locally

```bash
# Ensure Node and MongoDb are installed

# clone the repo
$ git clone https://github.com/Felglitzzz/getir-challenge-api.git

# cd to getir challenge directory
$ cd ~/path/to/getir-challenge-api

# Install Dependencies
$ yarn install

# Start mongod server
$ Run mongod

# Create .env file and pattern it after .env-sample file.
$ touch .env

# Run the application
yarn start:dev

# Navigate
Navigate to the only endpoint `http://localhost:3000/api/v1/records`
Pass the necessary payload to the request body
You can pass skip and limit parameters too
```

## Take a Peak
API is hosted on heroku via this [link](https://getir-api-chal.herokuapp.com/api/v1/records)
- It can filter based on the requested body passed

  ```javascript
      "startDate": "2016-01-26",
      "endDate": "2018-02-02",
      "minCount": 2700,
      "maxCount": 3000
  ```
- It is paginated. If pagination parameters are not passed, it returns maximum of 50 records
  
  ```javascript
  /GET <BaseURL>/api/v1/records?skip=2&limit=2 // limit and skip params passed

  Sample Response

  {
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "key": "XCiSazeS",
            "createdAt": "2016-12-13T18:58:33.864Z",
            "totalCount": 2906
        },
        {
            "key": "kzSqsBrJ",
            "createdAt": "2016-12-02T15:07:30.465Z",
            "totalCount": 2803
        }
    ],
    "totalRecordCount": 63 // total record count for pagination
  }
  ```

## Testing
- Supertest
- Jest

```javascript
// Run test using
yarn start:dev
```