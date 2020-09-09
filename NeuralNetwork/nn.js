///<reference path="p5.global-mode.d.ts" />
function dsigmoid(a) {
    return a * (1 - a)
}

class NeuralNet {
    constructor(a, b, c) {
        if (a instanceof NeuralNet) {
            this.inputNodes = a.inputNodes
            this.hiddenNodes = a.hiddenNodes
            this.outputNodes = a.outputNodes
            this.weightsHidden = a.weightsHidden.copy();
            this.weightsOutput = a.weightsOutput.copy();
            this.biasHidden = a.biasHidden.copy();
            this.biasOutput = a.biasOutput.copy();


        }
        else {
            this.inputNodes = a
            this.hiddenNodes = b
            this.outputNodes = c
            this.weightsHidden = new Matrix(b, a, true)
            this.weightsOutput = new Matrix(c, b, true)
            this.biasHidden = new Matrix(b, 1, true)
            this.biasOutput = new Matrix(c, 1, true)
        }

    }
    copy() {
       return new NeuralNet(this)
    }
    mutate(rate) {
        function mutate(el) {
            if (Math.random() < rate) {
                return Math.random()
            }
            else {
                return el
            }
        }
        this.weightsHidden.map(mutate)
        this.weightsOutput.map(mutate)
        this.biasHidden.map(mutate)
        this.biasOutput.map(mutate) 
    }


    feedForward(inputMatrix) {
        this.inputMatrix = inputMatrix
        let weightedSumHidden = Matrix.dotProduct(this.weightsHidden, inputMatrix)
        let z1 = Matrix.addMatrix(this.biasHidden, weightedSumHidden)
        this.aHidden = Matrix.map(z1, sigmoid)
        let weightedSumOutput = Matrix.dotProduct(this.weightsOutput, this.aHidden)
        let z2 = Matrix.addMatrix(this.biasOutput, weightedSumOutput)
        this.aOutput = Matrix.map(z2, sigmoid)
        return this.aOutput
    }

    calculateLoss(outputMatrix) {
        this.difference = Matrix.substract(this.aOutput, outputMatrix)
        let loss = Matrix.hadamard(this.difference, this.difference)
        this.totalLoss = 0.5 * Matrix.sumMatrix(loss)
        return this.totalLoss
    }
    updateLayer(error, aPrevious, aCurrent, learningRate, weights) {
        let dsigmoidMatrix = Matrix.map(aCurrent, dsigmoid)
        let hadamardError = Matrix.hadamard(error, dsigmoidMatrix)
        let dBias = Matrix.scale(learningRate, hadamardError)
        let transposedAPrevious = Matrix.transpose(aPrevious)
        let dWeightsUnscaled = Matrix.dotProduct(hadamardError, transposedAPrevious)
        let dWeights = Matrix.scale(learningRate, dWeightsUnscaled)

        let transposedWeights = Matrix.transpose(weights)
        let previousError = Matrix.dotProduct(transposedWeights, hadamardError)
        return [dWeights, dBias, previousError]
    }
    backpropogate(learningRate) {
        //Finding dC/da2 (error vector)
        let error = Matrix.scale(1, this.difference)
        let [dWeightsO, dBiasO, hiddenError] = this.updateLayer(error, this.aHidden, this.aOutput, learningRate, this.weightsOutput)
        let [dWeightsH, dBiasH, inputError] = this.updateLayer(hiddenError, this.inputMatrix, this.aHidden, learningRate, this.weightsHidden)
        this.biasOutput.substract(dBiasO)
        this.weightsOutput.substract(dWeightsO)
        this.biasHidden.substract(dBiasH)
        this.weightsHidden.substract(dWeightsH)
    }
    fit(inputArray, outputArray, learningRate) {
        let inputMatrix = Matrix.toMatrix(inputArray)
        let outputMatrix = Matrix.toMatrix(outputArray)
        this.feedForward(inputMatrix);
        this.calculateLoss(outputMatrix);
        this.backpropogate(learningRate);
    }

}