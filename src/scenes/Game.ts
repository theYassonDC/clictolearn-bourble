import { Scene } from 'phaser';
const messages = [
    "Este es el uso basico del mouse para que sepas como usarlo",
    "Recuerda ser mas agil al presionar el boton",
    "¡Entre mas puntos tengas mas dificil se pone!",
    "¡Lo estas haciendo muy bien!",
    "¡Viste que no es tan dificil!"
]

const miniMessages = [
    "Genial!",
    "Fantastico",
    "Excelente",
    "Genio!!",
    "Epa!!"
]
export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text: Phaser.GameObjects.Text;
    color: number = 65509
    points: number = 0;
    score: Phaser.GameObjects.Text;
    re: Phaser.GameObjects.Text

    constructor() {
        super('Game');
    }

    createCircules() {
        let randomX = Phaser.Math.Between(50, 700);
        let randomY = Phaser.Math.Between(50, 384);
        let size = Phaser.Math.Between(40, 70);
        let circle = this.add.circle(randomX, randomY, size, this.color)
            .setOrigin(0).setInteractive()
        let boom = circle.postFX.addBloom(7536445, 1, 1, 1, 1.2)
        const fxTween = this.tweens.add({
            targets: boom,
            blurStrength: 2,
            yoyo: true,
            duration: 200,
            pause: true,
            onComplete: () => {
                fxTween.restart()
                fxTween.pause()
            }
        })
        let defineTime = this.points > 15 ? 1000 : 4300
        this.time.delayedCall(defineTime, () => circle.destroy())
        circle.on('pointerdown', (pointer: any) => {
            const msgRandom = Math.floor(Math.random() * messages.length)
            const msg = Math.floor(Math.random() * miniMessages.length)
            this.re.setVisible(true)
            this.re.setPosition(pointer.x - 100, pointer.y + 25)
            this.re.setText(`+1 ${miniMessages[msg]}`)
            this.time.delayedCall(350, () => this.re.setVisible(false))
            
            this.points += 1
            this.score.setText('Puntos: ' + this.points)
            this.msg_text.setText(messages[msgRandom])
            circle.destroy()
        })
    }


    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(3618615);

        // this.background = this.add.image(512, 384, 'background');
        // this.background.setAlpha(0.5);

        this.msg_text = this.add.text(512, 730, '¡Atrapa a las burbujas verdes antes que desaparezcan!', {
            fontFamily: 'Arial',
            align: 'center',
            fontSize: '1.8rem',
            fontStyle: 'bold',
            color: '#3d91ff',
            padding: {
                left: 15,
                right: 15,
                top: 15,
                bottom: 15,
            },
        })

        this.re = this.add.text(0, 0, '+1', {
            color: "#fdeb01"
        })
        let light = this.re.postFX.addBloom(16640769, 1, 1, 1, 1.2)
        const fxTween = this.tweens.add({
            targets: light,
            blurStrength: 2,
            yoyo: true,
            duration: 200,
            pause: true,
            onComplete: () => {
                fxTween.restart()
                fxTween.pause()
            }
        })
        this.re.setVisible(false)

        this.score = this.add.text(0, 0, `Puntos: ${this.points}`, {
            fontFamily: 'Arial',
            align: 'left',
            fontSize: '1.8rem',
            fontStyle: 'bold',
            backgroundColor: '#00ff01',
            padding: {
                left: 15,
                right: 15,
                top: 15,
                bottom: 15,
            },
        }).setOrigin(0)
        this.time.addEvent({
            delay: 4500,
            callback: this.createCircules,
            callbackScope: this,
            repeat: -1
        })
        this.msg_text.setOrigin(0.5)

    }

}
