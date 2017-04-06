ZenvaRunner.Game = function() {
    this.playerMinAngle = -20;
    this.playerMaxAngle = 20;
    
    this.coinRate = 1000;
    this.coinTimer = 0;
    
    this.enemyRate = 1500;
    this.enemyTimer = 0;
    this.enemyIncreaseTimer = 0;
    
    this.playTimer = 0;
    
    this.score = 0;
    this.previousCoinType = null;
    
    this.coinSpawnX = null;
    this.coinSpacingX = 10;
    this.coinSpacingY = 10;
    
    this.playerAlive = true;
    
    this.playerHit = true;
};

ZenvaRunner.Game.prototype = {
    create: function() {
        this.game.world.bounds = new Phaser.Rectangle(0, 0, this.game.width + 300, this.game.height);
        
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
        this.background.autoScroll(-25,0);
      
        this.foreground = this.game.add.tileSprite(0,0,this.game.width,this.game.height ,'foreground');
        this.foreground.autoScroll(-45,0);
      
        this.ground = this.game.add.tileSprite(0,this.game.height-49, this.game.width,49,'ground');
        this.ground.autoScroll(-75,0);
      
        this.player = this.add.sprite(200,this.game.height/2,'player');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(0.2);
      
        this.player.animations.add('fly',[0,1,2,3,2,1]);
        this.player.animations.play('fly',8,true);
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 400;
        
        this.game.physics.arcade.enableBody(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;
        
        this.game.physics.arcade.enableBody(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize((this.player.width * 0.8) * 5, (this.player.height * 0.8) * 5);
        this.player.body.bounce.set(0.25);
        
        this.coins = this.game.add.group();
        this.enemies = this.game.add.group();

        this.scoreText = this.game.add.text(10,10,'Score: 0',{
            font: '24px Arial Black',
            fill: '#ffffff',
            strokeThickness: 4
        });
        this.enemyTimerText = this.game.add.text(300,10,'Timer: '+this.enemyRate,{        
            font: '24px Arial Black',
            fill: '#ffffff',
            strokeThickness: 4
        });
        this.playTimerText = this.game.add.text(500,10,'Time: '+this.playTimer,{
            font: '24px Arial Black',
            fill: '#ffffff',
            strokeThickness: 4
        });
        
        this.jetSound = this.game.add.audio('rocket');
        this.coinSound = this.game.add.audio('coin');
        this.deathSound = this.game.add.audio('death');
        this.gameMusic = this.game.add.audio('gameMusic');
        if(this.game.global.musicVol) {
            this.gameMusic.play('', 0, true, 1);
        }
        
        this.coinSpawnX = this.game.width + 64;
        
    },
    update: function() {
        if(this.playerAlive) {
            
            //game.debug.body(this.player);
            
            if(this.game.input.activePointer.isDown){
                this.player.body.velocity.y -= 25;
                if(!this.jetSound.isPlaying) {
                    if(this.game.global.sfxVol) {
                        this.jetSound.play('', 0, true, 0.5);
                    }
                }
            } else {
                this.jetSound.stop();
            }

            if(this.player.body.velocity.y < 0 || this.game.input.activePointer.isDown) {
                if(this.player.angle > 0 ) {
                    this.player.angle = 0;
                }
                if(this.player.angle > this.playerMinAngle) {
                    this.player.angle -= 0.5;
                }
            } else if (this.player.body.velocity.y >= 0 && !this.game.input.activePointer.isDown) {
                if(this.player.angle < this.playerMaxAngle) {
                    this.player.angle += 0.5;
                }
            }

            if(this.coinTimer < this.game.time.now) {
                this.generateCoins();
                this.coinTimer = this.game.time.now + this.coinRate;
            }

            if(this.enemyTimer < this.game.time.now) {
                this.createEnemy();
                this.enemyTimer = this.game.time.now + this.enemyRate;
            }
            if(this.enemyIncreaseTimer < this.game.time.now) {
                this.enemyIncreaseTimer = this.game.time.now + 10000;
                
                this.enemyRate -= 10;
                if(this.enemyRate <= 250) {
                    this.enemyRate = 250;
                }
                
                this.enemyTimerText.text = 'Timer: '+this.enemyRate;
            }
            if(this.playTimer < this.game.time.now) {
                this.playTimerText.text = 'Time: ' + this.playTimer / 1000;
                this.playTimer = this.game.time.now + 100;
            }

            this.game.physics.arcade.collide(this.player, this.ground, this.groundHit, null, this);
            this.game.physics.arcade.overlap(this.player, this.coins, this.coinHit, null, this);
            this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);
        }
    },
    shutdown: function() {
        this.coins.destroy;
        this.enemies.destoy;
        this.score = 0;
        this.coinTimer = 0;
        this.enemyTimer = 0;
        this.playTimer = 0;
        this.playerAlive = true;
        this.enemyRate = 1500;
    },
    createCoin: function() {
        var x = this.game.width;
        var y = this.game.rnd.integerInRange(50, this.game.world.height - 192);
        
        var coin = this.coins.getFirstExists(false);
        if(!coin) {
            coin = new Coin(this.game, 0, 0);
            this.coins.add(coin);
        }
        
        coin.reset(x, y);
        coin.revive();
        return coin;
    },
    generateCoins: function() {
        if(!this.previousCoinType || this.previousCoinType < 3) {
            var coinType = this.game.rnd.integer() % 5;
            switch(coinType) {
                case 0:
                    //do nothing
                    break;
                case 1:
                case 2:
                    // if 1 or 2
                    this.createCoin();
                    break;
                case 3:
                    this.createCoinGroup(2, 2);
                    break;
                case 4:
                    this.createCoinGroup(6, 2);
                    break;
                default:
                    this.previousCoinType = 0;
                    break;
            }
            
            this.previousCoinType = coinType;
        } else {
            if(this.previousCoinType === 4) {
                this.previousCoinType = 3;
            } else {
                this.previousCoinType = 0;
            }
        }
    },
    createCoinGroup: function(columns, rows) {
        // create 4 coins in group
        var coinSpawnY = this.game.rnd.integerInRange(50, this.game.world.height - 192);
        var coinRowCounter = 0;
        var coinColumnCounter = 0;
        var coin;
        for(var i = 0; i < columns * rows; i++) {
            coin = this.createCoin(this.spawnX, coinSpawnY);
            coin.x = coin.x + (coinColumnCounter * coin.width) + (coinColumnCounter * this.coinSpacingX);
            coin.y = coinSpawnY + (coinRowCounter * coin.height) + (coinRowCounter * this.coinSpacingY);
            coinColumnCounter++;
            if(i+1 >= columns && (i+1) % columns === 0) {
                coinRowCounter++;
                coinColumnCounter = 0;
            }
        }
    },
    createEnemy: function() {
        var x = this.game.width;
        var y = this.game.rnd.integerInRange(50, this.game.world.height - 50);
        
        var enemy = this.enemies.getFirstExists(false);
        if(!enemy) {
            enemy = new Enemy(this.game, 0, 0);
            this.enemies.add(enemy);
        }
        
        enemy.reset(x, y);
        enemy.revive();
    },
    groundHit: function(player, ground){
        player.body.velocity.y = -200;
    },
    coinHit: function(player, coin) {
        this.score++;
        if(this.game.global.sfxVol) {
            this.coinSound.play('', 0, false, 0.5);
        }
        coin.kill();
        
        var dummyCoin = new Coin(this.game, coin.x, coin.y);
        this.game.add.existing(dummyCoin);
        
        dummyCoin.animations.play('spin', 40, true);
        
        var scoreTween = this.game.add.tween(dummyCoin).to({x: 50, y:50}, 300, Phaser.Easing.Linear.NONE, true);
        
        scoreTween.onComplete.add(function() {
            dummyCoin.destroy();
            this.scoreText.text = 'Score: ' + this.score;
        },this);
        
    },
    enemyHit: function(player,enemy) {
        if(!this.playerHit && this.game.global.vibrateOpt) {
            if(navigator.vibrate) {
                navigator.vibrate(250);
            }
        }
        
        if(this.score > 0 && this.playerHit) {
            enemy.kill();
            
            this.score = 0;
            this.scoreText.text = 'Score: ' + this.score;
            
            this.playerHit = false;
            
            var emitter = this.game.add.emitter(this.player.x, this.player.y, 20);
            emitter.makeParticles('particle-coin');
            emitter.minParticleSpeed.setTo(-200, -200);
            emitter.maxParticleSpeed.setTo(200, 200);
            emitter.gravity = 400;
            emitter.minParticleScale = 0.5;
            emitter.maxParticleScale = 0.5;
            emitter.kill();
            emitter._quantity = 0;
            emitter.start(true, 500, null, 20);
            
            var playerHit = this.game.add.tween(player).to({alpha:0},200, "Linear", true, 0, 3);
            playerHit.yoyo(true,200);
            playerHit.onComplete.add(function() {
                this.player.alpha = 1;
                this.playerHit = true;
            },this);
            
        } else if(!this.playerHit) {
    
        } else {
            this.playerAlive = false;

            player.angle = 90;
            var playerDeath = this.game.add.tween(player).to({y:this.game.height}, 700, Phaser.Easing.Linear.NONE, true);

            playerDeath.onComplete.add(function() {
                player.kill();
                enemy.kill();

                if(this.game.global.sfxVol) {
                    this.deathSound.play('', 0, false, 0.5);
                }
                this.gameMusic.stop();
                this.jetSound.stop();

                this.ground.stopScroll();
                this.background.stopScroll();
                this.foreground.stopScroll();

                this.enemies.setAll('body.velocity.x',0);
                this.coins.setAll('body.velocity.x',0);

                this.enemyTimer = Number.MAX_VALUE;
                this.coinTimer = Number.MAX_VALUE;
                this.playTimer = Number.MAX_VALUE;

                var scoreboard = new Scoreboard(this.game);
                scoreboard.show(this.score);
            },this);
        }
    }
}
