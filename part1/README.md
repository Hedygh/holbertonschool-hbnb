# HBnB Evolution – Part 1: UML Design

This section documents the architectural and conceptual design of the HBnB Evolution application.

The objective of Part 1 is to establish a clear and structured technical blueprint before implementation begins.  
All diagrams are designed to reflect system organization, domain modeling, and interaction flow across layers.

---

## Overview

Part 1 is divided into three main tasks:

### 1. High-Level Architecture  
📄 [High_Level_Package_Diagram.md](High_Level_Package_Diagram.md)

Defines the global layered architecture of the system:
- Presentation Layer  
- Business Logic Layer  
- Persistence Layer  

It also introduces the **Facade pattern**, which centralizes access to business logic and ensures separation of concerns.

---

### 2. Business Logic Layer – Class Diagram  
📄 [Buisiness_Logic_Layer.md](Buisiness_Logic_Layer.md)

Describes the core domain entities:
- User  
- Place  
- Review  
- Amenity  

This diagram defines:
- Attributes and shared properties  
- Relationships between entities  
- Multiplicities and domain constraints  

It models the internal structure of the system independently of technical implementation.

---

### 3. API Interaction Flow – Sequence Diagrams  
📄 [Diagrams_API_Calls.md](Diagrams_API_Calls.md)

Illustrates how API requests travel through the system layers.

These diagrams demonstrate:
- Request validation in the Presentation layer  
- Business rule orchestration via the Facade  
- Data persistence through the Persistence layer  

They ensure consistency between the architecture and runtime behavior.

---

## Purpose of Part 1

This UML documentation serves as a reference for future implementation phases.  
It guarantees architectural coherence, clear separation of responsibilities, and alignment between system design and business requirements.
