import { LightningElement, track } from 'lwc';

export default class BmiCalculator extends LightningElement {
    cardTitle = 'BMI Calculator';
    weight;
    height;
    @track bmi;

    handlerChange(e) {
        switch (e.target.name) {
            case 'Weight': this.weight = parseFloat(e.target.value); break;
            case 'Height': this.height = parseFloat(e.target.value); break;
            default: break;
        }
    }

    handlerClick() {
        if (this.weight > 0 && this.height > 0) {
            this.bmi = this.weight / (this.height * this.height);
        } else {
            this.bmi = undefined;
        }
    }

    get bmiValue() {
        if (this.bmi !== undefined) {
            return `Your BMI is ${this.bmi}.`;
        }
        return `Please check your inputs.`;
    }
}