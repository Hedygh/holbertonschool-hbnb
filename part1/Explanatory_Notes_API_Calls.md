# 🧾 TASK 2 — Sequence Diagrams for API Calls
## Explanatory Notes

This document describes, for each API call:  
1) a concise use case description,  
2) the key steps involved, and  
3) the role of each layer (Presentation, Business Logic, Persistence) in processing the request.

---

# 1️⃣ API Call — User Registration
## 🎯 Objective
Allow a user to create a new account in the system.

## 🧩 Brief Description
When a client sends a registration request, the system:
- receives the user information  
- validates the request format  
- applies business rules (e.g., unique email)  
- creates a `User` object  
- persists (saves) the new user  
- returns a response confirming the creation  

## ✅ Key Steps
1. The client sends a `POST /users` request with registration data (e.g., first_name, last_name, email, password).  
2. The API validates the request structure (valid JSON, required fields, consistent types).  
3. The API calls the `Facade` to execute the "create user" use case.  
4. The `Facade` applies business rules:  
   - verify that the email is not already used  
   - validate fields according to business constraints  
   - create the `User` entity (inheriting from `BaseModel`)  
5. The `Facade` asks the Persistence layer to store the user.  
6. The Persistence layer saves the data and returns the created object or identifier.  
7. The `Facade` returns the result to the API.  
8. The API sends a response back to the client (success or error).

## 🔁 Interaction Flow and Layer Responsibilities
**Presentation Layer**: receives the request, validates its format, calls the `Facade`, returns the HTTP response.  
**Business Logic Layer**: through the `Facade`, applies business rules (e.g., unique email), creates the `User` entity, orchestrates the operation.  
**Persistence Layer**: stores the user and returns confirmation of the save operation.

## 🎯 Purpose of the Sequence Diagram
To demonstrate that registration goes through the `Facade` (no direct access to models or persistence from the API) and that business logic is centralized in the Business Logic Layer.

---

# 2️⃣ API Call — Place Creation
## 🎯 Objective
Allow a user to create a new `Place` (listing/property), associated with an owner and optionally linked to amenities.

## 🧩 Brief Description
When a client creates a place, the system:
- receives the place information  
- validates fields and constraints  
- verifies that the owner exists  
- associates amenities if provided  
- persists the place  
- returns the created place  

## ✅ Key Steps
1. The client sends a `POST /places` request containing data (title, description, price, latitude, longitude, owner_id, amenities...).  
2. The API validates the structure (JSON format, types, required fields).  
3. The API calls the `Facade` for the "create place" use case.  
4. The `Facade` applies business rules:  
   - verify that the `User` owner exists  
   - validate `price`, `latitude`, `longitude`  
   - create the `Place` entity  
   - if amenities are provided: verify their existence and associate them (many-to-many)  
5. The `Facade` requests the Persistence layer to save the place (and place–amenity associations if necessary).  
6. The Persistence layer writes the data and returns the result.  
7. The `Facade` returns the created object to the API.  
8. The API returns the response to the client.

## 🔁 Interaction Flow and Layer Responsibilities
**Presentation Layer**: receives and validates the request format, calls the `Facade`.  
**Business Logic Layer**: verifies owner existence, validates constraints, creates `Place`, manages associations with `Amenity`.  
**Persistence Layer**: saves the `Place` and manages many-to-many relationships.

## 🎯 Purpose of the Sequence Diagram
To show that place creation is a business orchestration process (owner + constraints + amenities) and that all interactions go through the `Facade`.

---

# 3️⃣ API Call — Review Submission
## 🎯 Objective
Allow a user to submit a `Review` (rating + comment) for a `Place`.

## 🧩 Brief Description
When a client submits a review, the system:
- receives place_id, user_id, rating, comment  
- verifies that the user and place exist  
- validates the rating  
- creates the `Review` entity  
- persists the review  
- returns the created review  

## ✅ Key Steps
1. The client sends a `POST /reviews` request with place_id, user_id, rating, and comment.  
2. The API validates the request structure (valid JSON, types, required fields).  
3. The API calls the `Facade` for the "create review" use case.  
4. The `Facade` applies business rules:  
   - verify that `User` exists  
   - verify that `Place` exists  
   - validate `rating` (accepted range)  
   - create the `Review` entity and link it to `User` and `Place`  
5. The `Facade` asks the Persistence layer to store the review.  
6. The Persistence layer saves the review and returns confirmation.  
7. The `Facade` returns the result to the API.  
8. The API returns the response to the client.

## 🔁 Interaction Flow and Layer Responsibilities
**Presentation Layer**: receives and validates the request; calls the `Facade`.  
**Business Logic Layer**: verifies related entities and applies validation rules; creates the `Review`.  
**Persistence Layer**: stores the review and returns confirmation.

## 🎯 Purpose of the Sequence Diagram
To demonstrate that `Review` depends on both `User` and `Place`, and that the `Facade` orchestrates all validations before persistence.

---

# 4️⃣ API Call — Fetching a List of Places
## 🎯 Objective
Allow a client to retrieve a list of `Place` objects based on specific filter criteria.

## 🧩 Brief Description
When a client requests a list, the system:
- receives filter criteria  
- validates the parameters  
- queries the persistence layer  
- returns a list of places matching the criteria  

## ✅ Key Steps
1. The client sends a `GET /places` request with query parameters (criteria...).  
2. The API parses and validates the structure of the criteria (types, consistent values, pagination if applicable).  
3. The API calls the `Facade` for the "list places" use case.  
4. The `Facade` applies business logic for filtering:  
   - validate criteria  
   - build the search request  
   - request matching places from the Persistence layer  
5. The Persistence layer retrieves the data (list of places) and returns it.  
6. The `Facade` returns the list to the API.  
7. The API sends the response to the client.

## 🔁 Interaction Flow and Layer Responsibilities
**Presentation Layer**: receives the request, parses and validates criteria, calls the `Facade`.  
**Business Logic Layer**: validates business-level criteria, orchestrates the search, optionally formats results.  
**Persistence Layer**: retrieves data according to the provided filters.

## 🎯 Purpose of the Sequence Diagram
To illustrate a read-only flow (no entity creation), the mandatory use of the `Facade`, and controlled access to data exclusively through the Persistence layer.

---

# ✅ Summary: Common Principles Across All Diagrams
- Each request starts in the Presentation Layer  
- The Presentation Layer always calls the `Facade`  
- The `Facade` applies business rules and orchestrates operations  
- The Persistence Layer handles only data storage and retrieval  
- The response flows back: Persistence → Business (`Facade`) → Presentation → Client
