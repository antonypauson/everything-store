//Users table schema
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary(); 
        table.string('name').notNullable(); 
        table.string('email', 255).notNullable(); 
        table.text('password_hash').unique().notNullable(); 
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users'); 
}

