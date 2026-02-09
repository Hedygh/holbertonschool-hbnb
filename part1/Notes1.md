# 🧠 TÂCHE 1 — Detailed Class Diagram

## Business Logic Layer

---

### 📌 Périmètre

La tâche 1 concerne **uniquement la Business Logic Layer**.

**Inclus :**

- entités métier ; 
- règles métier ; 
- relations entre entités.

**Exclus :**

- API / routes / controllers ; 
- Facade ; 
- Persistence / DB / Repository.

---

### 📐 Class Diagram UML

Un class diagram répond à quatre questions :

1. Quelles classes existent ? 
2. Quelles données portent-elles attributs? 
3. Que savent-elles faire méthodes? 
4. Comment sont-elles liées relations UML?

---

### 🧩 Entités métier

Les entités sont imposées par l’énoncé :

- `User` 
- `Place` 
- `Review` 
- `Amenity`

Ce sont des **concepts métier**, indépendants du langage ou de la base de données.

---

### 📄 Attributs

**Attributs communs obligatoires:**

- `id` UUID4 
- `created_at` 
- `updated_at`

Ces attributs peuvent être factorisés via une classe parente `BaseModel`.

**Attributs spécifiques :**

- **User** : first_name, last_name, email, password, is_admin 
- **Place** : title, description, price, latitude, longitude 
- **Review** : rating, comment 
- **Amenity** : name, description

---

### ⚙️ Méthodes comportement métier

Les méthodes représentent des **intentions métier**, pas des actions techniques.

Exemples :

- `User.update_profile` 
- `Place.add_amenity` 
- `Place.remove_amenity` 
- `Review.update_content` 
- `Amenity.update_info`

Aucune méthode de persistance save, SQL, etc..

---

### 🔗 Relations métier phrases

- Un **User** peut posséder plusieurs **Place** ; un **Place** a un seul owner. 
- Un **User** peut écrire plusieurs **Review** ; une **Review** est écrite par un seul User. 
- Un **Place** peut avoir plusieurs **Review** ; une **Review** concerne un seul Place. 
- Un **Place** peut avoir plusieurs **Amenity** ; une **Amenity** peut appartenir à plusieurs Place.

---

### 🧬 Héritage

Toutes les entités héritent de `BaseModel` :

- `User --|> BaseModel` 
- `Place --|> BaseModel` 
- `Review --|> BaseModel` 
- `Amenity --|> BaseModel`

---

### 🧪 Validation finale

répondre à:

- qui est propriétaire d’un Place ? 
- qui peut écrire un Review ? 
- ce que représente une Amenity ? 

### Rappel UML 

# Héritage (BaseModel)

User --|> BaseModel

Place --|> BaseModel

Review --|> BaseModel

Amenity --|> BaseModel

# User ↔ Place (ownership)

Un User possède 0..* Place

Un Place a 1 User (owner)

➡️ UML : User "1" --> "0..*" Place : owns

# User ↔ Review (author)

Un User écrit 0..* Review

Une Review est écrite par 1 User

➡️ UML : User "1" --> "0..*" Review : writes

# Place ↔ Review (target)

Un Place a 0..* Review

Une Review concerne 1 Place

➡️ UML : Place "1" --> "0..*" Review : has

# Place ↔ Amenity (many-to-many)

Un Place a 0..* Amenity

Une Amenity peut être liée à 0..* Place

➡️ UML : Place "0..*" -- "0..*" Amenity : includes