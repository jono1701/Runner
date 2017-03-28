ZenvaRunner.Settings = function() {};

ZenvaRunner.Settings.prototype = {
  create: function() {
      var sfxVol = this.game.global.sfxVol;
      var musicVol = this.game.global.musicVol;
      
      this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
      this.background.autoScroll(-25,0);
      
      this.foreground = this.game.add.tileSprite(0,0,this.game.width,this.game.height ,'foreground');
      this.foreground.autoScroll(-40,0);
      
      this.ground = this.game.add.tileSprite(0,this.game.height-49, this.game.width,49,'ground');
      this.ground.autoScroll(-75,0);
      
      this.settingsText = this.game.add.text(0, 0, 'Settings', {
          font: '32px Arial Black',
          fill: '#ffffff',
          strokeThickness: 4
      });
      this.settingsText.x = this.game.width / 2 - this.settingsText.width / 2;
      this.settingsText.y = 10;
      
      this.sfxLabel = this.game.add.text(0, 75, 'SFX', {
          font: '25px Arial Black',
          fill: '#ffffff',
          strokeThickness :4
      });
      this.sfxLabel.x = this.game.width / 2 - this.sfxLabel.width / 2;
      
      this.sfxValue = this.game.add.text(0, 105, sfxVol,{
          font: '25px Arial Black',
          fill: '#ffffff',
          strokeThickness :4
      });
      this.sfxValue.x = this.game.width / 2 - this.sfxValue.width / 2;
      
      this.incSfx = this.game.add.text(0, 105, '+',{
          font: '25px Arial Black',
          fill: '#ffffff',
          strokeThickness :4
      });
      this.incSfx.x = ((this.game.width / 2) + (this.sfxValue.width / 2) + 40 - this.incSfx.width);
      this.incSfx.inputEnabled = true;
      this.incSfx.events.onInputDown.add(this.increaseSfx, this);
      this.decSfx = this.game.add.text(0, 105, '-',{
          font: '25px Arial Black',
          fill: '#ffffff',
          strokeThickness :4
      });
      this.decSfx.x = ((this.game.width / 2) - (this.sfxValue.width / 2) - 40);
      this.decSfx.inputEnabled = true;
      this.decSfx.events.onInputDown.add(this.decreaseSfx, this);

      
      this.musicLabel = this.game.add.text(0, 140, 'Music',{
          font: '25px Arial Black',
          fill: '#ffffff',
          strokeThickness :4
      });
      this.musicLabel.x = this.game.width / 2 - this.musicLabel.width / 2
      
      this.musicValue = this.game.add.text(0, 170, musicVol,{
          font: '25px Arial Black',
          fill: '#ffffff',
          strokeThickness :4
      });
      this.musicValue.x = this.game.width / 2 - this.musicValue.width / 2;
      
      this.incMusic = this.game.add.text(0, 170, '+',{
          font: '25px Arial Black',
          fill: '#ffffff',
          strokeThickness :4
      });
      this.incMusic.x = ((this.game.width / 2) + (this.musicValue.width / 2) + 40 - this.incMusic.width);
      this.incMusic.inputEnabled = true;
      this.incMusic.events.onInputDown.add(this.increaseMusic,this);
      this.decMusic = this.game.add.text(0, 170, '-',{
          font: '25px Arial Black',
          fill: '#ffffff',
          strokeThickness :4
      });
      this.decMusic.x = ((this.game.width / 2) - (this.musicValue.width / 2) - 40);
      this.decMusic.inputEnabled = true;
      this.decMusic.events.onInputDown.add(this.decreaseMusic, this);
      
      this.saveText = this.game.add.text(0,0,'Save',{
          font: '25px Arial Black',
          fill: '#ffffff',
          strokeThickness :4
      });
      this.saveText.x = this.game.width - this.saveText.width - 20;
      this.saveText.y = this.game.height - 40;
      this.saveText.inputEnabled = true;
      this.saveText.events.onInputDown.add(this.saveSettings, this);
      
      this.cancelText = this.game.add.text(0,0,'Cancel',{
          font: '25px Arial Black',
          fill: '#ffffff',
          strokeThickness :4
      });
      this.cancelText.x = 20;
      this.cancelText.y = this.game.height - 40;
      this.cancelText.inputEnabled = true;
      this.cancelText.events.onInputDown.add(this.cancelSettings, this);
      
      this.creditsText = this.game.add.text(0,0,'Credits',{
          font: '18px Arial Black',
          fill: '#ffffff',
          strokeThickness :4
      });
      this.creditsText.x = this.game.width / 2 - this.creditsText.width / 2;
      this.creditsText.y = this.game.height - 80;
      this.creditsText.inputEnabled = true;
      this.creditsText.events.onInputDown.add(this.showCredits,this);

  },
  update: function() {

  },
  cancelSettings: function() {
      this.state.start('MainMenu');
  },
  saveSettings: function() {
      this.game.global.sfxVol = this.sfxValue.text;
      this.game.global.musicVol = this.musicValue.text;
      localStorage.setItem('gameSettings', JSON.stringify({"sfxVol": this.game.global.sfxVol, "musicVol": this.game.global.musicVol}));
      this.state.start('MainMenu');
  },
  increaseSfx: function() {
      this.sfxValue.text++;
      if(this.sfxValue.text == '10') {
          this.incSfx.visible = false;
          this.decSfx.visible = true;
      } else {
          this.incSfx.visible = true;
          this.decSfx.visible = true;
      }
  },
  decreaseSfx: function() {
      this.sfxValue.text--;
      if(this.sfxValue.text == '0') {
          this.decSfx.visible = false;
          this.incSfx.visible = true;
      } else {
          this.incSfx.visible = true;
          this.decSfx.visible = true;
      }
  },
  increaseMusic: function() {
      this.musicValue.text++;
      if(this.musicValue.text == '10') {
          this.incMusic.visible = false;
          this.decMusic.visible = true;
      } else {
          this.incMusic.visible = true;
          this.decMusic.visible = true;
      }
  },
  decreaseMusic: function() {
      this.musicValue.text--;
      if(this.musicValue.text == '0') {
          this.decMusic.visible = false;
          this.incMusic.visible = true;
      } else {
          this.incMusic.visible = true;
          this.decMusic.visible = true;
      }
  },
  showCredits: function() {
      //this.state.start('Credits');
      return;
  }
};
