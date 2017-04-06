ZenvaRunner.Credits = function () {};
ZenvaRunner.Credits.prototype = {
    create: function () {
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
        this.background.autoScroll(-25, 0);
        this.foreground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'foreground');
        this.foreground.autoScroll(-40, 0);
        this.ground = this.game.add.tileSprite(0, this.game.height - 49, this.game.width, 49, 'ground');
        this.ground.autoScroll(-75, 0);
        
        this.creditsText = this.game.add.text(0, 0, 'Credits', {
            font: '32px Arial Black'
            , fill: '#ffffff'
            , strokeThickness: 4
        });
        this.creditsText.x = this.game.width / 2 - this.creditsText.width / 2;
        this.creditsText.y = 10;
        
        this.cancelText = this.game.add.text(0, 0, 'Back', {
            font: '25px Arial Black'
            , fill: '#ffffff'
            , strokeThickness: 4
        });
        this.cancelText.x = 20;
        this.cancelText.y = this.game.height - 40;
        this.cancelText.inputEnabled = true;
        this.cancelText.events.onInputDown.add(this.cancelSettings, this);
    }
    , update: function() {
        
    }
    , cancelSettings: function () {
        this.game.state.start('Settings');
    }
};
