var Player = require('../models/player');

var Game = function () {
};

module.exports = Game;

Game.prototype = {

  create: function () {
    this.game.world.setBounds(0, 0, 1600, 1600);
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = this.add.tilemap('arena1');
    this.map.addTilesetImage('CaveStory-MimigaVillage', 'CaveStory-MimigaVillage');
    this.map.addTilesetImage('lava', 'lava');
    this.map.addTilesetImage('swankymemes', 'swankymemes');

    this.layer = this.map.createLayer('Tile Layer 1');
    
    this.map.setCollisionBetween(2043, 2104);
    this.map.setTileIndexCallback(3605, () => {
      console.log("Lava! Watch out!");
      return;
    }, this);

    player = this.add.sprite(32, 32, 'player');
    this.physics.arcade.enable(player);

    this.game.camera.follow(player);

    this.cursors = this.input.keyboard.createCursorKeys();

  },

  update: function () {
    this.physics.arcade.collide(player, this.layer);

    if (this.cursors.left.isDown) {
          player.body.velocity.x = -100;
      }
      else if (this.cursors.right.isDown) {
          player.body.velocity.x = 100;
      }
      else {
          player.body.velocity.x = 0;
      }
      if (this.cursors.up.isDown){
          player.body.velocity.y = -100;
      }
      else if (this.cursors.down.isDown){
          player.body.velocity.y = 100;
      }
      else {
          player.body.velocity.y = 0;
      }
  },

  onInputDown: function () {
    this.game.state.start('Menu');
  }
};
