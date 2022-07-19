import { GameObject } from '../core/game-objects/game-object';

export type InteractionHandler = (object: GameObject) => any | void;
