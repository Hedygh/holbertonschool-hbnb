# 📘 TÂCHE 2 — Lecture détaillée des Sequence Diagrams

Ce document permet d’expliquer clairement chaque diagramme de séquence.
Il sert de support pour une présentation orale et aide à comprendre la logique représentée visuellement.

Chaque diagramme illustre :

- le flux d’une requête
- la séparation des responsabilités entre couches
- le rôle central de la Facade
- l’absence d’accès direct à la base de données depuis l’API

---

# 1️⃣ User Registration — Lecture et compréhension

## 🎯 Objectif du diagramme

Ce diagramme montre comment un utilisateur est créé dans le système tout en respectant les règles métier, notamment l’unicité de l’email.

## 🧠 Comment lire le diagramme

Le diagramme se lit de gauche à droite :

Client → Presentation → Business Facade → Persistence → retour vers le Client.

## 🪜 Déroulement logique

1 Le Client envoie une requête POST /users avec les données utilisateur.  
Cela représente une interaction externe avec le système.

2 La Presentation Layer reçoit la requête.  
Elle valide uniquement la forme :
- JSON valide
- champs obligatoires présents
- types corrects

Elle ne prend aucune décision métier.

3 La requête est transmise à la Business Layer via la Facade.  
La Facade représente l’unique point d’entrée métier.

4 La Facade demande à la Persistence de vérifier si l’email existe déjà.

5 Bloc alt :
- Si l’email existe → erreur 400/409.
- Sinon → création de l’entité User.

6 La Facade crée l’objet User id + timestamps.

7 La Facade demande à la Persistence de sauvegarder l’utilisateur.

8 La Persistence confirme la sauvegarde.

9 La réponse remonte jusqu’au Client 201 Created.

## 🎓 Ce que le diagramme démontre

- L’API ne parle jamais directement à la base.
- Toutes les règles métier sont dans la Facade.
- La Persistence ne fait que stocker les données.
- La validation métier email unique est centralisée.

---

# 2️⃣ Place Creation — Lecture et compréhension

## 🎯 Objectif du diagramme

Montrer qu’un Place dépend d’un User owner et éventuellement d’Amenities.

## 🧠 Structure du flux

Client → API → Facade → Persistence → retour.

## 🪜 Déroulement logique

1 Le Client envoie POST /places.

2 La Presentation valide la structure.

3 La Facade reçoit la demande de création.

4 La Facade vérifie que l’owner existe.

Bloc alt :
- Owner absent → 404 Error.
- Owner présent → continuer.

5 La Facade valide les règles métier prix, latitude, longitude.

6 Bloc opt :
Si des amenities sont fournies, la Facade demande à la Persistence de les valider.

Bloc alt interne :
- Si invalides → 400 Error.
- Sinon → continuer.

7 La Facade crée l’entité Place avec owner + id + timestamps.

8 La Persistence sauvegarde le Place.

9 Retour 201 Created.

## 🎓 Ce que ce diagramme montre

- Un Place ne peut pas exister sans owner.
- La relation métier est respectée.
- Les validations métier ne sont pas dans l’API.
- La Persistence reste passive.

---

# 3️⃣ Review Submission — Lecture et compréhension

## 🎯 Objectif du diagramme

Montrer qu’une Review dépend à la fois d’un User et d’un Place.

## 🧠 Structure générale

Client → API → Facade → Persistence → retour.

## 🪜 Déroulement logique

1 Le Client envoie POST /reviews.

2 L’API valide la structure.

3 La Facade vérifie l’existence du User.

Bloc alt :
- User absent → 404 Error.
- Sinon → continuer.

4 La Facade vérifie l’existence du Place.

Bloc alt :
- Place absent → 404 Error.
- Sinon → continuer.

5 La Facade valide la note rating range.

Bloc alt :
- Note invalide → 400 Error.
- Note valide → continuer.

6 Création de l’entité Review liens + id + timestamps.

7 Sauvegarde via la Persistence.

8 Retour 201 Created.

## 🎓 Ce que le diagramme démontre

- Review est une entité dépendante.
- Les validations sont successives et centralisées.
- La cohérence métier est protégée avant toute sauvegarde.
- Le diagramme reflète les relations du class diagram.

---

# 4️⃣ Fetching a List of Places — Lecture et compréhension

## 🎯 Objectif du diagramme

Illustrer un flux de lecture simple sans modification de données.

## 🧠 Structure simplifiée

Client → API → Facade → Persistence → retour.

## 🪜 Déroulement logique

1 Le Client envoie GET /places avec critères.

2 La Presentation :
- parse les paramètres
- valide leur format

3 La Facade valide la cohérence métier des critères.

4 La Persistence exécute la recherche.

5 La liste des places est renvoyée.

6 Retour 200 OK.

## 🎓 Ce que ce diagramme montre

- Différence entre flux write et read.
- Pas de création d’entité.
- Même séparation des responsabilités.
- Architecture cohérente avec les autres diagrammes.

---

On peut résumer ainsi :

"Chaque diagramme montre comment une requête traverse les trois couches de l’architecture.  
La Presentation gère l’entrée et la sortie.  
La Business Layer via la Facade applique les règles métier.  
La Persistence s’occupe uniquement du stockage.  
Les blocs alt représentent les décisions métier.  
Les blocs opt représentent des comportements conditionnels."

---

# ✅ Conclusion générale

Ces diagrammes ne décrivent pas l’implémentation technique.
Ils décrivent :

- la logique de traitement
- la séparation des responsabilités
- le rôle central de la Facade
- la cohérence avec le class diagram
- la conformité avec l’architecture définie en tâche 0

Ils servent de pont entre :

- la modélisation métier Tâche 1
- et l’implémentation future Part 2 et 3
