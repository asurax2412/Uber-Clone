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