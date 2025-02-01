# Sistema de Usuarios Multi-Cuentas

```
erDiagram
    users ||--o{ accounts : "1 a *"
    users ||--|| profiles : "1 a 1"

    users {
        string userId PK
        string email
        string password
        string username
        boolean verified
        string timeZone
    }

    accounts {
        string accountId PK
        string userId FK
        string provider
        string providerAccountId
        USER_ROLE role
        USER_TYPE type
        USER_PERMISSION[] permissions
    }

    profiles {
        string profileId PK
        string userId FK
        string firstName
        string lastName
        string phone
        date birthDate
        string address
        string image
    }

    %% Ejemplo de instancias:
    users |o--o| account_google : ""
    users |o--o| account_email : ""
    account_google {
        provider: "google"
        role: "ADMIN"
        permissions: ["ALL"]
    }
    account_email {
        provider: "email"
        role: "USER"
        permissions: ["VIEW"]
    }
```