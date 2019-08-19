import {Scene} from 'phaser'

class Index extends Scene {

    create() {

        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xff0000, 1);
        this.graphics.fillRect(this.game.config.width / 2, this.game.config.height / 2, 64, 64);


        const image = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'icon').setInteractive();
        image.setScale(0.2);
        image.setAlpha(0.3);

        this.input.setDraggable(image);
        this.input.dragDistanceThreshold = 16;

        this.input.on('dragstart', (pointer, gameObject) => {
            this.pos = [gameObject.x, gameObject.y];
            this.tweens.add({
                targets: image,
                alpha: {value: 1, duration: 300, ease: 'Power1'},
                scale: {value: 0.3, duration: 300, ease: 'Power1'}
            });
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            const z = this.countDistance(pointer.downX, pointer.downY, dragX, dragY);
            if (z > 150) {
                gameObject.setTint(0x44ff44);
                this.tweens.add({
                    targets: image,
                    scale: {value: 0.15, duration: 100, ease: 'Power1'}
                });
            } else {
                gameObject.clearTint();
                this.tweens.add({
                    targets: image,
                    scale: {value: 0.3, duration: 100, ease: 'Power1'}
                });
            }
            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        this.input.on('dragend', (pointer, gameObject) => {
            const z = this.countDistance(pointer.downX, pointer.downY, pointer.upX, pointer.upY);
            if (z > 150) this.pos = [pointer.upX, pointer.upY];
            gameObject.clearTint();
            this.tweens.add({
                targets: image,
                alpha: {value: 0.3, duration: 300, ease: 'Power1'},
                scale: {value: 0.2, duration: 300, ease: 'Power1'},
                x: {value: this.pos[0], duration: 300, ease: 'Bounce.easeOut'},
                y: {value: this.pos[1], duration: 300, ease: 'Bounce.easeOut'},
            });
        });
    }

    preload() {
        this.load.image('icon', '../static/icon.png');
    }

    update = () => {

        // if (this.input.pointer1.isDown) {
        //     this.graphics.clear();
        //     this.graphics.fillStyle(0xff0000, 1);
        //     this.graphics.fillRect(this.input.pointer1.x - 32, this.input.pointer1.y - 32, 64, 64);
        //
        // } else {
        //     this.graphics.clear();
        // }
    };

    countDistance(x1, y1, x2, y2) {
        let x = x1 - x2;
        let y = y1 - y2;
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

}

export default Index