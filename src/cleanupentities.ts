import { Entity } from "./entity";
import { clearEntity } from "./helpers";

export function cleanUpEntites(ents: Entity[]) : void {
    ents.forEach(ent => {
        if (ent.monster === undefined && ent.pos !== undefined) {
            if (ent.pos.x < -1000) {
                clearEntity(ents, ent);
            }
        }
    });
}