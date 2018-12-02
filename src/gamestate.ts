/// <reference path="./types/json.d.ts" />
import { State } from "./state";
import { Entity } from "./entity";
// import { renderSystem } from "./rendersystem";
import { BoardhouseUI } from "./boardhouseui";
import { controlSystem, renderSystem, collisionSystem, timerSystem, animationSystem, velocitySystem } from "./coresystems";
import { setSprite, setHitBoxGraphic, setHurtBoxGraphic } from "./helpers";
import { initializeControls, HurtTypes, initializeAnimation } from "./corecomponents";
import playerAnim from "../data/animations/player.json";
import { spawnPeasants } from "./spawnpeasants";
import { coordinateMonsters } from "./coordinatemonsters";

/**
 * GameState that handles updating of all game-related systems.
 */
export class GameState implements State {
    public entities: Entity[];
    public rootWidget: BoardhouseUI.Widget;
    constructor(stage: PIXI.Container){
        this.entities = [];
        // set up entities
        let player = new Entity();
        player.pos = { x: 0, y: 525 };
        player.sprite = setSprite("data/textures/girl.png", player.pos.x, player.pos.y, stage, 8);
        player.control = initializeControls();
        // player.monster = {};
        // player.anim = initializeAnimation("walk", playerAnim);
        player.vel = { left: false, right: false, up: false, down: false, speed: 2 };
        // player.hitBox ={ collidesWith: [HurtTypes.test], height: player.sprite.height, width: player.sprite.width, onHit: function() { console.log("hit")}};
        // player.graphic = setHitBoxGraphic(stage, player.sprite.width, player.sprite.height)

        this.entities.push(player);
        this.rootWidget = new BoardhouseUI.Widget();
    }

    public update(stateStack: State[], stage: PIXI.Container) {
        // call core systems
        controlSystem(this.entities, stage);
        velocitySystem(this.entities);
        collisionSystem(this.entities);
        animationSystem(this.entities);
        timerSystem(this.entities);

        // call miscellaneous free functions / systems
        spawnPeasants(this.entities, stage);
        coordinateMonsters(this.entities);
    }

    public render(canvas: HTMLCanvasElement, stage: PIXI.Container) {
        renderSystem(this.entities, canvas);
        // check if children needs to be reconciled, then do so
        BoardhouseUI.ReconcilePixiDom(this.rootWidget, stage);
    }
}