import { Entity } from "./entity";
import { HurtTypes } from "./corecomponents";
import { clearEntity, setSprite } from "./helpers";

/**
 * We assume here that monsters are in order
 * with player being the first monster
 * @param ents
 */
export function coordinateMonsters(ents: Entity[], layer: PIXI.Container) {
    let player: Entity;
    let monsters: Entity[] = [];

    ents.forEach(ent => {
        if (ent.control !== undefined && ent.pos !== undefined) {
            player = ent;
        }

        if (ent.monster !== undefined && ent.vel !== undefined && ent.pos !== undefined && player !== undefined) {
            monsters.push(ent);
        }
    });

    for (let i = 0; i < monsters.length; i++) {
        // if a monster isn't attacking or following (just spawned), then move
        // the monster to the left until he is behind the player
        if (!monsters[i].monster.following) {// && !monsters[i].monster.attacking) {
            monsters[i].vel.left = true;
        }
        else {
            // reduce ticks
            monsters[i].monster.ticksUntilFollow--;

            // set ready signal
            if (!player.control.monsterSent && i === 0) {
                const rdySignal = new Entity();
                rdySignal.pos = { x: monsters[i].pos.x + 55, y: monsters[i].pos.y - 45};
                rdySignal.vel = monsters[i].vel;
                rdySignal.sprite = setSprite("data/textures/readysignal.png", rdySignal.pos.x, rdySignal.pos.y, layer, 8);
                rdySignal.timer = { ticks: 1};
                ents.push(rdySignal);
            }

            // set unready signal
            if (player.control.monsterSent && i === 0) {
                const rdySignal = new Entity();
                rdySignal.pos = { x: monsters[i].pos.x + 55, y: monsters[i].pos.y - 45};
                rdySignal.vel = monsters[i].vel;
                rdySignal.sprite = setSprite("data/textures/notreadysignal.png", rdySignal.pos.x, rdySignal.pos.y, layer, 8);
                rdySignal.timer = { ticks: 1};
                ents.push(rdySignal);
            }

            if (player.control.sendMonster && !player.control.monsterSent) {
                if (i === 0) {
                    // set send signal
                    const sendSignal = new Entity();
                    sendSignal.pos = { x: player.pos.x + 75, y: player.pos.y };
                    sendSignal.vel = player.vel;
                    sendSignal.sprite = setSprite("data/textures/sendmonster.png", sendSignal.pos.x, sendSignal.pos.y, layer, 8);
                    sendSignal.timer = { ticks: 15 };
                    ents.push(sendSignal);

                    player.control.monsterSent = true;
                    monsters[i].vel = { right: true, left: false, up: false, down: false, speed: 3 };
                    // don't want the monster in any new monster list so set the monster component to undefined
                    monsters[i].monster = undefined;
                    // set hitBox:
                    monsters[i].hitBox = { collidesWith: [HurtTypes.holyKnight], height: monsters[i].sprite.height, width: monsters[i].sprite.width, 
                        onHit: function() { 
                            clearEntity(ents, monsters[i]);
                            // big unholy explosions
                            let hurtSound = new Audio("./data/audio/hurt.wav");
                            hurtSound.play();
                            hurtSound.volume = .7;
                        }
                    };

                    // send sound
                    let sendSound = new Audio("./data/audio/send.wav");
                    sendSound.play();
                    sendSound.volume = 1;
                    continue;
                }
            }

            // if ticks are 0, then begin to follow
            if (monsters[i].monster.ticksUntilFollow <= 0) {
                monsters[i].vel = monsters[i].monster.followList[0];
                // remove first element of follow list array
                monsters[i].monster.followList.shift();
            }

            // if first monster, set follow list to follow player
            if (i === 0) {
                // explicity set so as to not accidently box vel
                monsters[i].monster.followList.push({
                    left: player.vel.left,
                    right: player.vel.right,
                    up: player.vel.up,
                    down: player.vel.down,
                    speed: player.vel.speed,
                });

                // to reduce encroaching
                if (monsters[i].pos.x > player.pos.x - 100) {
                    monsters[i].pos.x-=1;
                }
                // if monster in front got popped by holy blast, move this one up a bit
                // or has been sent out to attack
                if (monsters[i].pos.x < player.pos.x - 150) {
                    monsters[i].pos.x+=1;
                }
            }
            else { // else set to follow next monster in line
                // explicity set so as to not accidently box vel
                monsters[i].monster.followList.push({
                    left: monsters[i-1].vel.left,
                    right: monsters[i-1].vel.right,
                    up: monsters[i-1].vel.up,
                    down: monsters[i-1].vel.down,
                    speed: monsters[i-1].vel.speed,
                });

                // to reduce encroaching
                if (monsters[i].pos.x > monsters[i-1].pos.x - 100) {
                    monsters[i].pos.x-=1;
                }
                // if monster in front got popped by holy blast, move this one up a bit
                // or has been sent out to attack
                if (monsters[i].pos.x < monsters[i-1].pos.x - 150) {
                    monsters[i].pos.x+=1;
                }
            }
        }

        if (i === 0) { // if first monster have monster come right behind player to follow
            if (monsters[i].pos.x < player.pos.x - 100) {
                monsters[i].monster.following = true;
                monsters[i].vel.left = false;
            }
        }
        else { // otherwise have monster come next in line to follow
            if (monsters[i].pos.x < monsters[i-1].pos.x - 100) {
                monsters[i].monster.following = true;
                monsters[i].vel.left = false;
            }
        }
    }
}