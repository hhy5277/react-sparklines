export default class DataProcessor {

    static dataToPoints(data, width, height, limit) {

        if (limit && limit < data.length) {
            data = data.slice(data.length - limit);
        }

        let max = this.max(data);
        let min = this.min(data);

        let vfactor = height / (max - min);
        let hfactor = width / (limit || data.length);

        return data.map((d, i) => {
            return {
                x: i * hfactor,
                y: (max - data[i]) * vfactor
            }
        });
    }

    static max(data) {
        return Math.max.apply(Math, data);
    }

    static min(data) {
        return Math.min.apply(Math, data);
    }

    static mid(data) {
        return (this.max(data) - this.min(data)) / 2;
    }

    static avg(data) {
        return data.reduce((a, b) => a + b) / (data.length + 1);
    }

    static mean(data) {
        return data.sort()[Math.floor(data.length / 2)];
    }

    static calculateFromData(data, calculationType) {
        return this[calculationType].call(this, data);
    }
}
