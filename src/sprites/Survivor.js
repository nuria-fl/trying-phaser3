export default class Survivor extends Phaser.GameObjects.Sprite {
    constructor(config) {
        
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        
        this.target = null
        this.body.setSize(80, 100);
        this.body.setOffset(40,0)
        this.body.setCollideWorldBounds(true)
        this.body.stopVelocityOnCollide = true;
        this.alive = true;
        this.acceleration = 600;
        this.type = 'survivor';
        

    }

    setDestination(target) {
        
        this.target = target
    }

    stop() {
        this.body.velocity.x = 0
        this.target = null
    }
    update(keys, time, delta) {
        // Prevent updates under certain conditions
        // if (condition) {
        //     return;
        // }
        
        
        if (this.target) {
            this.anims.play('left')
            const movingLeft = this.body.velocity.x < 0
            const movingRight = this.body.velocity.x > 0
            console.log(movingLeft, movingRight)
            if (movingRight && this.body.x >= this.target ||
                movingLeft && this.body.x <= this.target ) {
                this.stop()
            }
        }
       

        let input = {
            left: keys.left.isDown,
            right: keys.right.isDown
        }


        if (input.left) {
            this.run(-this.acceleration);
            this.flipX = true;
        } else if (input.right) {
            this.run(this.acceleration);
            this.flipX = false;
        } else {
            this.run(0);
        }
    }

    run(vel) {
        
        // this.body.velocity.x = vel
    }

    // move(to) {
        
    //     this.body.velocity.x = vel
    // }

    die() {
        this.body.setAcceleration(0);
        this.body.setVelocity(0, -300);
        this.alive = false;
    }
}
