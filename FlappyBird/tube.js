class Tube {

    constructor(x, tubeWidth) {
        this.tubeWidth = tubeWidth
        this.position = createVector(x, 0)
        this.randomize()
    }
    check() {
        if (this.position.x <= 0 - this.tubeWidth) {
            this.position = createVector(width + this.tubeWidth, 0)
            this.randomize();
        }

    }
    randomize() { 
        this.gapHeight = random(200, 400)
        this.tubeHeight = random(100, height - 350)
    }

    display() {
        imageMode(CORNER)
        image(downTube, this.position.x, this.tubeHeight -3000)
        image(upTube, this.position.x, this.tubeHeight + this.gapHeight)
    

    }

    move() {
        this.velocity = createVector(-8, 0)
        this.position.add(this.velocity)
    }

}