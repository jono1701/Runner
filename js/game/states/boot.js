var ZenvaRunner = function(){};

ZenvaRunner.Boot = function(){};

ZenvaRunner.Boot.prototype = {
    preload: function(){
        this.load.image('logo','assets/images/logo.png');
        this.load.image('preloadbar','assets/images/preload-heart.png');
    },
    create: function() {
        this.game.stage.backgroundColor = '#fff';
        
        this.input.maxPointers = 1;
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.forceLandscape = true;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.refresh();
        
        this.state.start('Preloader');
    }
};
