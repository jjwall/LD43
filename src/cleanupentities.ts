import { Entity } from "./entity";
import { clearEntity } from "./helpers";

export function cleanUpEntites(ents: Entity[]) : void {
    ents.forEach(ent => {
        // clear non monsters (things moving to left)
        if (ent.monster === undefined && ent.pos !== undefined) {
            if (ent.pos.x < -1000) {
                clearEntity(ents, ent);
            }
        }
        // clear monsters (things moving to right)
        else if (ent.monster !== undefined && ent.pos !== undefined) {
            if (ent.pos.x > 1400) {
                clearEntity(ents, ent);
            }
        }
    });
}