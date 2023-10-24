import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('space_center', table => {
            table.increments('id').notNullable().unique();
            table.string('name');
            table.string('uid').primary().notNullable().unique();
            table.string('description', 1020);
            table.float('latitude', 8, 8);
            table.float('longitude', 8, 8);
            table.string('planet_code').notNullable().references('code').inTable('planet');
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('space_center');
}

