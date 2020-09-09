///<reference path="p5.global-mode.d.ts" />
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x))
}


class Matrix {
    constructor(rows, cols, randomize) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];

        for (let i = 0; i < this.rows; i++) {
            this.matrix[i] = []
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = 0
            }
        }
        if (randomize) {
            this.randomize();
        }
    }

    copy() {
        let a = new Matrix(this.rows, this.cols)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                a.matrix[i][j] = this.matrix[i][j]
            }
        }
        return a
    }

    randomize() {
        for (let i = 0; i < this.rows; i++) {
            this.matrix[i] = []
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = (Math.random() * 2 - 1)
            }
        }
    }

    add(a) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] += a.matrix[i][j]
            }
        }
    }

    static addMatrix(n, m) {
        let newMatrix = new Matrix(n.rows, n.cols)
        for (let i = 0; i < n.rows; i++) {
            for (let j = 0; j < n.cols; j++) {
                newMatrix.matrix[i][j] = n.matrix[i][j] + m.matrix[i][j]
            }
        }
        return newMatrix

    }

    static dotProduct(m, n) {
        if (n instanceof Matrix) {
            if (m.cols !== n.rows) {
                return "Columns of A must match rows of B!"
            }

            let a = m
            let b = n
            let results = new Matrix(a.rows, b.cols)
            for (let i = 0; i < results.rows; i++) {
                for (let j = 0; j < results.cols; j++) {
                    let sum = 0;
                    for (let k = 0; k < a.cols; k++) {
                        sum += a.matrix[i][k] * b.matrix[k][j]
                    }
                    results.matrix[i][j] = sum


                }
            }
            return results
        }
    }

    static hadamard(n, m) {
        let newMatrix = new Matrix(n.rows, n.cols)
        for (let i = 0; i < n.rows; i++) {
            for (let j = 0; j < n.cols; j++) {
                newMatrix.matrix[i][j] = n.matrix[i][j] * m.matrix[i][j]
            }
        }
        return newMatrix
    }
    static scale(m, n) {
        let scaledMatrix = new Matrix(n.rows, n.cols)
        for (let i = 0; i < n.rows; i++) {
            for (let j = 0; j < n.cols; j++) {
                scaledMatrix.matrix[i][j] = m * n.matrix[i][j]
            }
        }
        return scaledMatrix
    }

    show() {
        console.table(this.matrix)
    }

    static transpose(m) {
        let transposedMatrix = new Matrix(m.cols, m.rows)
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                transposedMatrix.matrix[j][i] = m.matrix[i][j]
            }
        }
        return transposedMatrix
    }

    map(func) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = func(this.matrix[i][j])
            }
        }

    }

    static map(n, func) {
        let newMatrix = new Matrix(n.rows, n.cols)
        for (let i = 0; i < n.rows; i++) {
            for (let j = 0; j < n.cols; j++) {
                newMatrix.matrix[i][j] = func(n.matrix[i][j])
            }
        }
        return newMatrix
    }

    static toMatrix(array) {
        let matrixFromArray = new Matrix(array.length, 1)
        let j = 0
        for (let i = 0; i < array.length; i++) {
            matrixFromArray.matrix[i][j] = array[i]
        }
        return matrixFromArray
    }

    static sumMatrix(m) {
        let sum = 0
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                sum += m.matrix[i][j]
            }
        }
        return sum
    }

    static substract(m, n) {
        let substractMatrix = new Matrix(m.rows, m.cols)
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                substractMatrix.matrix[i][j] = m.matrix[i][j] - n.matrix[i][j]
            }
        }
        return substractMatrix
    }
    substract(m) {
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                this.matrix[i][j] -= m.matrix[i][j]
            }
        }
    }
   

}





