# User Registration API Documentation

## Endpoint

`POST /users/register`

---

## Description

Registers a new user. Validates the input, hashes the password, and stores the user in the database. Returns a JWT token and user data on success.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string, required, min 2 chars",
    "lastname": "string, optional, min 2 chars"
  },
  "email": "string, required, valid email",
  "password": "string, required, min 6 chars"
}
```

### Field Requirements

- **fullname.firstname**: Required, string, at least 2 characters.
- **fullname.lastname**: Optional, string, at least 2 characters if provided.
- **email**: Required, must be a valid email address.
- **password**: Required, string, at least 6 characters.

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "JWT token string",
    "user": {
      "_id": "user id",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string"
    }
  }
  ```
- **Explanation for End User:**
  - You will receive a `token` (JWT) that you should save and use as an Authorization header (`Bearer <token>`) for authenticated requests.
  - The `user` object contains your registered details.

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field name",
        "location": "body"
      }
    ]
  }
  ```
- **Explanation for End User:**
  - If your input data is invalid or missing, you will receive an `errors` array describing what needs to be fixed (e.g., missing email, invalid password length).

### Missing Fields

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": "All fields are required"
  }
  ```
- **Explanation for End User:**
  - If you omit required fields, you will receive an error message indicating that all fields are required.

---

## Example Request

```json
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice@example.com",
  "password": "securePass123"
}
```

---

## Notes

- Set `Content-Type: application/json` in the request header.
- The returned JWT token can be used for authentication in future requests.

---

# Captain Registration API Documentation

## Endpoint

`POST /captains/register`

---

## Description

Registers a new captain (driver). Validates the input, hashes the password, and stores the captain in the database. Returns a JWT token and captain data on success.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string, required, min 2 chars",
    "lastname": "string, required, min 2 chars"
  },
  "email": "string, required, valid email",
  "password": "string, required, min 6 chars",
  "vehicle": {
    "color": "string, required, min 3 chars",
    "plate": "string, required, min 3 chars",
    "capacity": "number, required, min 1",
    "vehicleType": "string, required, one of: car, bike, auto"
  }
}
```

### Field Requirements

- **fullname.firstname**: Required, string, at least 2 characters.
- **fullname.lastname**: Required, string, at least 2 characters.
- **email**: Required, must be a valid email address.
- **password**: Required, string, at least 6 characters.
- **vehicle.color**: Required, string, at least 3 characters.
- **vehicle.plate**: Required, string, at least 3 characters.
- **vehicle.capacity**: Required, number, at least 1.
- **vehicle.vehicleType**: Required, string, must be one of: `car`, `bike`, `auto`.

---

## Example Request

```json
{
  "fullname": {
    "firstname": "Bob",
    "lastname": "Driver"
  },
  "email": "bob.driver@example.com",
  "password": "securePass123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "JWT token string",
    "captain": {
      "_id": "captain id",
      "fullname": {
        "firstname": "Bob",
        "lastname": "Driver"
      },
      "email": "bob.driver@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```
- **Explanation for End User:**
  - You will receive a `token` (JWT) that you should save and use as an Authorization header (`Bearer <token>`) for authenticated requests.
  - The `captain` object contains your registered details.

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field name",
        "location": "body"
      }
    ]
  }
  ```
- **Explanation for End User:**
  - If your input data is invalid or missing, you will receive an `errors` array describing what needs to be fixed (e.g., missing email, invalid password length).

### Missing Fields

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": "All fields are required"
  }
  ```
- **Explanation for End User:**
  - If you omit required fields, you will receive an error message indicating that all fields are required.

---

## /users/profile

### Endpoint

`GET /users/profile`

### Description

Returns the authenticated user's profile information. Requires a valid JWT token in the `Authorization` header or as a cookie.

### Request Example

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "user id",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice@example.com"
  }
  ```

### Unauthorized Response

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

## /users/logout

### Endpoint

`GET /users/logout`

### Description

Logs out the authenticated user by blacklisting the JWT token and clearing the authentication cookie.

### Request Example

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Unauthorized Response

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```