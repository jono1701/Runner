var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.global = {
    sfxVol: 10,
    musicVol: 10
}

game.state.add('Boot', ZenvaRunner.Boot);
game.state.add('Preloader', ZenvaRunner.Preload);
game.state.add('MainMenu', ZenvaRunner.MainMenu);
game.state.add('Settings', ZenvaRunner.Settings);
game.state.add('Game', ZenvaRunner.Game);

game.state.start('Boot');