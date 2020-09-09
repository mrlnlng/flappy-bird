///<reference path="p5.global-mode.d.ts"/>
class Bird {
    constructor(birdWidth, birdHeight) {
        this.birdWidth = birdWidth
        this.velocity = createVector(0, 10)
        this.birdHeight = birdHeight
        this.position = createVector(0.1 * width, height / 2 + random(-100,100))
        this.brain = new NeuralNet(3, 4, 1)
        this.score = 0

    }

    display() {
        push()
        translate(this.position.x, this.position.y)
        rotate(this.velocity.y / 18)
        imageMode(CENTER)
        image(flappy, 0, 0, this.birdWidth, this.birdHeight * 0.7)
        // if (this.state === 0){

        //     fill(255,0,0)
        // }else {
        //     fill(0,255,0)
        // }
        // ellipse(0,0,this.birdWidth,this.birdHeight*0.7)
        pop()
    }

    update(tube) {
        this.acceleration = createVector(0, 1)
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
        this.checkAlive(tube)
        this.score++
    }

    think(tube) {
        let inputArray = []
        let distanceX = tube.position.x - this.position.x
        let distanceY = tube.tubeHeight + tube.gapHeight - this.position.y
        let velocityY = this.velocity.y
        inputArray.push(distanceX)
        inputArray.push(distanceY)
        inputArray.push(velocityY)
        let input = Matrix.toMatrix(inputArray)
        let output = this.brain.feedForward(input);
        let numberOutput = output.matrix[0][0]
        if (numberOutput > 0.5) {
            this.jump();
        }
    }

    jump() {
        this.velocity = createVector(0, -13)
    }
    checkAlive(tube) {
        let toleranceFactor = 0.3
        if (this.position.x >= tube.position.x && this.position.x <= tube.position.x + tube.tubeWidth) {
            if (this.position.y - this.birdHeight * toleranceFactor <= tube.tubeHeight || this.position.y + this.birdHeight * toleranceFactor >= tube.tubeHeight + tube.gapHeight) {
                this.state = 0
            }
        }
        else if (this.position.y >= height - 100)
            this.state = 0
    }

    copy(){
        let copyBird = new Bird(80, 80)
        copyBird.brain = this.brain.copy()
        return copyBird
    }
}




