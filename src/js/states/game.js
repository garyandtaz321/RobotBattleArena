var Player = require('../models/player');

var Game = function () {
};

var bullets
var fireRate = 100;
var nextFire = 0;

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
    
    bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'player');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    this.map.setCollisionBetween(2043, 2104);
    this.map.setTileIndexCallback(3605, () => {
      crash.play();
      console.log("Lava! Watch out!");
      if (player.invincible == false) {
          player.health -= 20;
          console.log(player.health);
          player.invincible = true;
      }
      if (player.invincible == true) {
          this.time.events.add(2000, () => {
            player.invincible = false;
            console.log(player.invincible);
            return;
          }, this);
      }
    }, this);

    player = this.add.sprite(32, 32, 'player');
    player.health = 100;
    player.invincible = false;
    this.physics.arcade.enable(player);

    //sound effect
    var crash = this.add.audio('crash');

   player.body.collideWorldBounds = true;
   player.body.onWorldBounds = new Phaser.Signal();
   //player.body.onWorldBounds.add(hitWorldBounds this);

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
     if (this.input.activePointer.isDown) {
        if (this.game.time.now > nextFire && bullets.countDead() > 0) {
                nextFire = this.game.time.now + fireRate;

                var bullet = bullets.getFirstDead();

                bullet.reset(player.x, player.y);

                this.game.physics.arcade.moveToPointer(bullet, 300);

                console.log("boi");
        }
    }
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
   if (player.health == 0) {
       console.log("u ded fam");
   }
},

  onInputDown: function () {
    this.game.state.start('Menu');
  }
};