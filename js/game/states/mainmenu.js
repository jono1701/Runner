ZenvaRunner.MainMenu = function() {};

ZenvaRunner.MainMenu.prototype = {
  create: function() {
      this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
      this.background.autoScroll(-25,0);
      
      this.foreground = this.game.add.tileSprite(0,0,this.game.width,this.game.height ,'foreground');
      this.foreground.autoScroll(-40,0);
      
      this.ground = this.game.add.tileSprite(0,this.game.height-49, this.game.width,49,'ground');
      this.ground.autoScroll(-75,0);
      
      this.player = this.add.sprite(200,this.game.height/2,'player');
      this.player.anchor.setTo(0.5);
      this.player.scale.setTo(0.2);
      
      this.player.animations.add('fly',[0,1,2,3,2,1]);
      this.player.animations.play('fly',8,true);
      
      this.game.add.tween(this.player).to({y:this.player.y-16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);
      
      this.splash = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo');
      this.splash.anchor.setTo(0.5);
      
      this.versionText = this.game.add.text(0, 0, 'v1.0', {
          font: '10px Arial Black',
          fill: '#ffffff',
          strokeThickness: 4
      });
      this.versionText.y = this.game.height - 20;
      
      this.startText = this.game.add.text(0, 0, 'Start', {
        font: '32px Arial Black', 
        fill: '#ffffff', 
        strokeThickness: 4
      });
      this.startText.x = this.game.width / 2 - this.startText.width / 2;
      this.startText.y = this.game.height / 2 + this.splash.height / 2;
      
      this.startText.inputEnabled = true;
      this.startText.events.onInputDown.add(this.startGame, this);
      
      this.settingsText = this.game.add.text(0, 0, 'Settings', {
          font: '25px Arial Black',
          fill: '#ffffff',
          strokeThickness: 4
      });
      this.settingsText.x = this.game.width / 2 - this.settingsText.width / 2;
      this.settingsText.y = this.game.height - 60;
      
      this.settingsText.inputEnabled = true;
      this.settingsText.events.onInputDown.add(this.settingsPage, this);
        
  },
  update: function() {

  },
  startGame: function() {
      this.game.state.start('Game');
  },
  settingsPage: function() {
      this.game.state.start('Settings');
  }
};