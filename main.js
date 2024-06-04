import Game from "./scenes/Game.js";
import Preload from "./scenes/Preload.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 750,
  height: 1334,
  backgroundColor: 0x444444,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Preload, Game],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
