import { Entity } from "./entity";
import { setSprite, setHurtBoxGraphic, clearEntity } from "./helpers";
import { HurtTypes } from "./corecomponents";
import { createMonster } from "./createmonster";

export function spawnPeasants(ents: Entity[], stage: PIXI.Container) {
    const randomNum = Math.floor(Math.random() * (750 - 0 + 1)) + 0;

    if (randomNum === 15 || randomNum === 67) {
        let peasant = new Entity();
        peasant.pos = { x: 1250, y: 500 }
        peasant.sprite = setSprite("data/textures/peasant1idle1.png", peasant.pos.x, peasant.pos.y, stage, 8);
        peasant.hurtBox = { type: HurtTypes.peasant, height: peasant.sprite.height, width: peasant.sprite.width, 
            onHurt: function() { 
                clearEntity(ents, peasant);
                let newMonster = createMonster(ents, peasant.pos.x, peasant.pos.y, stage);
                ents.push(newMonster);
            }
        };
        peasant.graphic = setHurtBoxGraphic(stage, peasant.sprite.width, peasant.sprite.height);
        peasant.vel = { left: true, right: false, up: false, down: false, speed: 0.3 };

        ents.push(peasant);
    }
}

