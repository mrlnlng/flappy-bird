///<reference path="p5.global-mode.d.ts"/>
class Game {
    constructor(populationSize) {
        this.populationSize = populationSize
        this.newBirds = []
        this.generationBirds = []
        this.birdsScore = []
        for (let i = 0; i < this.populationSize; i++) {
            this.newBirds[i] = new Bird(80, 80);
            this.newBirds[i].state = 1
        }
        this.tubes = []
        this.newLand = new Land();
        for (let i = 0; i < 4; i++) {
            this.initialx = width
            this.tubes[i] = new Tube(this.initialx + 400 * i, 100)

        }
        this.score = 0

    }
    getClosestPipe() {
        let pipeFound = false
        for (let j = 0; j < this.newBirds.length; j++) {
            for (let i = 0; i < this.tubes.length; i++) {
                let differencePipe = this.tubes[i].position.x + this.tubes[i].tubeWidth - this.newBirds[j].position.x
                if (differencePipe < 400 && differencePipe > 0) {
                    this.tube = this.tubes[i]
                    pipeFound = true
                    break
                }
            }
        }
        if (!pipeFound) {
            this.tube = this.tubes[0]
        }
    }
    display() {
        for (let i = 0; i < this.newBirds.length; i++) {
            this.newBirds[i].display();

            // this.initialx = width
        }
        for (let i = 0; i < this.tubes.length; i++) {
            this.tubes[i].display();
        }
        this.newLand.display();


        // //Rectangle and border
        // stroke(240, 234, 161)
        // strokeWeight(5)
        // fill(222, 216, 149)
        // rect(20, 20, 250, 50)
        // //Score
        // textAlign(CENTER)
        // textFont(myFont)
        // fill(252, 120, 88)
        // textSize(35)
        // text("Score:", 30, 26, 150, 50)
        // //Number Score
        // fill(255)
        // stroke(0)
        // text(Math.floor(this.score / 100), 170, 26, 50, 50)
        fill(0)
        textSize(10)
        text(this.newBirds.length, 10, 10)
    }

    nextGen() {
        let elites = newGeneration(this.generationBirds)
        console.warn(elites)
        this.newBirds = generateFromElites(elites, this.populationSize)
        console.warn(this.newBirds)
        for (let i = 0; i < this.populationSize; i++) {
            this.newBirds[i].state = 1
        }
        this.tubes = []
        this.newLand = new Land();
        for (let i = 0; i < 4; i++) {
            this.initialx = width
            this.tubes[i] = new Tube(this.initialx + 400 * i, 100)
        }
    }

    update() {

        for (let i = 0; i < this.newBirds.length; i++) {
            if (this.newBirds[i].state === 1) {
                this.getClosestPipe();
                this.newBirds[i].think(this.tube);
                this.newBirds[i].update(this.tube);
            }
            else {
                function difference(a, b) {
                    if (b - a >= 0) {
                        return true
                    }
                    else {
                        return false
                    }
                }
                this.generationBirds.push(this.newBirds[i])
                this.birdsScore.push(this.newBirds[i].score)
                if (this.birdsScore.length > 1) {
                    this.birdsScore.sort(difference)
                }
                //sort
                // console.warn(this.birdsScore)
                this.newBirds.splice(i, 1)
                i--

            }

        }
        for (let i = 0; i < this.tubes.length; i++) {
            this.tubes[i].move();
            this.tubes[i].check();
        }
        this.newLand.move();
        if (this.newBirds.length === 0) {
            this.nextGen()


        }
    }

}