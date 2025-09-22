-- creating Users table

CREATE TABLE IF NOT EXISTS users (
    -- serial: auto increment: 
    id SERIAL PRIMARY KEY, 
    -- unique: no duplicates
    email VARCHAR(255) UNIQUE NOT NULL, 
    password_hash TEXT NOT NULL, 
    -- automatically set when created
    created_at TIMESTAMP DEFAULT NOW()
);

-- creating an index for faster email lookups
CREATE INDEX IF NOT EXISTS index_users_email ON users(email); 

-- conflict: if already exists, don't throw error
INSERT INTO users (email, password_hash) VALUES
('iamtestingpostgre-migration@j.com', 'myhasedpassword')
ON CONFLICT (email) DO NOTHING; 

