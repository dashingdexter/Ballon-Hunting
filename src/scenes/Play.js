class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        
    } 
   

    preload(){
           //load image(redesign game artwork)
           this.load.image('rocket', './assets/shot1.png');
        this.load.image('slingshot', './assets/slingshot1.png');
        this.load.image('spaceship','./assets/ballon.png');
        this.load.image('ballon','./assets/ballon1.png');
        this.load.image('sky', './assets/sky1.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create()        {
        
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0,0);
        // blue UI background(Change UI )
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xFFFFFF).setOrigin(0,0);
        
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x00FFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x00FFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x00FFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x00FFFF).setOrigin(0, 0);
        //rocket add
        // add Rocket (p1)
        this.Slingshot = new Slingshot(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'slingshot').setOrigin(0.5, 0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        //add spaceship
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 40).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 20).setOrigin(0,0);
        this.ballon = new Goldballon(this, game.config.width,borderUISize*3+borderPadding*5, 'ballon',0,10).setOrigin(0,0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#42CBED',
            color: '#F2FCFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.add.text(game.config.width/2, borderUISize + borderPadding*2, ' FIRE ',scoreConfig);
        this.gameOver = false;


       // 60-second play clock
       scoreConfig.fixedWidth = 0;
       this.clock = this.time.delayedCall(game.settings.gameTimer, () => 
 
       {
           this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
           this.add.text(game.config.width/2, game.config.height/2 + 64, 'Click leftbutton to Restart ', scoreConfig).setOrigin(0.5);
          
           this.gameOver = true;
           this.sound.play('sfx_gameover');
       }, null, this);
   }

    
    update() {
        if(this.gameOver && game.input.activePointer.isDown) {
            this.scene.restart();
        }

        this.starfield.tilePositionX -= 4.5;

        if(!this.gameOver) {
            this.p1Rocket.update();             
             this.ship01.update();               
            this.ship02.update();
            this.ship03.update();
            this.ballon.update();
        }
        if(this.checkCollision(this.p1Rocket, this.ballon)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ballon);
        }
        
          if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    
    }


    checkCollision(rocket, ship) {
    
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
       
    }
 shipExplode(ship) 
 
     {
        
            ship.alpha = 0;                         
            let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode');             
            boom.on('animationcomplete', () => {    
                ship.reset();                        
                ship.alpha = 1;                       
                boom.destroy();                      
            });
            //score
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
            this.sound.play('sfx_explosion');
        
        }
        
}
