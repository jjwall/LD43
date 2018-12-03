import { State } from "./state";
import { BoardhouseUI } from "./boardhouseui";
import { GameState } from "./gamestate";
import { Entity } from "./entity";
import { setSprite, clearStage } from "./helpers";

/**
 * Main Menu state that handles setting up all the start up processes.
 */
export class LoseState implements State {
    public entities: Entity[];
    public rootWidget: BoardhouseUI.Widget;
    constructor(stateStack: State[], stage: PIXI.Container) {
        this.entities = [];

        let resetButton = BoardhouseUI.CreateWidget({
            color: 0x008080,
            height: 50,
            width: 155,
            lineWidth: 4,
            lineColor: 0xE0FFFF
        });
        resetButton.left = 500;
        resetButton.top = 300;
        
        let label = BoardhouseUI.CreateWidget();
        label.setText("Retry");

        resetButton.appendChild(label);
        label.left = 45;
        label.top = 10;

        resetButton.onClick = function() {
            // set up game state
            let gameState = new GameState(stateStack, stage);

            // remove all containers from rootWidget before pushing new state
            clearStage(resetButton.selfContainer);
            
            stateStack.push(gameState);
        }

        resetButton.onHover = function() {
            resetButton.style.color = 0x000000;
            label.setText("Retry", new PIXI.TextStyle({fill: 0xFFFFFF}));
        }

        resetButton.offHover = function() {
            resetButton.style.color = 0x008080;
            label.setText("Retry", new PIXI.TextStyle({fill: 0x000000}));
        }

        this.rootWidget = resetButton;
    }
    public update(stateStack: State[], stage: PIXI.Container) {
        // ...
    }

    public render(canvas: HTMLCanvasElement, stage: PIXI.Container) {
        BoardhouseUI.ReconcilePixiDom(this.rootWidget, stage);
    }
}