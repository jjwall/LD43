import { State } from "./state";
import { Entity } from "./entity";
import { BoardhouseUI } from "./boardhouseui";
import { controlSystem, renderSystem, collisionSystem, timerSystem, animationSystem, velocitySystem } from "./coresystems";
import { setSprite, setHitBoxGraphic, setHurtBoxGraphic, clearStage, clearEntity } from "./helpers";
import { initializeControls, HurtTypes, initializeAnimation } from "./corecomponents";
import necroAnim from "../data/animations/necro.json";
import { spawnPeasants } from "./spawnpeasants";
import { coordinateMonsters } from "./coordinatemonsters";
import { spawnBackgroundElements } from "./spawnbackgroundelements";
import { spawnHolyKnights } from "./spawnholyknights";
import { launchHolyBlasts } from "./launchholyblasts";
import { cleanUpEntites } from "./cleanupentities";
import { LoseState } from "./losestate";
import { createMonster } from "./createmonster";

/**
 * GameState that handles updating of all game-related systems.
 */
export class GameState implements State {
    public entities: Entity[];
    public rootWidget: BoardhouseUI.Widget;
    public layer1: PIXI.Container; // for player
    public layer2: PIXI.Container; // for game objects
    public layer3: PIXI.Container; // for background elements
    public roadTicker: {ticks: number};
    constructor(stateStack: State[], stage: PIXI.Container){
        this.entities = [];
        // let ents = this.entities;
        this.roadTicker = {ticks: 0};
        this.layer1 = new PIXI.Container();
        this.layer2 = new PIXI.Container();
        this.layer3 = new PIXI.Container();
        this.layer1.addChild(this.layer2);
        this.layer2.addChild(this.layer3);
        stage.addChild(this.layer1);
        let background = setSprite("data/textures/background.png", 0, 0, this.layer3, 1);
        this.layer3.addChild(background);
        // set up entities
        let player = new Entity();
        player.pos = { x: 300, y: 460 };
        player.sprite = setSprite("data/textures/necrowalk1.png", player.pos.x, player.pos.y, this.layer1, 8);
        player.control = initializeControls();
        player.anim = initializeAnimation("walk", necroAnim);
        player.vel = { left: false, right: false, up: false, down: false, speed: 2 };
        player.health = { hitPoints: 100 };
        player.hurtBox = { type: HurtTypes.player, height: player.sprite.height, width: player.sprite.width - 40, 
            onHurt: function() {
                player.health.hitPoints -= 4;
                // label.setText("HP: " + player.health.hitPoints);
                healthBar.destroy();
                const newWidth = 1260 * (player.health.hitPoints / 100);
                healthBar = new PIXI.Graphics();
                healthBar.beginFill(0x660000);
                healthBar.drawRect(10,10, newWidth, 50);
                healthBar.endFill();
                stage.addChild(healthBar);

                if (player.health.hitPoints <= 0) {
                    let loseState = new LoseState(stateStack, stage);

                    // remove all containers from rootWidget before pushing new state
                    // console.log("clearing stage...");
                    // clearStage(label.selfContainer);

                    // remove all entities
                    // console.log("clearing [[ " + ents.length + " ]] ents...");
                    // ents.forEach(ent => {
                    //     // clearEntity(ents, ent);
                    //     ent.timer = { ticks: 0 }
                    // });
                    
                    // clear stateStack;
                    // stateStack = []
                    stateStack.push(loseState);
                }
            }
        }
        // player.graphic = setHurtBoxGraphic(stage, player.hurtBox.width, player.hurtBox.height);

        let monster1 = createMonster(this.entities, player.pos.x, player.pos.y, this.layer2);
        let monster2 = createMonster(this.entities, player.pos.x, player.pos.y, this.layer2);
        let monster3 = createMonster(this.entities, player.pos.x, player.pos.y, this.layer2);

        this.entities.push(player);
        this.entities.push(monster1);
        this.entities.push(monster2);
        this.entities.push(monster3);

        // set up UI
        // let healthBarContainer = new PIXI.Graphics();
        // healthBarContainer.lineStyle(4, 0xE0FFFF, 1);
        // healthBarContainer.drawRect(10, 10, 1260, 50);
        // stage.addChild(healthBarContainer);
        let healthBar = new PIXI.Graphics();
        healthBar.beginFill(0x660000);
        healthBar.drawRect(10,10, 1260, 50);
        healthBar.endFill();
        stage.addChild(healthBar);

        // set road
        let offsetX = 0;
        for (let i = 0; i < 9; i++) {
            let road = new Entity();
            road.sprite = setSprite("data/textures/road.png", offsetX, 560, this.layer3, 8);
            road.pos = { x: road.sprite.x, y: road.sprite.y };
            road.vel = { left: true, right: false, up: false, down: false, speed: 0.3 }
            this.entities.push(road);
            offsetX += 160;
        }
        
        // let label = BoardhouseUI.CreateWidget();
        // label.setText("HP: " + player.health.hitPoints);

        // label.left = 20;
        // label.top = 20;
        // this.rootWidget = label;
        this.rootWidget = new BoardhouseUI.Widget();
    }

    public update(stateStack: State[], stage: PIXI.Container){//, layer2: PIXI.Container) {
        // call core systems
        controlSystem(this.entities, stage);
        velocitySystem(this.entities);
        collisionSystem(this.entities);
        animationSystem(this.entities);
        timerSystem(this.entities);

        // call miscellaneous free functions / systems
        spawnPeasants(this.entities, this.layer2);
        spawnHolyKnights(this.entities, this.layer2);
        launchHolyBlasts(this.entities, this.layer1);
        coordinateMonsters(this.entities, this.layer2);
        spawnBackgroundElements(this.entities, this.layer3, this.roadTicker);

        // clean up entities that are no longer in the scene
        cleanUpEntites(this.entities);
    }

    public render(canvas: HTMLCanvasElement, stage: PIXI.Container) {
        renderSystem(this.entities, canvas);
        // check if children needs to be reconciled, then do so
        BoardhouseUI.ReconcilePixiDom(this.rootWidget, stage);
    }
}