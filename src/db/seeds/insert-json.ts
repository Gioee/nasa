import { Knex } from "knex";
import planet from './planets.json';
import space_center from './space-centers.json';

export async function seed(knex: Knex): Promise<void> {

    // Deletes ALL existing entries
    await knex("planet").del();
    await knex("space_center").del();

    // Inserts seed entries
    await knex("planet").insert(planet);
    await knex("space_center").insert(space_center);
};
