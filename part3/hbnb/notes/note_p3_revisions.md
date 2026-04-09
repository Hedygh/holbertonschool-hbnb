# 🧠 Révision complète — HBnB Part 3 (SQLAlchemy, Auth, Relations)

---

# 1. Qu’est-ce qu’une base de données dans votre projet ?

Une base de données sert à stocker durablement les informations de l’application.

Dans votre projet HBnB, elle stocke par exemple :

- les utilisateurs
- les places
- les reviews
- les amenities
- les liens entre place et amenity

Avant, en mémoire, ces données disparaissaient au redémarrage.  
Avec la base de données, elles restent enregistrées.

## Dans votre projet

Vous utilisez SQLite via SQLAlchemy.

Donc :

- l’application manipule des objets Python  
- SQLAlchemy transforme ça en opérations SQL  
- SQLite stocke physiquement les données dans un fichier  

---

# 2. Qu’est-ce que SQLite ? Pourquoi l’utiliser ?

SQLite est un moteur de base de données relationnelle léger, simple et local.

Il stocke les données dans un fichier unique :

development.db

## Pourquoi on l’utilise ?

- simple à installer  
- pratique pour le développement  
- suffisant pour un projet pédagogique  
- facile à intégrer avec SQLAlchemy  

## Dans votre config

SQLALCHEMY_DATABASE_URI = 'sqlite:///development.db'

Cela signifie :

- utilisation de SQLite  
- fichier local development.db  

---

# 3. Qu’est-ce que SQL ?

SQL est le langage utilisé pour manipuler une base de données relationnelle.

## Ce qu’on peut faire avec SQL

- créer des tables  
- insérer des données  
- lire des données  
- modifier des données  
- supprimer des données  

## Exemples

Créer une table :
CREATE TABLE users (...);

Lire :
SELECT * FROM users;

Insérer :
INSERT INTO users (...) VALUES (...);

Modifier :
UPDATE users SET first_name = 'Alice' WHERE id = '...';

Supprimer :
DELETE FROM users WHERE id = '...';

## Pourquoi c’est important ?

Même si vous utilisez SQLAlchemy, il génère du SQL en arrière-plan.

---

# 4. Qu’est-ce qu’une table SQL ?

Une table stocke des données d’un même type.

- une ligne = un objet  
- une colonne = une propriété  

## Dans votre projet

Tables :

- users  
- places  
- reviews  
- amenities  
- place_amenity  

---

# 5. Qu’est-ce qu’un ORM ?

ORM = Object Relational Mapping

## Définition

Permet de manipuler la base avec des objets Python au lieu d’écrire du SQL.

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
- gestion facile des relations  
- architecture propre  

---

# 6. Qu’est-ce que SQLAlchemy ?

SQLAlchemy est l’ORM utilisé.

## Rôle

- mapping Python ↔ SQL  
- gestion des relations  
- requêtes SQL  
- gestion de session  

## Exemple

class User(db.Model):
    id = db.Column(...)

---

# 7. Qu’est-ce que le mapping ?

Le mapping relie :

- classe Python  
- table SQL  

## Exemple

class Place(BaseModel):
    __tablename__ = "places"

---

# 8. Qu’est-ce qu’une relation ?

Une relation lie deux entités.

## Dans votre projet

- User ↔ Place  
- Place ↔ Review  
- User ↔ Review  
- Place ↔ Amenity  

---

# 9. Types de relations

## One-to-Many

1 user → plusieurs places  

## Many-to-Many

Place ↔ Amenity  

via place_amenity  

---

# 10. Primary Key

Identifiant unique d’une ligne.

Exemple : id

---

# 11. Foreign Key

Référence vers une autre table.

Exemple :
place.user_id → users.id

---

# 12. Backref

Permet d’accéder à la relation inverse automatiquement.

Exemple :

place.owner  
user.places  

---

# 13. Secondary

Utilisé pour many-to-many.

Exemple :
secondary = place_amenity

---

# 14. Lazy

Définit quand charger les relations.

---

# 15. Lazy loading

Les relations sont chargées uniquement quand on y accède.

---

# 16. lazy="subquery"

Charge via une requête supplémentaire optimisée.

---

# 17. Protected endpoint

Route protégée :

@jwt_required()

---

# 18. JWT Auth

Authentification par token.

## Fonctionnement

login → token → requêtes protégées

---

# 19. Stateless

Le serveur ne garde pas de session.

Le client envoie le token à chaque requête.

---

# 20. bcrypt

Hash sécurisé des mots de passe.

---

# 21. Hashing

Transformation non réversible.

---

# 22. Admin

Utilisateur avec droits spécifiques.

Champ :
is_admin

---

# 23. RBAC

Gestion des droits par rôle.

---

# 24. Ownership

Une ressource appartient à un utilisateur.

---

# 25. Mémoire vs Persistance

## Persisté

- users  
- places  
- reviews  
- amenities  

## Non persisté

- token JWT  

---

# 26. Persistance

Les données restent après redémarrage.

---

# 27. Codes HTTP succès

200 OK  
201 Created  

---

# 28. Codes HTTP erreurs

400 Bad Request  
401 Unauthorized  
403 Forbidden  
404 Not Found  
500 Internal Server Error  

---

# 29. Différence 400 / 401 / 403

400 → requête invalide  
401 → non authentifié  
403 → interdit  

---

# 30. Endpoint protégé JWT

Nécessite un token valide.

---

# 31. Persistance vs Token

DB → persistée  
JWT → non persisté  

---

# 32. Pourquoi SQLAlchemy

- abstraction SQL  
- gestion relations  
- intégration Flask  

---

# 33. Pourquoi bcrypt

Sécurité des mots de passe.

---

# 34. Pourquoi JWT

Authentification stateless API.

---

# 35. Many-to-Many

Place ↔ Amenity via table pivot.

---

# 36. Backref

Relation inverse automatique.

---

# 37. Lazy loading

Chargement à la demande.

---

# 38. Résumé global

ORM → abstraction SQL  
SQLAlchemy → ORM  
SQLite → base locale  
Relations → liens  
JWT → auth  
bcrypt → sécurité  
RBAC → permissions  
DB → persistance  

---