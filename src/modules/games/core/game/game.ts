import { Engine, Events, Composite, Bodies, Runner } from 'matter-js';

import { CollisionCategories } from '../constants/collision-categories.enum';

import { Map as MapEntity } from 'src/modules/maps/entities/map.entity';

import { GameObjectsUpdatedWsResponse } from '../../types/ws-responses/game-objects-updated.ws-response';

import { EventsManager } from './events-manager';
import { GameBroadcaster } from './game-broadcaster';
import { GameObjectsStore } from './game-objects-store';
import { GameScheduler } from './game-scheduler';
import { IdGenerator } from './id-generator';
import { PlayersStore } from './players-store';
import { CollisionsObserver } from './collisions-observer';

import { RenderableGameObject } from '../game-objects/renderable-game-object';

const gameIdGenerator = new IdGenerator();

export abstract class Game {
  public static readonly gamemodeName: string;
  public static readonly maxPlayersCount: number;

  protected _startTime: number;

  private readonly _scheduler = new GameScheduler(this);
  private readonly _engine = Engine.create();
  private readonly _world = this._engine.world;
  private _runner: any;

  public readonly id = gameIdGenerator.generateNext();

  public readonly broadcaster = new GameBroadcaster();
  public readonly eventsManager = new EventsManager();
  public readonly gameObjectsStore: GameObjectsStore;
  public readonly playersStore: PlayersStore;

  constructor(protected readonly _map: MapEntity) {
    this._world.gravity.y = 0;

    this.initializeBounds();

    const collisionsObserver = new CollisionsObserver();
    Events.on(
      this._engine,
      'collisionStart',
      collisionsObserver.onCollisionStart.bind(collisionsObserver),
    );
    Events.on(
      this._engine,
      'collisionEnd',
      collisionsObserver.onCollisionEnd.bind(collisionsObserver),
    );

    this.gameObjectsStore = new GameObjectsStore(this, this.broadcaster);
    this.playersStore = new PlayersStore(
      this.maxPlayersCount,
      this.gameObjectsStore,
      _map.width,
      _map.height,
    );
  }

  private initializeBounds(): void {
    const { width, height } = this._map;
    const wallThickness = 100;
    const wallPhysicsConfig = { isStatic: true, friction: 0, restitution: 0 };

    // Array<[x, y, w, h]>
    const walls = [
      [0, -height / 2 - wallThickness / 2, width, wallThickness],
      [0, height / 2 + wallThickness / 2, width, wallThickness],
      [-width / 2 - wallThickness / 2, 0, wallThickness, height],
      [width / 2 + wallThickness / 2, 0, wallThickness, height],
    ];

    Composite.add(
      this._world,
      walls.map(([x, y, w, h]) => {
        const wall = Bodies.rectangle(x, y, w, h, wallPhysicsConfig);
        wall.collisionFilter.category = CollisionCategories.PlayerCollider;
        wall.collisionFilter.mask = CollisionCategories.Player;
        return wall;
      }),
    );
  }

  public get gamemodeName(): string {
    return this.constructor['gamemodeName'];
  }

  public get maxPlayersCount(): number {
    return this.constructor['maxPlayersCount'];
  }

  public get mapId(): number {
    return this._map.id;
  }

  public get world(): any {
    return this._world;
  }

  public start(): void {
    this._runner = Runner.create();
    Runner.run(this._runner, this._engine);

    const updatesPerSecond = 30;
    this._scheduler.start(updatesPerSecond);

    this.eventsManager.emit('start', this);
    this._startTime = Date.now();
  }

  // Responsible for stopping game loop
  public stop(): void {
    Runner.stop(this._runner);
    this._scheduler.stop();

    this.eventsManager.emit('stop', this);
  }

  // Responsible for sending data about winner team to all clients
  public finish(): void {
    this.eventsManager.emit('finish', this);
  }

  public abstract shouldFinish(): boolean;

  public update(deltaTime: number): void {
    const updatedGameObjects = [];

    this.gameObjectsStore.iterate((gameObject) => {
      gameObject.update(deltaTime);

      if (gameObject.shouldDestroy) {
        return this.gameObjectsStore.delete(gameObject);
      }

      if (gameObject instanceof RenderableGameObject) {
        if (gameObject.shouldReRender()) {
          updatedGameObjects.push({
            id: gameObject.id,
            renderData: gameObject.getDataToRender(),
          });
        }
      }
    });

    const response = new GameObjectsUpdatedWsResponse(updatedGameObjects);
    this.broadcaster.broadcast(response);

    if (this.shouldFinish()) {
      this.stop();
      this.finish();
    }
  }
}
