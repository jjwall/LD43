import { Entity } from "./entity";

/**
 * We assume here that monsters are in order
 * with player being the first monster
 * @param ents
 */
export function coordinateMonsters(ents: Entity[]) {
    let player: Entity;
    let monsters: Entity[] = [];

    ents.forEach(ent => {
        if (ent.control !== undefined && ent.pos !== undefined) {
            player = ent;
        }

        if (ent.monster !== undefined && ent.vel !== undefined && ent.pos !== undefined && player !== undefined) {
            monsters.push(ent);
        }
    });

    for (let i = 0; i < monsters.length; i++) {
        if (!monsters[i].monster.following) {
            monsters[i].vel.left = true;
        }
        else {
            // if (i === 0) {
            monsters[i].vel = player.vel;
        }
        if (i === 0) { // if first monster follow player
            if (monsters[i].pos.x < player.pos.x - 100) {
                monsters[i].monster.following = true;
                monsters[i].vel.left = false;
            }
        }
        else { // follow next monster in line
            if (monsters[i].pos.x < monsters[i-1].pos.x - 100) {
                monsters[i].monster.following = true;
                monsters[i].vel.left = false;
            }
        }
    }
}