import { WsResponse } from '@nestjs/websockets';
import { Body, Bodies, Composite } from 'matter-js';
import { Vector } from '../vector';

import { playerSize } from '../constants/player.constants';
import { CollisionCategories } from '../constants/collision-categories.enum';

import { GameObject } from '../game-objects/game-object';
import { Interactable } from '../../types/interactable.type';
import { Interactor } from '../interactor';

import { PlayerInitialData } from '../../types/player-initial-data.type';
import { PlayerIdWsResponse } from '../../types/ws-responses/player-id.ws-response';

import { WeaponsResolver } from '../resolvers/weapons.resolver';
import { WeaponsTransformer } from '../transformers/weapons.transformer';

import { WeaponsSwitcher } from './weapons-switcher';
import { KeyboardController } from './keyboard-controller';
import { MotionController } from './motion-controller';
import { MouseController } from './mouse-controller';
import { ShootingController } from './shooting-controller';
import { WeaponReloadingController } from './weapon-reloading-controller';
import { InteractionController } from './interaction-controller';
import { HpController } from './hp-controller';
import { PlayerInventory } from './inventory/inventory';

import { Clip } from '../clips/clip';

import { PlayerAppearanceObject } from '../game-objects/renderable/player-appearance-object.game-object';
import { PlayerWeaponObject } from '../game-objects/renderable/player-weapon.game-object';
import { ImageObject } from '../game-objects/renderable/image.game-object';
import { ClipInventoryItem } from './inventory/inventory-items/clip-inventory-item';
import { WeaponInventoryItem } from './inventory/inventory-items/weapon-inventory-item';
import { TextAttachedToPlayer } from '../game-objects/renderable/text-attached-to-player.game-object';
import { TextObject } from '../game-objects/renderable/text.game-object';
import { StatisicsController } from './statistics-controller';

export class Player extends GameObject implements Interactable {
  public collider: any;
  public bulletsCollider: any;
  public interactionCollider: any;
  public interactor: Interactor;
  public inventory: PlayerInventory;
  public readonly mouseController = new MouseController();
  public readonly keyboardController = new KeyboardController();
  public readonly hpController = new HpController(this);
  public readonly statisticsController = new StatisicsController();

  public readonly W = playerSize.w; // width
  public readonly H = playerSize.h; // height

  private _fractionName: string;
  private _weaponsSwitcher: WeaponsSwitcher;
  private _weaponReloadingController: WeaponReloadingController;
  private _shootingController: ShootingController;
  private _interactionController: InteractionController;

  private readonly _parts = new Map<string, ImageObject | TextObject>();
  private readonly _motionController = new MotionController(this);

  // Necessary so that the textures of the player do not overlap each other
  private readonly _partsOffsetZ = Math.random();

  constructor(private readonly _user: PlayerInitialData) {
    super();
    this.name = _user.username;
    this._fractionName = _user.fraction.name;
  }

  public get userData(): PlayerInitialData {
    return new Proxy(this._user, {
      set: () => false,
      defineProperty: () => false,
      deleteProperty: () => false,
    });
  }

  public get fractionName(): string {
    return this._fractionName;
  }

  public onCreate(): void {
    this.hpController.onDeath = () => this.die();

    this.inventory = new PlayerInventory(
      this._user.id,
      this.transform,
      this._game.gameObjectsStore,
      this._game.broadcaster,
    );
    this._weaponsSwitcher = new WeaponsSwitcher(
      this.keyboardController,
      this.inventory,
      (response: WsResponse) =>
        this._game.broadcaster.broadcastTo(this._user.id, response),
    );
    this._weaponReloadingController = new WeaponReloadingController(
      this._weaponsSwitcher,
      this.keyboardController,
    );
    this._shootingController = new ShootingController(
      this._weaponsSwitcher,
      this.mouseController,
    );

    this.initializeCollider();
    this.initializeBulletsCollider();
    this.initializeInteractor();
    this.initializeClips();
    this.initializeWeapons();
    this.initializeParts();

    const response = new PlayerIdWsResponse(this._parts.get('skin').id);
    this._game.broadcaster.broadcastTo(this._user.id, response);
  }

  public update(): void {
    this._motionController.update();
    this._weaponsSwitcher.update();
    this._weaponReloadingController.update();
    this._shootingController.update();

    this.inventory.update();

    this.updateEyebrowsAngle();
    this.updateViewDirection();
    this.updateSelectedWeapon();
    this.updatePartsZ();

    Body.setPosition(this.bulletsCollider, this.transform);
    Body.setPosition(this.interactionCollider, this.transform);
  }

  private initializeCollider(): void {
    const x = this.transform.x;
    const y = this.transform.y + 0.35 * this.H;
    const w = this.W;
    const h = 0.3 * this.H;

    this.collider = Bodies.rectangle(x, y, w, h, {
      restitution: 0,
      friction: 0,
    });

    this.collider.gameObject = this;
    this.collider.collisionFilter.mask =
      CollisionCategories.PlayerCollider + CollisionCategories.Bullet;
    this.collider.collisionFilter.category = CollisionCategories.Player;

    Body.setInertia(this.collider, Infinity);
    Composite.add(this._game.world, [this.collider]);
  }

  private initializeBulletsCollider(): void {
    const x = this.transform.x;
    const y = this.transform.y;
    const w = this.W;
    const h = this.H;

    this.bulletsCollider = Bodies.rectangle(x, y, w, h, {
      restitution: 0,
      friction: 0,
    });

    this.bulletsCollider.gameObject = this;
    this.bulletsCollider.collisionFilter.mask = CollisionCategories.Bullet;
    this.bulletsCollider.collisionFilter.category =
      CollisionCategories.PlayerBulletsCollider;

    Body.setInertia(this.bulletsCollider, Infinity);
    Composite.add(this._game.world, [this.bulletsCollider]);
  }

  private initializeInteractor(): void {
    const x = this.transform.x;
    const y = this.transform.y;
    const w = this.W;
    const h = this.H;

    this.interactionCollider = Bodies.rectangle(x, y, w, h, {
      restitution: 0,
      friction: 0,
    });

    this.interactor = new Interactor(this, this.interactionCollider);
    this._interactionController = new InteractionController(
      this._user.id,
      this,
      this.inventory,
      this._weaponsSwitcher,
      this._game.broadcaster,
      this.interactor,
    );

    Composite.add(this._game.world, [this.interactionCollider]);
  }

  private initializeParts(): void {
    const { x: playerX, y: playerY } = this.transform;

    const usernameObject = new TextAttachedToPlayer(this._user.username);
    usernameObject.transform.setPosition(playerX, playerY - 0.65 * this.H);
    this._parts.set('username_object', usernameObject);

    this._user.skins.forEach(({ skin }) => {
      switch (skin.type.name) {
        case 'Skin':
          const body = new PlayerAppearanceObject(skin);
          body.transform.setPosition(playerX, playerY);
          return this._parts.set('skin', body);

        case 'Mouth':
          const mouth = new PlayerAppearanceObject(skin);
          mouth.transform.setPosition(playerX, playerY + 0.15 * this.H);
          return this._parts.set('mouth', mouth);

        case 'Eyesockets':
          const leftEyesocket = new PlayerAppearanceObject(skin);
          leftEyesocket.transform.setPosition(
            playerX - 0.2 * this.W,
            playerY - 0.2 * this.H,
          );

          const rightEyesocket = new PlayerAppearanceObject(skin);
          rightEyesocket.flip.x = true;
          rightEyesocket.transform.setPosition(
            playerX + 0.2 * this.W,
            playerY - 0.2 * this.H,
          );

          this._parts.set('left_eyesocket', leftEyesocket);
          this._parts.set('right_eyesocket', rightEyesocket);
          return;

        case 'Eyebrows':
          const leftEyebrow = new PlayerAppearanceObject(skin);
          leftEyebrow.transform.setPosition(
            playerX - 0.25 * this.W,
            playerY - 0.35 * this.H,
          );

          const rightEyebrow = new PlayerAppearanceObject(skin);
          rightEyebrow.flip.x = true;
          rightEyebrow.transform.setPosition(
            playerX + 0.25 * this.W,
            playerY - 0.35 * this.H,
          );

          this._parts.set('left_eyebrow', leftEyebrow);
          this._parts.set('right_eyebrow', rightEyebrow);
          return;

        case 'Eyes':
          const leftEye = new PlayerAppearanceObject(skin);
          leftEye.transform.setPosition(
            playerX - 0.2 * this.W,
            playerY - 0.2 * this.H,
          );

          const rightEye = new PlayerAppearanceObject(skin);
          rightEye.flip.x = true;
          rightEye.transform.setPosition(
            playerX + 0.2 * this.W,
            playerY - 0.2 * this.H,
          );

          this._parts.set('left_eye', leftEye);
          this._parts.set('right_eye', rightEye);
          return;
      }
    });

    const selectedWeapon = this._weaponsSwitcher.selectedWeapon;
    const weaponObject = new PlayerWeaponObject(selectedWeapon);
    weaponObject.transform.setPosition(
      this.transform.x,
      this.transform.y + this.H * 0.2,
    );

    this._parts.set('weapon_object', weaponObject);

    this._parts.forEach((part) => {
      this._game.gameObjectsStore.add(part);
      this.transform.addChild(part);
      if (part instanceof ImageObject) part.parseSize();
    });
  }

  private initializeClips(): void {
    this._user.clips.forEach(({ clip: clipData, amount }) => {
      const clip = new Clip(clipData, amount);
      const clipInventoryItem = new ClipInventoryItem(clip);
      this.inventory.takeItem(`clip:${clip.clipId}`, clipInventoryItem);
    });
  }

  private initializeWeapons(): void {
    const weaponsResolver = new WeaponsResolver();
    const weaponsTransformer = new WeaponsTransformer(weaponsResolver);

    this._user.weapons.forEach(({ slot, weapon: weaponData }) => {
      const weapon = weaponsTransformer.toClass(weaponData);
      if (!weapon) return;
      weapon.setOwner(this);

      const weaponInventoryItem = new WeaponInventoryItem(weapon);
      this.inventory.takeItem(`weapon:${slot}`, weaponInventoryItem);
    });
  }

  private updateEyebrowsAngle(): void {
    const angle = 45 - 0.45 * this.hpController.hp;
    const leftEyebrow = this._parts.get('left_eyebrow');
    const rightEyebrow = this._parts.get('right_eyebrow');

    leftEyebrow.transform.setAngle(-angle);
    rightEyebrow.transform.setAngle(angle);
  }

  private updateViewDirection(): void {
    const leftEye = this._parts.get('left_eye');
    const rightEye = this._parts.get('right_eye');

    const leftEyesocket = this._parts.get('left_eyesocket');
    const rightEyesocket = this._parts.get('right_eyesocket');

    if (!leftEye || !rightEye || !leftEyesocket || !rightEyesocket) return;

    const leftEyePosition = leftEyesocket.transform;
    leftEye.transform.setPosition(leftEyePosition.x, leftEyePosition.y);

    const rightEyePosition = rightEyesocket.transform;
    rightEye.transform.setPosition(rightEyePosition.x, rightEyePosition.y);

    const viewVector = new Vector(
      this.mouseController.position.x - this.transform.x,
      this.mouseController.position.y - this.transform.y,
    );
    viewVector.normalize();
    viewVector.multiply(5);

    leftEye.transform.move(viewVector.x, viewVector.y);
    rightEye.transform.move(viewVector.x, viewVector.y);
  }

  private updateSelectedWeapon(): void {
    const positionX = this.transform.x;
    const positionY = this.transform.y + this.H * 0.2;

    const weaponDirectionVector = new Vector(
      this.mouseController.position.x - positionX,
      this.mouseController.position.y - positionY,
    );
    const angle = weaponDirectionVector.angle;
    const weaponObject = this._parts.get('weapon_object') as PlayerWeaponObject;

    weaponObject?.transform.setPosition(positionX, positionY);
    weaponObject?.setWeapon(this._weaponsSwitcher.selectedWeapon);
    weaponObject?.parseSize();
    weaponObject.transform.setAngle(angle);

    this._weaponsSwitcher.selectedWeapon?.imageUpdater?.updateImage(
      weaponObject,
      weaponDirectionVector,
    );

    if (angle >= 90 && angle <= 270) weaponObject.flip.y = true;
    else weaponObject.flip.y = false;
  }

  private updatePartsZ(): void {
    const h = this.H;
    const { y } = this.transform;

    this._parts.forEach((part) => {
      part.z = y + h / 2 + this._partsOffsetZ;
      if (part instanceof ImageObject) part.z -= part.size.h / 4;
    });

    this._parts.get('left_eyesocket').z += 0.001;
    this._parts.get('right_eyesocket').z += 0.001;
    this._parts.get('left_eye').z += 0.002;
    this._parts.get('right_eye').z += 0.002;
    this._parts.get('mouth').z += 0.003;
    this._parts.get('left_eyebrow').z += 0.003;
    this._parts.get('right_eyebrow').z += 0.003;
    this._parts.get('weapon_object').z += 0.004;
    this._parts.get('username_object').z += 0.005;
  }

  private die(): void {
    Composite.remove(this._game.world, this.bulletsCollider);
    Composite.remove(this._game.world, this.interactionCollider);
    this.collider.isSensor = true;

    this.inventory.dropAllItems();

    this._parts.forEach((part) => {
      if (part instanceof ImageObject) part.setTexture('empty');
      if (part instanceof TextObject) part.setText('');
    });
  }
}
