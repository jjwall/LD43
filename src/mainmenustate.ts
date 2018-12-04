import { State } from "./state";
import { BoardhouseUI } from "./boardhouseui";
import { GameState } from "./gamestate";
import { Entity } from "./entity";
import { setSprite, clearStage } from "./helpers";

/**
 * Main Menu state that handles setting up all the start up processes.
 */
export class MainMenuState implements State {
    public entities: Entity[];
    public rootWidget: BoardhouseUI.Widget;
    constructor(stateStack: State[], stage: PIXI.Container) {
        this.entities = [];

        let startButton = BoardhouseUI.CreateWidget({
            color: 0x008080,
            height: 50,
            width: 155,
            lineWidth: 4,
            lineColor: 0xE0FFFF
        });
        startButton.left = 500;
        startButton.top = 300;
        
        let label = BoardhouseUI.CreateWidget();
        label.setText("Start Game");
        let title = BoardhouseUI.CreateWidget();
        title.setText("Creatures of the Night", new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 52,
            fill: "white",
            stroke: '#ff3300',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        }));
        label.appendChild(title);
        title.top = -100;
        title.left = -165;

        startButton.appendChild(label);
        label.left = 10;
        label.top = 10;

        startButton.onClick = function() {
            let music:HTMLAudioElement = new Audio("data/audio/necro.mp3");
            music.play();
            music.volume = 0.5;
            music.loop = true;
            // set up game state
            let gameState = new GameState(stateStack, stage);

            // remove all containers from rootWidget before pushing new state
            clearStage(startButton.selfContainer);
            
            stateStack.push(gameState);
        }

        startButton.onHover = function() {
            startButton.style.color = 0x000000;
            label.setText("Start Button", new PIXI.TextStyle({fill: 0xFFFFFF}));
        }

        startButton.offHover = function() {
            startButton.style.color = 0x008080;
            label.setText("Start Button", new PIXI.TextStyle({fill: 0x000000}));
        }

        this.rootWidget = startButton;
    }
    public update(stateStack: State[], stage: PIXI.Container) {
        // ...
    }

    public render(canvas: HTMLCanvasElement, stage: PIXI.Container) {
        BoardhouseUI.ReconcilePixiDom(this.rootWidget, stage);
    }
}