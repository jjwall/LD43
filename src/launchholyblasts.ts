import { Entity } from "./entity";
import { setSprite } from "./helpers";
import { HurtTypes } from "./corecomponents";

export function launchHolyBlasts(ents: Entity[], layer: PIXI.Container) {
    ents.forEach(ent => {
        if (ent.holyKnight !== undefined && ent.pos !== undefined && ent.vel !== undefined) {
            let randomNum = Math.floor(Math.random() * (750 - 0 + 1)) + 0;

            if (ent.holyKnight.isAttacking) {
                ent.holyKnight.attackTicks--;

                // send attack out at tick = 5
                if (ent.holyKnight.attackTicks === 5) {
                    let holyBlast = new Entity();
                    holyBlast.pos = {x: ent.pos.x - ent.holyKnight.randomBlastRange, y: 0 };
                    holyBlast.sprite = setSprite("data/textures/holyblast.png", holyBlast.pos.x, holyBlast.pos.y, layer, 8);
                    holyBlast.hitBox = { collidesWith: [HurtTypes.player, HurtTypes.monster], height: holyBlast.sprite.height, width: holyBlast.sprite.width, 
                        onHit: function() { 
                            // big holy explosions
                        }
                    };
                    holyBlast.timer = { ticks: 5 };
                    // set hitbox

                    ents.push(holyBlast);
                }

                if (ent.holyKnight.attackTicks <= 0) {
                    ent.holyKnight.attackTicks = 50;
                    ent.holyKnight.isAttacking = false;
                    ent.vel.speed = 1;
                }
            }
            else {
                if (randomNum === 77) {
                    ent.holyKnight.isAttacking = true;
                    ent.holyKnight.randomBlastRange = Math.floor(Math.random() * (500 - 0 + 1)) + 0;
                    // set blast warning
                    let warning = new Entity();
                    warning.pos = { x: ent.pos.x - ent.holyKnight.randomBlastRange + 12, y: 0 };
                    warning.sprite = setSprite("data/textures/warning1.png", warning.pos.x, 0, layer, 4);
                    // add warning anim
                    warning.timer = { ticks: 50 };
                    ents.push(warning);

                    ent.vel.speed = 0.3;
                    // set anim
                }
            }
        }
    });
}