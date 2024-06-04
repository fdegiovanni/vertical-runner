import { gameOptions } from "../utils/gameOptions.js";

export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("game");
  }

  init() {
    this.score = 0;
    this.platformTouched = false;
  }

  create() {
    this.add.image(400, 300, "sky").setScale(2);
    this.platformGroup = this.physics.add.group();
    console.log(this);
    const positionX = this.game.config.width / 2;
    const positionY =
      this.game.config.height * gameOptions.firstPlatformPosition;
    console.log(positionX, positionY);
    const platform = this.platformGroup.create(
      positionX,
      positionY,
      "platform"
    ).setScale(0.3, 1);
    platform.setImmovable(true);

    for (let i = 0; i < 10; i++) {
      let platform = this.platformGroup.create(0, 0, "platform");
      platform.setImmovable(true);
      this.positionPlatform(platform);
    }

    this.player = this.physics.add.sprite(positionX, 0, "player").setScale(0.2);
    this.player.setGravityY(gameOptions.gameGravity);

    this.textTimer = this.add.text(10, 10, "0", {
      fontSize: "32px",
      fill: "#fff",
    });

    this.textScore = this.add.text(this.game.config.width - 10, 10, "0", {
      fontSize: "32px",
      fill: "#fff",
    }).setOrigin(1, 0);

    this.input.on("pointerdown", this.movePlayer, this);
    this.input.on("pointerup", this.stopPlayer, this);
    this.firstMove = true;
  }

  update() {
    this.physics.world.collide(this.platformGroup, this.player, this.handleCollision, null, this);

    // realizar un bucle en todas las plataformas
    this.platformGroup.getChildren().forEach(function (platform) {
      // si una plataforma sale de la parte superior del escenario...
      if (platform.getBounds().bottom < 0) {
        // la reposicionamos
        this.positionPlatform(platform);
      }
    }, this);

    // si el jugador cae o sale de la parte superior del escenario...
    if (this.player.y > this.game.config.height || this.player.y < 0) {
      // se reinicia el juego
      this.scene.start("game");
    }

    // si el jugador se cae de una plataforma...
    if (this.player.body.touching.none) {
      // se detiene la animacion de correr
      this.player.anims.stop();
      this.platformTouched = false;
    }
  }

  randomValue(a) {
    return Phaser.Math.Between(a[0], a[1]);
  }

  getLowestPlatform() {
    let lowestPlatform = 0;
    this.platformGroup.getChildren().forEach(function (platform) {
      lowestPlatform = Math.max(lowestPlatform, platform.y);
    });
    return lowestPlatform;
  }

  positionPlatform(platform) {
    platform.y =
      this.getLowestPlatform() +
      this.randomValue(gameOptions.platformVerticalDistanceRange);
    platform.x =
      this.game.config.width / 2 +
      this.randomValue(gameOptions.platformHorizontalDistanceRange) *
        Phaser.Math.RND.sign();
    platform.displayWidth = this.randomValue(gameOptions.platformLengthRange);
  }

  movePlayer(e) {
    this.player.anims.play("run", false);
    const clickedRight = e.x > this.game.config.width / 2;
    const speedX = gameOptions.heroSpeed * (clickedRight ? 1 : -1);
    this.player.setVelocityX(speedX);

    if (this.firstMove) {
      this.firstMove = false;
      this.addTimer();
      this.platformGroup.setVelocityY(-gameOptions.platformSpeed);
    }
  }

  stopPlayer() {
    this.player.setVelocityX(0);
  }

  handleCollision(player, platform) {
    if (!this.platformTouched) {
      this.platformTouched = true;
      this.score += 1;
      this.textScore.setText(this.score);
    }
  }

  addTimer() {
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.textTimer.setText(parseInt(this.textTimer.text) + 1);
      },
      callbackScope: this,
      loop: true,
    });
  }
}
