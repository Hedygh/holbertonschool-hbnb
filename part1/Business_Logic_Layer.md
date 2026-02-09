```mermaid


classDiagram

%% =========================
%% Base class (shared fields)
%% =========================
class BaseModel {
  +UUID id
  +datetime created_at
  +datetime updated_at
  +update_timestamp()
}

%% =========================
%% Domain entities
%% =========================
class User {
  +string first_name
  +string last_name
  +string email
  +string password
  +bool is_admin
  +update_profile()
  +delete()
}

class Place {
  +string title
  +string description
  +float price
  +float latitude
  +float longitude
  +update_info()
  +delete()
  +add_amenity(amenity)
  +remove_amenity(amenity)
}

class Review {
  +int rating
  +string comment
  +update_content()
  +delete()
}

class Amenity {
  +string name
  +string description
  +update_info()
  +delete()
}

%% =========================
%% Inheritance
%% =========================
User --|> BaseModel
Place --|> BaseModel
Review --|> BaseModel
Amenity --|> BaseModel

%% =========================
%% Relationships + multiplicities
%% =========================

%% Ownership: one user owns many places; each place has exactly one owner
User "1" --> "0..*" Place : owns

%% Reviews: user writes many reviews; each review has one author
User "1" --> "0..*" Review : writes

%% Reviews: place has many reviews; each review targets one place
Place "1" --> "0..*" Review : has

%% Amenities: many-to-many between places and amenities
Place "0..*" -- "0..*" Amenity : includes
