import { Entity } from "./entity";
import { setSprite, setHurtBoxGraphic, clearEntity } from "./helpers";
import { HurtTypes, initializeAnimation } from "./corecomponents";
import knightAnim from "../data/animations/holyknight.json";

export function spawnHolyKnights(ents: Entity[], layer: PIXI.Container) {
    const randomNum = Math.floor(Math.random() * (250 - 0 + 1)) + 0;

    if (randomNum === 112) {
        let knight = new Entity();
        knight.pos = { x: 1250, y: 460 }
        knight.sprite = setSprite("data/textures/knightwalk1.png", knight.pos.x, knight.pos.y, layer, 8);
        knight.anim = initializeAnimation("walk", knightAnim);
        // knight.graphic = setHurtBoxGraphic(layer, knight.sprite.width, knight.sprite.height);
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