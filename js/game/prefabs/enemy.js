var Enemy = function(game, x, y, key, frame) {
    key = 'missile';
    Phaser.Sprite.call(this, game, x, y, key, frame);
    
    this.scale.setTo(0.2);
    this.anchor.setTo(0.5);
    
    //this.animations.add('fly');
    this.animations.add('flap',[0,1,2,4,2,1]);
    this.animations.play('flap',6,true);
    
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    
    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;
    
    this.events.onRevived.add(this.onRevived,this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onRevived = function() {
    this.game.add.tween(this).to({y: this.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    this.body.velocity.x = -400;
    //this.animations.play('spin', 10, true);
    this.animations.play('flap', 5, true);
};
