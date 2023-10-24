import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('planet', table => {
            table.increments('id').notNullable().unique();
            table.string('name').unique();
            table.string('code').primary().notNullable().unique();
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('planet');
}

