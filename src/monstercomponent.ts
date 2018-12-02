import { VelocityComponent } from "./corecomponents";

export interface MonsterComponent {
    following: boolean;
    attacking: boolean;
    ticksUntilFollow: number;
    followList: VelocityComponent[];
}