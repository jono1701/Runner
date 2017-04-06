ZenvaRunner.Settings = function () {};
ZenvaRunner.Settings.prototype = {
    create: function () {
        this.sfxVol = this.game.global.sfxVol;
        this.musicVol = this.game.global.musicVol;
        this.vibrateOpt = this.game.global.vibrateOpt;
        var onStyle = {
            font: '25px Arial Black'
            , fill: '#ffffff'
            , strokeThickness: 4
        };
        var offStyle = {
            font: '15px Arial Black'
            , fill: '#ffffff'
            , strokeThickness: 4
        };
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
        this.background.autoScroll(-25, 0);
        this.foreground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'foreground');
        this.foreground.autoScroll(-40, 0);
        this.ground = this.game.add.tileSprite(0, this.game.height - 49, this.game.width, 49, 'ground');
        this.ground.autoScroll(-75, 0);
        this.settingsText = this.game.add.text(0, 0, 'Settings', {
            font: '32px Arial Black'
            , fill: '#ffffff'
            , strokeThickness: 4
        });
        this.settingsText.x = this.game.width / 2 - this.settingsText.width / 2;
        this.settingsText.y = 10;
        
        this.musicLabel = this.game.add.text(0, 140, 'Music', {
            font: '25px Arial Black'
            , fill: '#ffffff'
            , strokeThickness: 4
        });
        this.musicLabel.x = this.game.width / 2 - this.musicLabel.width / 2
        if (this.musicVol) {
            this.onMusic = this.game.add.text(0, 170, 'On', onStyle);
            this.offMusic = this.game.add.text(0, 170, 'Off', offStyle);
        }
        else {
            this.onMusic = this.game.add.text(0, 170, 'On', offStyle);
            this.offMusic = this.game.add.text(0, 170, 'Off', onStyle);
        }
        this.onMusic.x = ((this.game.width / 2) + this.onMusic.width);
        this.onMusic.inputEnabled = true;
        this.onMusic.events.onInputDown.add(this.turnOnMusic, this);
        this.offMusic.x = ((this.game.width / 2) - this.musicLabel.width);
        this.offMusic.inputEnabled = true;
        this.offMusic.events.onInputDown.add(this.turnOffMusic, this);
        this.sfxLabel = this.game.add.text(0, 75, 'SFX', {
            font: '25px Arial Black'
            , fill: '#ffffff'
            , strokeThickness: 4
        });
        this.sfxLabel.x = this.game.width / 2 - this.sfxLabel.width / 2;
        if (this.sfxVol) {
            this.onSfx = this.game.add.text(0, 105, 'On', onStyle);
            this.offSfx = this.game.add.text(0, 105, 'Off', offStyle);
        }
        else {
            this.onSfx = this.game.add.text(0, 105, 'On', offStyle);
            this.offSfx = this.game.add.text(0, 105, 'Off', onStyle);
        }
        this.onSfx.x = ((this.game.width / 2) + this.onSfx.width);
        this.onSfx.inputEnabled = true;
        this.onSfx.events.onInputDown.add(this.turnOnSfx, this);
        this.offSfx.x = ((this.game.width / 2) - this.musicLabel.width);
        this.offSfx.inputEnabled = true;
        this.offSfx.events.onInputDown.add(this.turnOffSfx, this);
        this.vibrateLabel = this.game.add.text(0, 205, 'Vibrate', {
            font: '25px Arial Black'
            , fill: '#ffffff'
            , strokeThickness: 4
        });
        this.vibrateLabel.x = this.game.width / 2 - this.vibrateLabel.width / 2;
        if (this.vibrateOpt) {
            this.onVibrate = this.game.add.text(0, 235, 'On', onStyle);
            this.offVibrate = this.game.add.text(0, 235, 'Off', offStyle);
        }
        else {
            this.onVibrate = this.game.add.text(0, 235, 'On', offStyle);
            this.offVibrate = this.game.add.text(0, 235, 'Off', onStyle);
        }
        this.onVibrate.x = ((this.game.width / 2) + this.onVibrate.width);
        this.onVibrate.inputEnabled = true;
        this.onVibrate.events.onInputDown.add(this.turnOnVibrate, this);
        this.offVibrate.x = ((this.game.width / 2) - this.musicLabel.width);
        this.offVibrate.inputEnabled = true;
        this.offVibrate.events.onInputDown.add(this.turnOffVibrate, this);
        this.saveText = this.game.add.text(0, 0, 'Save', {
            font: '25px Arial Black'
            , fill: '#ffffff'
            , strokeThickness: 4
        });
        this.saveText.x = this.game.width - this.saveText.width - 20;
        this.saveText.y = this.game.height - 40;
        this.saveText.inputEnabled = true;
        this.saveText.events.onInputDown.add(this.saveSettings, this);
        this.cancelText = this.game.add.text(0, 0, 'Cancel', {
            font: '25px Arial Black'
            , fill: '#ffffff'
            , strokeThickness: 4
        });
        this.cancelText.x = 20;
        this.cancelText.y = this.game.height - 40;
        this.cancelText.inputEnabled = true;
        this.cancelText.events.onInputDown.add(this.cancelSettings, this);
        this.creditsText = this.game.add.text(0, 0, 'Credits', {
            font: '18px Arial Black'
            , fill: '#ffffff'
            , strokeThickness: 4
        });
        this.creditsText.x = this.game.width / 2 - this.creditsText.width / 2;
        this.creditsText.y = this.game.height - 60;
        this.creditsText.inputEnabled = true;
        this.creditsText.events.onInputDown.add(this.showCredits, this);
    }
    , update: function () {
        
    }
    , cancelSettings: function () {
        this.game.state.start('MainMenu');
    }
    , saveSettings: function () {
        this.game.global.sfxVol = this.sfxVol;
        this.game.global.musicVol = this.musicVol;
        this.game.global.vibrateOpt = this.vibrateOpt;
        localStorage.setItem('gameSettings', JSON.stringify({
            "sfxVol": this.game.global.sfxVol
            , "musicVol": this.game.global.musicVol
            , "vibrate": this.game.global.vibrateOpt
        }));
        this.game.state.start('MainMenu');
    }
    , turnOnSfx: function () {
        this.sfxVol = 1;
        this.offSfx.fontSize = '15px';
        this.onSfx.fontSize = '25px';
    }
    , turnOffSfx: function () {
        this.sfxVol = 0;
        this.onSfx.fontSize = '15px';
        this.offSfx.fontSize = '25px';
    }
    , turnOnMusic: function () {
        this.musicVol = 1;
        this.offMusic.fontSize = '15px';
        this.onMusic.fontSize = '25px';
    }
    , turnOffMusic: function () {
        this.musicVol = 0;
        this.onMusic.fontSize = '15px';
        this.offMusic.fontSize = '25px';
    }
    , turnOnVibrate: function () {
        this.vibrateOpt = 1;
        this.offVibrate.fontSize = '15px';
        this.onVibrate.fontSize = '25px';
    }
    , turnOffVibrate: function () {
        this.vibrateOpt = 0;
        this.onVibrate.fontSize = '15px';
        this.offVibrate.fontSize = '25px';
    }
    , showCredits: function () {
        this.game.state.start('Credits');
        //return;
    }
};
