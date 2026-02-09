flowchart TB

%% ========= PRESENTATION LAYER =========
subgraph P["Presentation Layer"]
  direction TB
  API["API / Endpoints\n(Controllers / Routes)"]
  SVC["Services\n(Request handling)"]
  API --> SVC
end

%% ========= BUSINESS LOGIC LAYER =========
subgraph B["Business Logic Layer"]
  direction TB
  FACADE["HBnB Facade\n(Unified interface)"]
  MODELS["Domain Models\n(User, Place, Review, Amenity)\n+ Business Rules"]
  FACADE --> MODELS
end

%% ========= PERSISTENCE LAYER =========
subgraph D["Persistence Layer"]
  direction TB
  REPO["Repositories / Storage\n(Data access abstraction)"]
  DB["Database\n(Persistent storage)"]
  REPO --> DB
end

%% ========= LAYER COMMUNICATION (DEPENDENCIES) =========
SVC -->|Calls Facade| FACADE
MODELS -->|CRUD / Data operations| REPO
