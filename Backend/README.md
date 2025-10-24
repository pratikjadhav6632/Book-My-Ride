# Book-My-Ride API Documentation

## User Authentication

### Login

#### `POST /user/login`

Authenticate a user and return a JWT token.

##### Request Body

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

##### Request Parameters

| Parameter | Type   | Required | Description                                      | Validation Rules                                      |
|-----------|--------|----------|--------------------------------------------------|------------------------------------------------------|
| email     | String | Yes      | User's registered email address                  | Must be a valid email format                         |
| password  | String | Yes      | User's password                                  | Minimum 6 characters                                 |

##### Responses

###### 1. Success (200 OK)

**Example Request:**
```http
POST /user/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Example Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY0YjUxODI0ZTY0ZTAwMTk4ZTBhYzAiLCJpYXQiOjE2OTExMjM0NTUsImV4cCI6MTY5MTIwOTg1NX0.2Q3q4w5s6d7f8g9h0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7A8B9C0D1E2F",
  "user": {
    "_id": "64f4b51824e64e00198e0ac0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

###### 2. Validation Error (400 Bad Request)

**Example Request (with invalid data):**
```http
POST /user/login
Content-Type: application/json

{
  "email": "invalid-email",
  "password": "123"
}
```

**Example Response:**
```json
{
  "errors": [
    {
      "value": "invalid-email",
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "value": "123",
      "msg": "Password is required and must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

###### 3. Authentication Error (401 Unauthorized)

**Example Response (invalid credentials):**
```json
{
  "message": "Invalid email or password"
}
```

##### Error Responses

| Status Code | Description                           | Possible Reasons                                     |
|-------------|---------------------------------------|-----------------------------------------------------|
| 400         | Bad Request                           | Invalid input data, validation failed               |
| 401         | Unauthorized                          | Invalid email or password                           |
| 500         | Internal Server Error                 | Server error during authentication                  |

---

## User Registration

### `POST /user/register`

Register a new user in the system.

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

#### Request Parameters

| Parameter | Type   | Required | Description                                      | Validation Rules                                      |
|-----------|--------|----------|--------------------------------------------------|------------------------------------------------------|
| email     | String | Yes      | User's email address                             | Must be a valid email format                         |
| password  | String | Yes      | User's password                                  | Minimum 6 characters                                 |
| fullname  | Object | Yes      | Contains user's name information                 |                                                      |
| firstname | String | Yes      | User's first name                                | Minimum 3 characters                                 |
| lastname  | String | Yes      | User's last name                                 | Minimum 3 characters                                 |

#### Responses

##### 1. Success (201 Created)

**Example Request:**
```http
POST /user/register
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepassword123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

**Example Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY0YjUxODI0ZTY0ZTAwMTk4ZTBhYzAiLCJpYXQiOjE2OTExMjM0NTUsImV4cCI6MTY5MTIwOTg1NX0.2Q3q4w5s6d7f8g9h0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7A8B9C0D1E2F",
  "user": {
    "_id": "64f4b51824e64e00198e0ac0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

##### 2. Validation Error (400 Bad Request)

**Example Request (with invalid data):**
```http
POST /user/register
Content-Type: application/json

{
  "email": "invalid-email",
  "password": "123",
  "fullname": {
    "firstname": "Jo",
    "lastname": "Do"
  }
}
```

**Example Response:**
```json
{
  "errors": [
    {
      "value": "invalid-email",
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "value": "Jo",
      "msg": "First Name must be at least 3 character long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "value": "123",
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

##### 3. Conflict Error (409 Conflict)

**Example Response (when email already exists):**
```json
{
  "error": {
    "code": "DUPLICATE_EMAIL",
    "message": "Email already registered",
    "details": "The email 'john.doe@example.com' is already in use."
  }
}
```

##### 4. Server Error (500 Internal Server Error)

**Example Response:**
```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred while processing your request",
    "requestId": "req_1234567890abcdef"
  }
}
```

#### Error Responses

| Status Code | Description                           | Possible Reasons                                     |
|-------------|---------------------------------------|-----------------------------------------------------|
| 400         | Bad Request                           | Invalid input data, validation failed               |
| 409         | Conflict                              | Email already exists                                |
| 500         | Internal Server Error                 | Server error during user creation                   |

#### Notes

- The password is automatically hashed before being stored in the database
- The response includes a JWT token that should be used for authenticated requests
- The user object in the response does not include the hashed password for security reasons

...existing code...

## Captain Routes

Base path: /captain

### POST /captain/register

Register a new captain.

Request body (JSON)
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "captain@example.com",
  "password": "securepassword123",
  "vehical": {
    "color": "White",
    "plate": "TN01AB1234",
    "capacity": 4,
    "vehicalType": "sedan"
  }
}
```

Validation rules
- fullname.firstname: string, required, min 3 chars
- fullname.lastname: string, required, min 3 chars
- email: valid email, required
- password: string, required, min 8 chars
- vehical.color: string, required, min 3 chars
- vehical.plate: string, required, min 3 chars
- vehical.capacity: integer, required, min 1
- vehical.vehicalType: one of ["XUV","sedan","Motor","car","auto"]

Success (201 Created)
Example response:
```json
{
  "message": "<JWT token string>",
  "captain": {
    "_id": "64f4b51824e64e00198e0ac0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "socketId": null,
    "status": "inactive",
    "role": null,
    "vehical": {
      "color": "White",
      "plate": "TN01AB1234",
      "capacity": 4,
      "vehicalType": "sedan"
    },
    "location": {
      "lat": null,
      "lang": null
    }
  }
}
```
Notes: response `message` contains the generated JWT token. The stored password is not returned.

Errors
- 400 Bad Request
  - Validation errors (returns array of validation error objects)
  - Captain already exists: `{ "message": "Captain already exists" }`
- 500 Internal Server Error
  - Unexpected server / DB errors

Implementation notes
- Controller: controllers/captain.controller.js -> registerCaptain
- Router: routes/captain.routes.js validates inputs using express-validator
- Model: models/captain.model.js defines schema, password hashing helpers, and generateAuthToken method
