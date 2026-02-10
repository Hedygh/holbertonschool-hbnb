#  Diagramme de séquence – Création d’un utilisateur POST /users

##  Objectif du diagramme
Ce diagramme représente le flux complet de création d’un utilisateur.
Il illustre la séparation des responsabilités entre les couches Presentation, Business et Persistence.
Il montre également la gestion des erreurs et du succès.

##  Lecture globale du diagramme
On lit le diagramme de gauche à droite pour les acteurs.
On lit de haut en bas pour suivre la chronologie des appels.
Chaque flèche représente un appel ou un retour entre composants.

### Sous-section Acteurs
- Client : initie la requête HTTP
- Presentation / API : gère les entrées HTTP et les validations techniques
- Business / HBNB Facade : applique les règles métier
- Persistence / Storage : interagit avec la base de données

##  Déroulement détaillé

###  Requête initiale
- Le client envoie une requête POST /users avec les données utilisateur.
- Aucune logique métier n’est exécutée côté client.

###  Validation technique
- La couche Presentation valide le format JSON.
- Elle vérifie la présence des champs obligatoires.
- Cette étape empêche les requêtes invalides d’atteindre la logique métier.

###  Appel métier
- La couche Presentation appelle create_useruser_data dans la Business Facade.
- À partir de ce point, le flux devient purement métier.

###  Vérification d’unicité de l’email
- La Business demande à la Persistence si l’email existe déjà.
- Un bloc alt est utilisé pour représenter les deux scénarios possibles.

#### Email déjà existant
- La Persistence indique que l’email existe.
- La Business retourne une erreur métier.
- La Presentation traduit cette erreur en réponse HTTP.
- Le client reçoit une erreur 400 ou 409.

#### Email disponible
- La Business crée l’entité User avec id et timestamps.
- L’utilisateur est sauvegardé en base.
- La Persistence confirme la sauvegarde.
- La Presentation retourne une réponse 201 Created avec le payload utilisateur.

##  à retenir
Ce diagramme montre clairement la séparation des responsabilités.
Il illustre l’utilisation des blocs alt pour gérer les scénarios d’erreur.

#  Diagramme de séquence – Création d’un lieu POST /places

##  Objectif du diagramme
Ce diagramme décrit le processus de création d’un lieu.
Il garantit l’existence du propriétaire et la validité des règles métier.

##  Lecture globale
Le flux suit la même architecture en couches que la création d’utilisateur.
La complexité augmente à cause des dépendances entre entités.

##  Déroulement détaillé

###  Requête client
- Le client envoie POST /places avec owner_id, données du lieu et amenities.

###  Validation technique
- Validation du format JSON.
- Validation des champs requis.

###  Vérification du propriétaire
- La Business appelle get_userowner_id.
- Un bloc alt est utilisé.

####  Propriétaire inexistant
- Erreur métier.
- Retour HTTP 404 Not Found.

####  Propriétaire existant
- Le flux continue.

### Bloc opt Validation des amenities
- Ce bloc est exécuté uniquement si des amenities sont fournies.
- Les amenities sont validées via la Persistence.

####  Amenities invalides
- Erreur métier.
- Retour HTTP 400 Bad Request.

###  Création du lieu
- Validation des règles métier : prix, latitude, longitude.
- Création de l’entité Place.
- Sauvegarde en base.
- Retour HTTP 201 Created.

##  à retenir
Ce diagramme montre l’usage combiné des blocs alt et opt.
Il illustre la gestion des dépendances entre entités.


#  Diagramme de séquence – Création d’un avis POST /reviews

##  Objectif du diagramme
Ce diagramme décrit la création d’un avis lié à un utilisateur et un lieu.
Il garantit la cohérence des données avant la persistance.

##  Déroulement détaillé

###  Requête client
- POST /reviews avec user_id, place_id et review_data.

###  Validation technique
- Validation du format et des champs requis.

###  Vérification de l’utilisateur
- Bloc alt.

####  Utilisateur inexistant
- Retour HTTP 404.

###  Vérification du lieu
- Bloc alt.

####  Lieu inexistant
- Retour HTTP 404.

###  Validation métier
- Validation de la plage de notation.

####  Rating invalide
- Retour HTTP 400.

###  Création de l’avis
- Création de l’entité Review avec liens et timestamps.
- Sauvegarde en base.
- Retour HTTP 201 Created.

##  à retenir
Ce diagramme illustre une validation en cascade.
Le flux s’arrête dès qu’une dépendance est invalide.


#  Diagramme de séquence – Récupération des lieux GET /places

##  Objectif du diagramme
Ce diagramme représente un flux de lecture.
Il ne modifie pas les données.

##  Déroulement détaillé

###  Requête client
- GET /places avec critères de recherche.

###  Validation des paramètres
- Parsing des query params.
- Validation des formats.

###  Validation métier
- Validation des plages de valeurs.

###  Recherche en base
- La Business appelle la Persistence.
- Requête SELECT exécutée.

###  Retour des résultats
- Liste des lieux retournée.
- Réponse HTTP 200 OK.

##  à retenir
Ce diagramme illustre un flux simple et lisible.
Il met en avant une architecture orientée lecture.
