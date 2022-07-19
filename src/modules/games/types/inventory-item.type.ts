import { RenderableGameObject } from '../core/game-objects/renderable-game-object';

export interface InventoryItem {
  texture: string;

  drop(): RenderableGameObject;
}
