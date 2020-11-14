# User Devices API

This is a Node/Express/MongoDB REST API for user devices that uses JWT authentication. All devices endpoints are protected and each registered user has their own devices. It is the API ONLY. No UI.

## Running

```bash
   # Runs on http://localhost:3000
   # DBUrl mongodb://localhost:27017/userDevices
```

Install Dependencies
`npm install`

Start Server
`npm start`

Start Server on Development
`npm run dev`

Run Tests
`npm test`

# APIs Documentation (Postman)

https://documenter.getpostman.com/view/8432033/TVRha8RW

# API Usage & Endpoints

## Register a User [POST /api/auth/register]

- Request: Add user and request JSON web token

  - Headers

        Content-type: application/json

  - Body

            {
              "username": "",
              "email": "",
              "password": ""
            }

- Response: 201 (application/json)

  - Body

          {
            "message": "user created successfully",
            "token": ""
          }

## Login with a User [POST /api/auth/login]

- Request: Login with credentials to recieve a JSON web token

  - Headers

        Content-type: application/json

  - Body

            {
              "email": "",
              "password": ""
            }

- Response: 200 (application/json)

  - Body

          {
            "message": "Valid login",
            "token": ""
          }

## Get User Devices [GET /api/devices]

- Request: Get all devices of a specific user

  - Headers

        Authorization: TOKEN

* Response: 200 (application/json)

  - Body

          {
            "message": "Devices fetched succesfully",
            "devices": []
          }

## Add New Device [POST /api/devices/]

- Request: Add a new device

  - Headers

        Authorization: TOKEN
        Content-type: application/json

  - Body

            {
              "sensorType": "hygrometer"
            }

- Response: 201 (application/json)

  - Body

          {
            "message": "Device created successfully",
            device: {}
          }

## Get Device Data [GET /api/devices/:deviceId]

- Request: Get device data

  - Parameters

    - deviceId: id of the device.

  - Headers

        Authorization: TOKEN
        Content-type: application/json

- Response: 200 (application/json)

  - Body

          {
            "message": "Succes",
            "deviceData": []
          }

## add Device Data [PUT /api/devices/:deviceId]

- Request: Update existing device

  - Parameters

    - deviceId: id of the device.

  - Headers

        Authorization: TOKEN
        Content-type: application/json

  - Body

            {
              "typeOfData": "humidity",
              "value": 20
            }

- Response: 200 (application/json)

  - Body

          {
            "message": "Device data added succesfully",
            "storedData": {}
          }
