# Backend Project Overview

The **backend** of this project currently features a database using *PostgreSQL* and *TypeORM* for interacting with it.  

## Techn Stack
* **Language**: TypeScript
*   **Runtime**: Node.js
*   **Database**: PostgreSQL
*   **ORM**: TypeORM
*   **Environment Variables**: `dotenv`

## Database Setup with TypeORM

### 1. Environment Configuration (`.env`)

To connect to the PostgreSQL database, you need to create a `.env` file in the `backend/` directory with your database credentials.

Example `backend/.env` file:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

**Note:** Replace `your_db_username`, `your_db_password`, and `your_db_name` with your actual PostgreSQL credentials.

### 2. TypeORM Data Source

The TypeORM `DataSource` configuration is located in `backend/src/data-source.ts`. This file defines the database connection details, paths to entities, and migrations.

### 3. Entities

Currently, the following minimal TypeORM entities are defined:
*   `User` (`backend/src/entity/User.ts`)
*   `Product` (`backend/src/entity/Product.ts`)

These entities represent the `users` and `products` tables in the database.

### 4. Database Migrations 
*   **To generate a new migration:**
    - **NOTE**: migration files are already created in `migration` folder, you don't have to generate it again. 
    ```bash
    npm run typeorm migration:generate -- -d src/data-source.ts src/migration/YourMigrationName
    ```
*   **To run (apply) pending migrations:**
    ```bash
    npm run typeorm migration:run -- -d src/data-source.ts
    ```
    (This will create the `users` and `products` tables if they don't exist.)

### 5. Data Seeding
 We have added a `seed` script to `backend/package.json`.

*   **To run the seeders:**
    ```bash
    npm run seed
    ```
    (This will insert sample `User` and `Product` data into your database.)

## Running the Application

To start the backend development server:

```bash
npm run dev
```