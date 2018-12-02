import { Entity } from "./entity";
import { setSprite } from "./helpers";

export function createMonster(posX: number, posY: number, stage: PIXI.Container) : Entity {
    let monster = new Entity();
    monster.pos = { x: posX, y: posY };
    monster.vel = { left: false, right: false, up: false, down: false, speed: 3 }
    monster.sprite = setSprite("data/textures/girl.png", posX, posY, stage, 8);
    monster.monster = { following: false };
    return monster;
}