//Products table schema
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary(); 
        table.string('name', 255).notNullable(); 
        table.text('description'); 
        table.integer('price').notNullable(); 
        table.integer('stock').defaultTo(0).notNullable(); 
        //adds created at and updated at columns
        table.timestamps(true, true); 
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('products'); 
}

