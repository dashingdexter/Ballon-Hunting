

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
      //sky picture

        // load audio
        this.load.audio('sfx_selecteasy', './assets/start.wav');
        this.load.audio('background','./assets/background.mp3');
        this.load.audio('sfx_selecthard', './assets/start1.wav');
        this.load.audio('sfx_explosion', './assets/explosion.wav');
        this.load.audio('sfx_rocket', './assets/shot.wav');
        this.load.audio('sfx_gameover', './assets/gameover.wav');
        this.load.image('sky', './assets/sky1.png');
    }

    create() {
      this.starfield = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0,0);

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#42CBED',
            color: '#F2FCFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Ballon Hunting', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & click to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#42CBED';
        menuConfig.color = '#F2FCFF';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.sound.play('background');
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // Novice mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_selecteasy');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Expert mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_selecthard');
          this.scene.start("playScene");    
        }
    


    }
}