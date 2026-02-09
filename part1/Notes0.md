# 📦 HBnB – Part 1 : Technical Documentation

Ce document regroupe les notes et explications liées aux **Tâches 0 et 1** du projet **HBnB Evolution**.  
Il sert de support de compréhension et de justification des choix de conception UML avant l’implémentation.

---

# 🧱 TÂCHE 0 — High-Level Package Diagram

## Vue globale de l’architecture

```text
Presentation
     |
     v
   Facade   dans Business
     |
     v
Business Logic entités
     |
     v
Persistence
```

---

## 🎯 Objectif

La tâche 0 a pour objectif de présenter une **vue d’ensemble de l’architecture** de l’application HBnB, sans entrer dans les détails d’implémentation.

Elle permet de comprendre :

- comment l’application est organisée ;  
- comment les responsabilités sont réparties ;  
- comment les différentes parties du système communiquent entre elles.

L’architecture repose sur un **modèle en couches layered architecture**, dont le but est de séparer clairement les responsabilités techniques et fonctionnelles du système.

---

## 🧩 Organisation générale

L’application est structurée en **trois couches distinctes**, chacune ayant un rôle bien défini.

---

## 1️⃣ Presentation Layer

La **Presentation Layer** représente le **point d’entrée du système**.

C’est la première couche à recevoir les requêtes provenant :

- des utilisateurs ;  
- de clients HTTP ;  
- d’applications front-end ;  
- ou de services externes.

Elle expose des **services et des APIs**.

Une **API Application Programming Interface** est un ensemble de points d’accès permettant à un client de demander une action au système, par exemple :

- créer un utilisateur ;  
- créer un lieu ;  
- soumettre un avis ;  
- récupérer une liste de lieux.

**Responsabilités :**

- recevoir les requêtes ;  
- valider leur format et leurs paramètres ;  
- transmettre la demande à la couche métier ;  
- retourner une réponse au client.

Cette couche :

- ne contient **aucune règle métier** ;  
- ne manipule **pas directement les données persistées**.

Elle sert uniquement d’interface entre le monde extérieur et le cœur de l’application.

---

## 2️⃣ Business Logic Layer

La **Business Logic Layer** constitue le **cœur fonctionnel** de l’application.

Elle contient :

- les **règles métier** ;  
- les **modèles du domaine**.

Les règles métier définissent le comportement fonctionnel du système  
ex : un utilisateur peut créer un lieu, un avis doit être associé à un utilisateur et à un lieu.

Les modèles du domaine représentent les concepts métier principaux :

- `User`  
- `Place`  
- `Review`  
- `Amenity`

Ces modèles décrivent :

- l’état des objets attributs ;  
- leur comportement métier méthodes ;  
- les relations qu’ils entretiennent entre eux.

---

### 🔹 Rôle de la Facade

La Business Logic Layer expose une **Facade**.

La **Facade** fournit une **interface unique et simplifiée** à la logique métier.  
Elle agit comme intermédiaire entre :

- la Presentation Layer ;  
- les entités métier internes.

Concrètement :

- la Presentation Layer n’interagit jamais directement avec les entités métier ;  
- elle appelle uniquement la Facade ;  
- la Facade coordonne les actions nécessaires au sein de la logique métier.

Ce mécanisme permet :

- de réduire le couplage entre les couches ;  
- de protéger la logique métier ;  
- de centraliser les points d’accès aux fonctionnalités ;  
- de rendre l’architecture plus claire et maintenable.

---

## 3️⃣ Persistence Layer

La **Persistence Layer** est responsable de la **gestion des données**.

**Responsabilités :**

- stocker les données de l’application ;  
- récupérer les données lorsque nécessaire ;  
- fournir une abstraction du système de stockage.

Elle interagit avec la **base de données**, qui assure le stockage persistant des informations.

Cette couche :

- n’applique **aucune règle métier** ;  
- ne prend **aucune décision fonctionnelle** ;  
- se limite aux opérations de lecture et d’écriture.

Elle est utilisée exclusivement par la Business Logic Layer.

---

## 🔁 Communication entre les couches

Les couches communiquent de manière **unidirectionnelle** :

- Presentation Layer → Business Logic Layer via la Facade ;  
- Business Logic Layer → Persistence Layer ;  
- Persistence Layer → aucune autre couche.

Cette organisation garantit :

- une séparation claire des responsabilités ;  
- une architecture lisible et cohérente ;  
- une meilleure maintenabilité ;  
- une facilité d’évolution du système.

---