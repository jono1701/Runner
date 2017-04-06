ZenvaRunner.Preload = function(){
    this.ready = false;
};

ZenvaRunner.Preload.prototype = {
    preload: function() {
        
        this.splash = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo');
        this.splash.anchor.setTo(0.5);
        
        this.preloadBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY + 128,'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('ground','assets/images/background/layer_3b.png');
        this.load.image('background','assets/images/background/layer_1.png');
        this.load.image('foreground','assets/images/background/layer_2.png');
        
        this.load.image('particle-coin','assets/images/particle-coin.png');
        
        this.load.spritesheet('coins','assets/images/coins-ps.png', 51, 51, 7);
        this.load.spritesheet('player','assets/images/jetpack-ps.png', 229, 296, 4);
        this.load.spritesheet('missile','assets/images/enemy/enemy.png', 364, 233, 5);
        
        this.load.audio('gameMusic',['assets/audio/Pamgaea.mp3','assets/audio/Pamgaea.ogg']);
        this.load.audio('rocket','assets/audio/rocket.wav');
        this.load.audio('bounce','assets/audio/bounce.wav');
        this.load.audio('coin','assets/audio/coin.wav');
        this.load.audio('death','assets/audio/death.wav');
             
        this.load.onLoadComplete.add(this.onLoadComplete,this);
        
        var gameSettings = JSON.parse(localStorage.getItem('gameSettings')) || {"sfxVol": 1, "musicVol": 1, "vibrate":1};
        this.game.global.sfxVol = (gameSettings.sfxVol == null || gameSettings.sfxVol === undefined || gameSettings.sfxVol.length <= 0) ? 1 : gameSettings.sfxVol;
        this.game.global.musicVol = (gameSettings.musicVol == null || gameSettings.musicVol === undefined || gameSettings.musicVol.length <= 0) ? 1 : gameSettings.musicVol;
        this.game.global.vibrateOpt = (gameSettings.vibrate == null || gameSettings.vibrate === undefined || gameSettings.vibrate.length <= 0) ? 1 : gameSettings.vibrate;
    },
    create: function(){
        
        this.preloadBar.cropEnabled = false;
        
    },
    update: function(){
        
        if(this.cache.isSoundDecoded('gameMusic') && this.ready === true) {
            this.state.start('MainMenu');
        }
    },
    onLoadComplete: function(){
        this.ready = true;
    }
};
