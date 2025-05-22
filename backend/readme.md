
### 1. **Signup Endpoint**
**URL**: `http://localhost:5000/api/auth/signup`  
**Method**: POST  
**Request Body**:  
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

#### Responses:
1. **Successful Signup**:
   ```json
   {
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODJkOTc2ZmNkNWVlNmQ5NzRlYzMzZTAiLCJpYXQiOjE3NDc4MTgzNTEsImV4cCI6MTc0NzgyMTk1MX0.H2Ro4NkOs7PCCWOcTxBfZNlpL5Yg-ow2JA30tQdAHgY",
       "user": {
           "email": "john@example.com",
           "name": "John Doe"
       }
   }
   ```

2. **Failed Signup (Email Already Exists)**:
   ```json
   {
       "success": false,
       "error": "Email already exists"
   }
   ```

---

### 2. **Login Endpoint**
**URL**: `http://localhost:5000/api/auth/login`  
**Method**: POST  

#### Request 1: Valid Credentials  
**Request Body**:  
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

**Response**:  
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODJkOTc2ZmNkNWVlNmQ5NzRlYzMzZTAiLCJpYXQiOjE3NDc4MTg2MDksImV4cCI6MTc0NzgyMjIwOX0.Uu2VeVbAtvWe2NXhUXRA79z53hwyxs254GWfBsdXYSQ",
    "user": {
        "email": "john@example.com",
        "name": "John Doe"
    }
}
```

#### Request 2: Invalid Credentials  
**Request Body**:  
```json
{
    "email": "john@example.com",
    "password": "password13"
}
```

**Response**:  
```json
{
    "success": false,
    "error": "Invalid credentials"
}
```

---

### 3. **User Endpoint**
**URL**: `http://localhost:5000/api/auth/user`  
**Method**: GET  
**Headers**:  
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODJkOTc2ZmNkNWVlNmQ5NzRlYzMzZTAiLCJpYXQiOjE3NDc4MTg2MDksImV4cCI6MTc0NzgyMjIwOX0.Uu2VeVbAtvWe2NXhUXRA79z53hwyxs254GWfBsdXYSQ
```

#### Responses:
1. **Successful Response**:  
   ```json
   {
       "user": {
           "_id": "682d976fcd5ee6d974ec33e0",
           "email": "john@example.com",
           "name": "John Doe",
           "__v": 0
       }
   }
   ```

2. **Failed Response (Invalid Token)**:  
   ```json
   {
       "error": "Invalid token"
   }
   ```

---

### 4. **Ships Endpoint**
**URL**: `http://localhost:5000/api/ships?name=Icon`  
**Method**: GET  

#### Response:
```json
{
    "name": "Icon of the Seas",
    "type": "Cruise",
    "imo": "1234567",
    "flag": "Bahamas"
}
```

---


- **Signup**: Allows user registration with name, email, and password. Returns a JWT token and user details on success or an error if the email already exists.
- **Login**: Authenticates users with email and password. Returns a JWT token and user details on success or an error for invalid credentials.
- **User**: Retrieves user information using a valid JWT token in the Authorization header. Returns user details or an error for invalid tokens.
- **Ships**: Retrieves ship information based on a query parameter (`name=Icon`). Returns ship details like name, type, IMO, and flag.


https://maritimeod.onrender.com/