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

### Missing Fields

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": "All fields are required"
  }
  ```

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