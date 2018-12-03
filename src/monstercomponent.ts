import { VelocityComponent } from "./corecomponents";

export interface MonsterComponent {
    following: boolean;
    ticksUntilFollow: number;
    followList: VelocityComponent[];
}