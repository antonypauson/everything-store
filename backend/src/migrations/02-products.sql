-- creating Products table

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    price INTEGER NOT NULL, 
    created_at TIMESTAMP DEFAULT NOW()
); 

-- inserting some data
INSERT INTO products (name, price) VALUES
('Laptop', 35000), 
('Keyboard', 1000), 
('Mouse', 500)
ON CONFLICT DO NOTHING; 

