const ops = {
    '**': (a, b) => Math.pow(a, b),
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b
};
class SmartCalculator {

    constructor(initialValue) {
        this.expression = [['+', initialValue]];
    }

    add(number) {
        this.expression.push(['+', number]);
        return this;
    }

    subtract(number) {
        this.expression.push(['-', number]);
        return this;
    }

    multiply(number) {
        this.expression.push(['*', number]);
        return this;
    }

    devide(number) {
        this.expression.push(['/', number]);
        return this;
    }

    pow(number) {
        this.expression.push(['**', number]);
        return this;
    }

    valueOf() {

        while (this.expression.some(elem => elem[0] === '**')) {
            this.expression = this.expression.reduceRight(function (prev, curr, i, arr) {
                if (arr[i + 1][0] === '**') {
                    arr[i][1] = ops['**'](arr[i][1], arr[i + 1][1]);
                    arr.splice(i + 1, 1);
                }
                return arr;
            });
        }

        while (this.expression.some(elem => elem[0] === '*')) {
            this.expression = this.expression.reduceRight(function (prev, curr, i, arr) {
                if (arr[i + 1][0] === '*') {
                    arr[i][1] = ops['*'](arr[i][1], arr[i + 1][1]);
                    arr.splice(i + 1, 1);
                }
                return arr;
            });
        }

        while (this.expression.some(elem => elem[0] === '/')) {
            this.expression = this.expression.reduce(function (prev, curr, i, arr) {
                if (arr[i][0] === '/') {
                    arr[i - 1][1] = ops['/'](arr[i - 1][1], arr[i][1]);
                    arr.splice(i, 1);
                }
                return arr;
            });
        }

        return this.expression.reduce(function (prev, curr, i, arr) {
            return (curr[0] === '+') ? prev += curr[1] : prev -= curr[1];
        }, 0);
    }
}

module.exports = SmartCalculator;
