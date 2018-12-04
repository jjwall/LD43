import { Entity } from "./entity";
import { setSprite, changeSequence } from "./helpers";
import { HurtTypes, initializeAnimation } from "./corecomponents";
import knightAnim from "../data/animations/holyknight.json";

export function launchHolyBlasts(ents: Entity[], layer: PIXI.Container) {
    ents.forEach(ent => {
        if (ent.holyKnight !== undefined && ent.pos !== undefined && ent.vel !== undefined && ent.anim !== undefined) {
            let randomNum = Math.floor(Math.random() * (350 - 0 + 1)) + 0;

            if (ent.holyKnight.isAttacking) {
                // if (ent.holyKnight.attackTicks === 50) {
                // }
                ent.holyKnight.attackTicks--;

                // send attack out at tick = 5
                if (ent.holyKnight.attackTicks === 5) {
                    let holyBlast = new Entity();
                    holyBlast.pos = {x: ent.pos.x - ent.holyKnight.randomBlastRange, y: 0 };
                    holyBlast.sprite = setSprite("data/textures/holyblast.png", holyBlast.pos.x, holyBlast.pos.y, layer, 8);
                    holyBlast.hitBox = { collidesWith: [HurtTypes.player, HurtTypes.monster], height: holyBlast.sprite.height, width: holyBlast.sprite.width, 
                        onHit: function() { 
                            // big holy explosions
                            let hurtSound = new Audio("./data/audio/hurt.wav");
                            hurtSound.play();
                            hurtSound.volume = .7;
                        }
                    };
                    holyBlast.timer = { ticks: 5 };
                    // set hitbox

                    ents.push(holyBlast);

                    let holyBlastSound = new Audio("./data/audio/holyblast.wav");
                    holyBlastSound.play();
                    holyBlastSound.volume = .5;
                }

                if (ent.holyKnight.attackTicks <= 0) {
                    ent.anim = changeSequence("walk", ent.anim);
                    ent.holyKnight.attackTicks = 50;
                    ent.holyKnight.isAttacking = false;
                    ent.vel.speed = 1;
                }

                // if (ent.holyKnight.attackTicks > 15 && !ent.holyKnight.attackAnimEnd) {
                //     ent.holyKnight.attackAnimEnd = true;
                //     ent.anim = changeSequence("walk", ent.anim);
                // }
            }
            else {
                if (randomNum === 77) {
                    // ent.anim = initializeAnimation("attack", knightAnim);
                    ent.holyKnight.isAttacking = true;
                    // ent.holyKnight.attackAnimEnd = false;
                    ent.holyKnight.randomBlastRange = Math.floor(Math.random() * (500 - 0 + 1)) + 0;
                    // set blast warning
                    let warning = new Entity();
                    warning.pos = { x: ent.pos.x - ent.holyKnight.randomBlastRange + 12, y: 200 };
                    warning.sprite = setSprite("data/textures/warning1.png", warning.pos.x, 0, layer, 4);
                    // add warning anim
                    warning.timer = { ticks: 50 };
                    ents.push(warning);

                    ent.vel.speed = 0.3;
                    // set anim
                    ent.anim = changeSequence("attack", ent.anim);
                }
            }
        }
    });
}