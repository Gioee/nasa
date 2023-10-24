import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('flight', table => {
            table.increments('id');
            table.string('code').primary().notNullable().unique();
            table.datetime('departure_at').notNullable();
            table.integer('seat_count').notNullable();
            table.string('launch_uid').notNullable().references('uid').inTable('space_center');
            table.string('land_uid').notNullable().references('uid').inTable('space_center');
            table.integer('seat_available').notNullable()
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('flight');
}

