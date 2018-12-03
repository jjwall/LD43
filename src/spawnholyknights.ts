import { Entity } from "./entity";
import { setSprite, setHurtBoxGraphic, clearEntity } from "./helpers";
import { HurtTypes } from "./corecomponents";

export function spawnHolyKnights(ents: Entity[], layer: PIXI.Container) {
    const randomNum = Math.floor(Math.random() * (750 - 0 + 1)) + 0;

    if (randomNum === 112) {
        let knight = new Entity();
        knight.pos = { x: 1250, y: 500 }
        knight.sprite = setSprite("data/textures/ship.png", knight.pos.x, knight.pos.y, layer, 8);
        knight.graphic = setHurtBoxGraphic(layer, knight.sprite.width, knight.sprite.height);
        knight.vel = { left: true, right: false, up: false, down: false, speed: 1 };
        knight.hurtBox = { type: HurtTypes.holyKnight, height: knight.sprite.height, width: knight.sprite.width, 
            onHurt: function() { 
                clearEntity(ents, knight);
            }
        };

        knight.holyKnight = { isAttacking: false, attackTicks: 50, randomBlastRange: 0 };
        ents.push(knight);
    }
};