import { Entity } from "./entity";
import { setSprite, clearEntity } from "./helpers";
import { initializeAnimation } from "./corecomponents";
import skeletonAnim from "../data/animations/skeleton.json";
import { HurtTypes } from "./corecomponents";

export function createMonster(ents: Entity[], posX: number, posY: number, stage: PIXI.Container) : Entity {
    let monster = new Entity();
    monster.pos = { x: posX, y: posY };
    monster.vel = { left: false, right: false, up: false, down: false, speed: 3 }
    monster.sprite = setSprite("data/textures/skeleton1.png", posX, posY, stage, 8);
    monster.anim = initializeAnimation("walk", skeletonAnim);
    monster.monster = { following: false, ticksUntilFollow: 30, followList: [] };
        monster.hurtBox = { type: HurtTypes.monster, height: monster.sprite.height, width: monster.sprite.width, 
            onHurt: function() {
                clearEntity(ents, monster);
            }
        }
    return monster;
}