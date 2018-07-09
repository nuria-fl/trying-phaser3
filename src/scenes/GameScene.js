import Survivor from '../sprites/Survivor';

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.spritesheet('survivor', 'assets/images/Group.png', {
            frameWidth: 80,
            frameHeight: 100
        });
    }

    create() {
        
        this.survivor = new Survivor({
            scene: this,
            key: 'survivor',
            x: 40,
            y: 0
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'survivor', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('survivor', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        console.log(this.survivor);

        this.keys = {
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        };
        
        this.input.on("pointerdown", (pointer) => {
            this.survivor.setDestination(pointer.downX)
            this.physics.moveTo(this.survivor, pointer.downX, pointer.downY, 100)
        })
        
        // this.scene.physics.moveTo(this.survivor, this.scene.input.x);

    }

    update(time, delta) {
        // console.log(this.scene.input);
        this.survivor.update(this.keys, time, delta);
    }
}

export default GameScene;
