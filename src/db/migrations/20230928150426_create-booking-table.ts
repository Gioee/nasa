import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('booking', table => {
            table.increments('id').primary().notNullable().unique();
            table.integer('seat_count').notNullable();
            table.string('email').notNullable();
            table.string('flight_code').notNullable().references('code').inTable('flight');
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('booking');
}

