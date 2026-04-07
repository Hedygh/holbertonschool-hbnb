# 🧠 Révision globale — HBnB Part 3 (SQLAlchemy, Auth, Relations)

---

# 1. Base de données

Une base de données sert à **stocker durablement les données** de l’application.

Dans le projet HBnB, elle stocke :
- users
- places
- reviews
- amenities
- relations (place ↔ amenity)

## Avant (Part 2)
- données en mémoire
- tout disparaît au redémarrage

## Maintenant (Part 3)
- données stockées dans SQLite
- persistent après redémarrage

---

# 2. SQLite

SQLite est une base de données relationnelle légère.

## Caractéristiques
- fichier unique (`development.db`)
- pas besoin de serveur
- facile à utiliser en dev

## Dans le projet
SQLALCHEMY_DATABASE_URI = 'sqlite:///development.db'

---

# 3. SQL

SQL est le langage pour interagir avec une base.

## Exemples

Créer une table :
CREATE TABLE users (...);

Lire :
SELECT * FROM users;

Insérer :
INSERT INTO users (...) VALUES (...);

---

# 4. Tables SQL

Une table = ensemble de lignes représentant une entité.

## Tables du projet
- users
- places
- reviews
- amenities
- place_amenity

---

# 5. ORM

ORM = Object Relational Mapping

## Définition
Permet de manipuler la base de données avec des objets Python au lieu d’écrire du SQL.

## Exemple

Au lieu de :
INSERT INTO users ...

On fait :
user = User(...)
db.session.add(user)
db.session.commit()

## Pourquoi on l’utilise
- code plus lisible
- moins de SQL manuel
- meilleure gestion des relations
- architecture propre

---

# 6. SQLAlchemy

SQLAlchemy est l’ORM utilisé dans le projet.

## Rôle
- mapper classes ↔ tables
- gérer les relations
- exécuter les requêtes SQL
- gérer la session

## Exemple
class User(db.Model):
    id = db.Column(...)

---

# 7. Mapping

Le mapping relie :
- classe Python
- table SQL

## Exemple
class Place(BaseModel):
    __tablename__ = "places"

---

# 8. Relations

Les relations relient les entités entre elles.

## Dans le projet
- User ↔ Place
- Place ↔ Review
- User ↔ Review
- Place ↔ Amenity

---

# 9. Types de relations

## One-to-Many
Un user → plusieurs places

## Many-to-Many
Place ↔ Amenity via table pivot

---

# 10. Primary Key

Clé primaire = identifiant unique

## Exemple
id

---

# 11. Foreign Key

Clé étrangère = référence à une autre table

## Exemple
place.user_id → users.id

---

# 12. Backref

Crée automatiquement la relation inverse

## Exemple
place.owner
user.places

---

# 13. Secondary

Utilisé pour many-to-many

## Exemple
secondary = place_amenity

---

# 14. Lazy

Définit quand charger les relations

---

# 15. Lazy Loading

Les données liées sont chargées seulement quand on y accède

---

# 16. lazy="subquery"

Stratégie de chargement via une requête supplémentaire structurée

---

# 17. Protected Endpoint

Endpoint protégé par JWT

## Exemple
@jwt_required()

---

# 18. JWT Auth

Système d’authentification avec token

## Flow
login → token → requêtes protégées

---

# 19. Stateless

Le serveur ne garde pas de session

Le client envoie le token à chaque requête

---

# 20. bcrypt

Bibliothèque pour hasher les mots de passe

---

# 21. Hashing

Transformation non réversible

Utilisé pour sécuriser les mots de passe

---

# 22. Admin

Utilisateur avec droits spéciaux

## Champ
is_admin

---

# 23. RBAC

Role-Based Access Control

Permissions selon le rôle

---

# 24. Ownership

Une ressource appartient à un user

---

# 25. Mémoire vs Persistance

## Stocké
- users
- places
- reviews
- amenities

## Non stocké
- token JWT côté client

---

# 26. Persistance

Les données restent après redémarrage

---

# 27. Codes HTTP succès

## 200 OK
Requête réussie

## 201 Created
Création réussie

---

# 28. Codes HTTP erreurs

## 400 Bad Request
Donnée invalide

## 401 Unauthorized
Non authentifié

## 403 Forbidden
Pas autorisé

## 404 Not Found
Ressource inexistante

## 500 Internal Server Error
Erreur serveur

---

# 29. Différence 400 / 401 / 403

400 → erreur de requête  
401 → pas authentifié  
403 → interdit malgré auth  

---

# 30. Protected Endpoint JWT

Route nécessitant un token valide

---

# 31. Persistance vs Token

## Persisté
DB SQLite

## Non persisté
Token JWT

---

# 32. Pourquoi SQLAlchemy

- abstraction du SQL
- gestion des relations
- intégration Flask

---

# 33. Pourquoi bcrypt

- sécuriser les mots de passe

---

# 34. Pourquoi JWT

- auth stateless
- adapté API REST

---

# 35. Many-to-Many

Place ↔ Amenity via place_amenity

---

# 36. Backref

Relation inverse automatique

---

# 37. Lazy Loading

Chargement à la demande

---

# 38. Résumé final

ORM → abstraction SQL  
SQLAlchemy → ORM utilisé  
SQLite → base locale  
Relations → liens entre données  
JWT → auth  
bcrypt → sécurité  
RBAC → permissions  
DB → persistance  
