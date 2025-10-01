
# User API Documentation

## Register User

### Endpoint
`POST /users/register`

### Description
Registers a new user in the system. Validates input, hashes the password, stores the user in the database, and returns a JWT token on success.

### Request Body
Send a JSON object with the following structure:
```
{
  "fullname": {
    "firstname": "<string, min 3 chars>",
    "lastname": "<string, min 3 chars>" // optional but recommended
  },
  "email": "<string, valid email>",
  "password": "<string, min 6 chars>"
}
```

#### Example
```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Responses

#### Success
- **Status Code:** `201 Created`
- **Body:**
```
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    ...
  }
}
```

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
```
{
  "errors": [
    {
      "type": "field",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
    // ...other errors
  ]
}
```

#### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
```
{
  "message": "<error message>"
}
```

### Notes
- `fullname.firstname` is required and must be at least 3 characters.
- `email` must be a valid email address and unique.
- `password` must be at least 6 characters.
- On success, a JWT token is returned for authentication.

---

## Login User

### Endpoint
`POST /users/login`

### Description
Authenticates a user with email and password. Returns a JWT token and user data on success.

### Request Body
Send a JSON object with the following structure:
```
{
  "email": "<string, valid email>",
  "password": "<string, min 6 chars>"
}
```

#### Example
```
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    ...
  }
}
```

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
```
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid email address",
      "path": "email",
      "location": "body"
    }
    // ...other errors
  ]
}
```

#### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
```
{
  "message": "Invalid email or password"
}
```

#### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
```
{
  "message": "<error message>"
}
```

### Notes
- `email` must be a valid email address.
- `password` must be at least 6 characters.
- On success, a JWT token is returned for authentication.
