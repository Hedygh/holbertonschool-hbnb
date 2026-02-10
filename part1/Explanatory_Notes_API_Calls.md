# 🧾 TÂCHE 2 — Sequence Diagrams for API Calls
## Explanatory Notes

Ce document décrit, pour chaque API call, 1 une description concise du cas d’usage, 2 les étapes clés, et 3 le rôle de chaque couche Presentation, Business Logic, Persistence dans le traitement de la requête.

---

# 1️⃣ API Call — User Registration
## 🎯 Objectif
Permettre à un utilisateur de créer un nouveau compte dans le système.

## 🧩 Description brève
Lorsqu’un client envoie une requête d’inscription, le système :
- reçoit les informations utilisateur ;  
- valide la forme des données ;  
- applique les règles métier ex : email unique ;  
- crée un objet `User` ;  
- persiste le nouvel utilisateur ;  
- renvoie une réponse confirmant la création.

## ✅ Étapes clés
1. Le client envoie une requête `POST /users` avec les informations d’inscription ex : first_name, last_name, email, password.  
2. L’API valide la structure de la requête JSON valide, champs requis, types cohérents.  
3. L’API appelle la `Facade` pour exécuter le cas d’usage "create user".  
4. La `Facade` applique les règles métier :  
   - vérifier que l’email n’est pas déjà utilisé ;  
   - valider les champs selon les contraintes métier ;  
   - créer l’entité `User` héritant de `BaseModel`.  
5. La `Facade` demande à la couche Persistence d’enregistrer l’utilisateur.  
6. La Persistence sauvegarde les données et renvoie l’objet ou un identifiant.  
7. La `Facade` renvoie un résultat à l’API.  
8. L’API renvoie une réponse au client succès ou erreur.

## 🔁 Flow des interactions et rôle des couches
**Presentation Layer** : reçoit la requête, fait la validation de forme, appelle la `Facade`, renvoie la réponse HTTP.  
**Business Logic Layer** : via la `Facade`, applique les règles métier ex : email unique, crée l’entité `User`, orchestre l’opération.  
**Persistence Layer** : enregistre l’utilisateur et renvoie le résultat de sauvegarde.

## 🎯 But du sequence diagram
Montrer que l’inscription passe par la `Facade` pas d’accès direct aux modèles ou à la persistence depuis l’API et que la logique métier est centralisée dans la Business Logic Layer.

---

# 2️⃣ API Call — Place Creation
## 🎯 Objectif
Permettre à un utilisateur de créer un nouveau `Place` annonce / logement, associé à un owner, et éventuellement lié à des amenities.

## 🧩 Description brève
Lorsqu’un client crée un place, le système :
- reçoit les informations du place ;  
- valide les champs et les contraintes ;  
- vérifie que l’owner existe ;  
- associe des amenities si fournies ;  
- persiste le place ;  
- renvoie le place créé.

## ✅ Étapes clés
1. Le client envoie une requête `POST /places` contenant les données title, description, price, latitude, longitude, owner_id, amenities....  
2. L’API valide la structure JSON, types, champs requis.  
3. L’API appelle la `Facade` pour le cas d’usage "create place".  
4. La `Facade` applique les règles métier :  
   - vérifier que le `User` owner existe ;  
   - valider `price`, `latitude`, `longitude` ;  
   - créer l’entité `Place` ;  
   - si une liste d’amenities est fournie : vérifier qu’elles existent et les associer many-to-many.  
5. La `Facade` demande à la Persistence de sauvegarder le place et les associations place–amenity si nécessaire.  
6. La Persistence exécute l’écriture des données et renvoie le résultat.  
7. La `Facade` renvoie l’objet créé à l’API.  
8. L’API renvoie la réponse au client.

## 🔁 Flow des interactions et rôle des couches
**Presentation Layer** : réception + validation de forme + appel `Facade`.  
**Business Logic Layer** : vérifie owner, valide les champs, crée `Place`, gère les associations avec `Amenity`.  
**Persistence Layer** : sauvegarde `Place` et les liens many-to-many avec `Amenity`.

## 🎯 But du sequence diagram
Montrer que la création d’un place est une orchestration métier owner + contraintes + amenities et que toutes les interactions passent par la `Facade`.

---

# 3️⃣ API Call — Review Submission
## 🎯 Objectif
Permettre à un utilisateur de soumettre une `Review` note + commentaire pour un `Place`.

## 🧩 Description brève
Lorsqu’un client soumet une review, le système :
- reçoit place_id, user_id, rating, comment ;  
- vérifie que le user et le place existent ;  
- valide la note ;  
- crée l’entité `Review` ;  
- persiste la review ;  
- renvoie la review créée.

## ✅ Étapes clés
1. Le client envoie une requête `POST /reviews` avec place_id, user_id, rating, comment.  
2. L’API valide la structure JSON, types, champs requis.  
3. L’API appelle la `Facade` pour le cas d’usage "create review".  
4. La `Facade` applique les règles métier :  
   - vérifier que `User` existe ;  
   - vérifier que `Place` existe ;  
   - valider `rating` plage acceptée ;  
   - créer l’entité `Review` et la lier à `User` et `Place`.  
5. La `Facade` demande à la Persistence d’enregistrer la review.  
6. La Persistence sauvegarde et renvoie le résultat.  
7. La `Facade` renvoie à l’API.  
8. L’API renvoie au client.

## 🔁 Flow des interactions et rôle des couches
**Presentation Layer** : reçoit et valide la requête ; appelle la `Facade`.  
**Business Logic Layer** : vérifie l’existence des entités liées et les règles de validation ; crée `Review`.  
**Persistence Layer** : stocke la review et renvoie confirmation.

## 🎯 But du sequence diagram
Montrer que `Review` dépend de `User` et `Place` et que la `Facade` orchestre les vérifications avant persistance.

---

# 4️⃣ API Call — Fetching a List of Places
## 🎯 Objectif
Permettre à un client de récupérer une liste de `Place` selon des critères filtres.

## 🧩 Description brève
Lorsqu’un client demande une liste, le système :
- reçoit les critères ;  
- valide les paramètres ;  
- interroge la persistence ;  
- renvoie une liste de places correspondant aux critères.

## ✅ Étapes clés
1. Le client envoie une requête `GET /places` avec des query parameters criteria....  
2. L’API lit et valide la structure des critères types, valeurs cohérentes, pagination si applicable.  
3. L’API appelle la `Facade` pour le cas d’usage "list places".  
4. La `Facade` applique la logique métier de recherche :  
   - valider les critères ;  
   - construire la demande de recherche ;  
   - demander à la Persistence les places correspondant aux filtres.  
5. La Persistence récupère les données liste de places et les renvoie.  
6. La `Facade` renvoie la liste à l’API.  
7. L’API renvoie la réponse au client.

## 🔁 Flow des interactions et rôle des couches
**Presentation Layer** : réception de la requête, parsing/validation des critères, appel `Facade`.  
**Business Logic Layer** : validation métier des critères, orchestration de la recherche, formatage éventuel des résultats.  
**Persistence Layer** : récupération des données selon les critères.

## 🎯 But du sequence diagram
Montrer le flux “read-only” pas de création, le passage par la `Facade`, et l’accès aux données uniquement via la Persistence.

---

# ✅ Résumé : points communs aux 4 diagrams
- Chaque requête commence dans la Presentation Layer ;  
- La Presentation Layer appelle toujours la `Facade` ;  
- La `Facade` applique les règles métier et orchestre les opérations ;  
- La Persistence Layer gère uniquement la lecture/écriture des données ;  
- La réponse remonte ensuite : Persistence → Business `Facade` → Presentation → Client.
