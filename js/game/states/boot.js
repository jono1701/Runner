var ZenvaRunner = function(){};

ZenvaRunner.Boot = function(){};

ZenvaRunner.Boot.prototype = {
    preload: function(){
        this.load.image('logo','assets/images/logo.png');
        this.load.image('preloadbar','assets/images/preloader-bar.png');
    },
    create: function() {
        this.game.stage.backgroundColor = '#fff';
        
        this.input.maxPointers = 1;
        
        if (this.game.device.desktop) {
            this.scale.pageAlignHorizontally = true;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 500;
            this.scale.minHeight = 300;
            this.scale.maxWidth = 2048;
            this.scale.maxHeight = 1536;
            this.scale.forceLandscape = true;
            this.scale.pageAlignVertically = true;
            //this.scale.pageAlignHorizontally = true;
            this.scale.refresh();
        }
        
        this.state.start('Preloader');
    }
};
