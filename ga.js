///<reference path="p5.global-mode.d.ts" />

    function newGeneration(birds) {
        let elites = birds.slice(round(0.95 * birds.length),birds.length)
        console.log("elites",elites)
        return elites
    }

    function generateFromElites(elites, populationSize) {
        let newPopulation = []
        for (let i = 0; i < populationSize; i++) {
            let randomIndex =  floor(random(0,elites.length))
            let chosenElite = elites[randomIndex]
            let copied = chosenElite.copy()
            
            copied.brain.mutate(0.05)
            newPopulation.push(copied)

        }
        return newPopulation
    }