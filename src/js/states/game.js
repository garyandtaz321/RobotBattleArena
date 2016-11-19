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
    this.map.addTilesetImage('swankymemes2', 'swankymemes2');

    this.layer = this.map.createLayer('Tile Layer 1');
    
    this.map.setCollisionBetween(2043, 2104);
    this.map.setTileIndexCallback(3605, () => {
<<<<<<< HEAD
    //    crash.play();
      console.log("Lava! Watch out!");
      return;
=======
      console.log(player.health);
      console.log(player.invincible);
      player.invincible = true;
      if (player.invincible == false) {
          player.health -= 20;
      }
      if (player.invincible == true) {
          this.time.events.add(2000, () => {
            player.invincible = false;
          }, this);
      }
>>>>>>> ef5fdd1f87a0245c2693a087ff8b46cfbdd6f924
    }, this);

    player = this.add.sprite(32, 32, 'player');
    player.health = 100;
    player.invincible = false;
    this.physics.arcade.enable(player);

    //sound effect
   var crash = this.add.audio('crash');

   player.body.collideWorldBounds = true;
   player.body.onWorldBounds = new Phaser.Signal();
 //  player.body.onWorldBounds.add(hitWorldBounds this);

    this.game.camera.follow(player);
  },
 hitWorldBounds: function (audio) {
      crash.play();
  },
  update: function () {
    this.physics.arcade.collide(player, this.layer);

    var wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    var sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    var aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    var dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

    if (aKey.isDown) {
          player.body.velocity.x = -200;
      }
      else if (dKey.isDown) {
          player.body.velocity.x = 200;
      }
      else {
          player.body.velocity.x = 0;
      }
      if (wKey.isDown){
          player.body.velocity.y = -200;
      }
      else if (sKey.isDown){
          player.body.velocity.y = 200;
      }
      else {
          player.body.velocity.y = 0;
      }
  },

  onInputDown: function () {
    this.game.state.start('Menu');
  }
};