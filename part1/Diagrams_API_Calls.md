# 1 User Registration

```mermaid
sequenceDiagram
    actor Client
    participant API as Presentation(API/Service)
    participant Facade as Business(HBnB Facade)
    participant Store as Persistence(Storage)

    Client->>API: POST /users (user_data)
    API->>API: Validate request format (JSON, required fields)
    API->>Facade: create_user(user_data)

    Facade->>Store: check_email_unique(email)
    Store-->>Facade: unique | already_exists

    alt Email already exists
        Facade-->>API: Error (email already used)
        API-->>Client: 400/409 Error
    else Email available
        Facade->>Facade: Create User entity (id, timestamps)
        Facade->>Store: save_user(User)
        Store-->>Facade: User saved
        Facade-->>API: Success (User created)
        API-->>Client: 201 Created (user payload)
    end
```

# 2 Place Creation

```mermaid
sequenceDiagram
    actor Client
    participant API as Presentation(API/Service)
    participant Facade as Business(HBnB Facade)
    participant Store as Persistence(Storage)

    Client->>API: POST /places (owner_id, place_data, amenities?)
    API->>API: Validate request format (JSON, required fields)
    API->>Facade: create_place(owner_id, place_data, amenities)

    Facade->>Store: get_user(owner_id)
    Store-->>Facade: user | not_found

    alt Owner not found
        Facade-->>API: Error (owner not found)
        API-->>Client: 404 Error
    else Owner exists
        Facade->>Facade: Validate business rules (price/lat/long)

        opt Amenities provided
            Facade->>Store: validate_amenities(amenities)
            Store-->>Facade: valid | invalid
            alt Invalid amenities
                Facade-->>API: Error (invalid amenity)
                API-->>Client: 400 Error
            end
        end

        Facade->>Facade: Create Place entity (owner, id, timestamps)
        Facade->>Store: save_place(Place)
        Store-->>Facade: Place saved
        Facade-->>API: Success (Place created)
        API-->>Client: 201 Created (place payload)
    end
```

# 3 Review submission

```mermaid
sequenceDiagram
    actor Client
    participant API as Presentation(API/Service)
    participant Facade as Business(HBnB Facade)
    participant Store as Persistence(Storage)

    Client->>API: POST /reviews (user_id, place_id, review_data)
    API->>API: Validate request format (JSON, required fields)
    API->>Facade: create_review(user_id, place_id, review_data)

    Facade->>Store: get_user(user_id)
    Store-->>Facade: user | not_found
    alt User not found
        Facade-->>API: Error (user not found)
        API-->>Client: 404 Error
    else User exists
        Facade->>Store: get_place(place_id)
        Store-->>Facade: place | not_found
        alt Place not found
            Facade-->>API: Error (place not found)
            API-->>Client: 404 Error
        else Place exists
            Facade->>Facade: Validate business rules (rating range)
            alt Invalid rating
                Facade-->>API: Error (invalid rating)
                API-->>Client: 400 Error
            else Valid rating
                Facade->>Facade: Create Review entity (links, id, timestamps)
                Facade->>Store: save_review(Review)
                Store-->>Facade: Review saved
                Facade-->>API: Success (Review created)
                API-->>Client: 201 Created (review payload)
            end
        end
    end
```

# 4 Fetching List of Places

```mermaid
sequenceDiagram
    actor Client
    participant API as Presentation(API/Service)
    participant Facade as Business(HBnB Facade)
    participant Store as Persistence(Storage/Repository)
    participant DB as Persistence(Database)

    Client->>API: GET /places?criteria...
    API->>API: Parse & validate query params
    API->>Facade: list_places(criteria)

    Facade->>Facade: Validate business criteria (ranges, formats)
    Facade->>Store: find_places(criteria)
    Store->>DB: SELECT places WHERE criteria
    DB-->>Store: places list
    Store-->>Facade: places list

    Facade-->>API: Return places list
    API-->>Client: 200 OK (places[])
```