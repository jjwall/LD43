import { Entity } from "./entity";
import { setSprite } from "./helpers";

export function spawnBackgroundElements(ents: Entity[], layer: PIXI.Container) {
    const randomNum = Math.floor(Math.random() * (1250 - 0 + 1)) + 0;
    if (randomNum === 5) {
        let cottage = new Entity();
        cottage.pos = { x: 1250, y: 465 }
        cottage.sprite = setSprite("data/textures/cottage.png", cottage.pos.x, cottage.pos.y, layer, 8);
        cottage.vel = { left: true, right: false, up: false, down: false, speed: 0.3 }

        ents.push(cottage);
    }

}