// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    // load assets
    this.load.image("sky", "../public/assets/skay.webp");
    this.load.image("platform", "../public/assets/platform.png");
    this.load.spritesheet("player", "../public/assets/player.png", {
      frameWidth: 184,
      frameHeight: 325
    });

  }

  create() {
    // crear animaciones 
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    }); 

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player", {
        start: 6,
        end: 11
      }),
      frameRate: 10,
      repeat: 0
    });

    


    this.scene.start("game");
  }

}
