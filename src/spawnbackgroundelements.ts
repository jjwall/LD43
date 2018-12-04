import { Entity } from "./entity";
import { setSprite } from "./helpers";

export function spawnBackgroundElements(ents: Entity[], layer: PIXI.Container, roadTicker: { ticks: number }) {
    roadTicker.ticks++;
    const randomNum = Math.floor(Math.random() * (1250 - 0 + 1)) + 0;
    if (randomNum === 5) {
        let cottage = new Entity();
        cottage.pos = { x: 1250, y: 305 }
        cottage.sprite = setSprite("data/textures/cottage.png", cottage.pos.x, cottage.pos.y, layer, 8);
        cottage.vel = { left: true, right: false, up: false, down: false, speed: 0.3 }

        ents.push(cottage);
    }

    if (roadTicker.ticks >= 530) {
        let road = new Entity();
        road.sprite = setSprite("data/textures/road.png", 1280, 560, layer, 8);
        road.pos = { x: road.sprite.x, y: road.sprite.y };
        road.vel = { left: true, right: false, up: false, down: false, speed: 0.3 }
        ents.push(road);
        roadTicker.ticks = 0;
    }
}