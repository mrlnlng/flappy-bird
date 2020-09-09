///<reference path="p5.global-mode.d.ts"/>
class Land {
    constructor() {
        this.position = createVector(0, height - 58)
        this.newPosition = createVector(width, height - 58)
    }
    display() {
        imageMode(CORNER)
        image(land, this.position.x, height - 58, window.innerWidth + 40, 58)
        image(land, this.newPosition.x, height - 58, window.innerWidth, 58)
        if (this.newPosition.x + width <= 0) {
            this.newPosition = createVector(width, height - 58)
        }
        if(this.position.x + width <= 0) {
            this.position = createVector(width, height - 58)
        }

    }
    move() {
        this.velocity = createVector(-8, 0)
        this.position.add(this.velocity)
        this.newPosition.add(this.velocity)
    }
}
