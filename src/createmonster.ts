import { Entity } from "./entity";
import { setSprite } from "./helpers";

export function createMonster(posX: number, posY: number, stage: PIXI.Container) : Entity {
    let monster = new Entity();
    monster.pos = { x: posX, y: posY };
    monster.vel = { left: true, right: false, up: false, down: false, speed: 2 }
    monster.sprite = setSprite("data/textures/girl.png", posX, posY, stage, 8);
    return monster;
}