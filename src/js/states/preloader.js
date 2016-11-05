var Preloader = function (game) {
  this.asset = null;
  this.ready = false;
};

module.exports = Preloader;

Preloader.prototype = {

  preload: function () {
    this.asset = this.add.sprite(320, 240, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.tilemap('arena1', 'assets/tilemap/arena1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('CaveStory-MimigaVillage', 'assets/tilemap/CaveStory-MimigaVillage.png');
    this.load.image('lava', 'assets/tilemap/lava.png');
    this.load.image('swankymemes', 'assets/tilemap/swankymemes.png');
    this.load.image('swankymemes2', 'assets/tilemap/swankymemes2.png');
    this.load.image('player', 'assets/car.png');
  },

  create: function () {
    this.asset.cropEnabled = false;
  },

  update: function () {
    if (!!this.ready) {
      this.game.state.start('Game');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};
