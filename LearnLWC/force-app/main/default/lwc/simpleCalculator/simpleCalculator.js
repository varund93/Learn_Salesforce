import { LightningElement, track } from 'lwc';

export default class SimpleCalculator extends LightningElement {
    @track result = '';
    @track results = [];
    n1;
    n2;
    @track history = false;

    handlerNumberChange(e){
        switch(e.target.name){
            case 'N1': this.n1 = e.target.value; break;
            case 'N2': this.n2 = e.target.value; break;
            default: break;
        }
    }

    handlerCalculate(e){
        if(this.n1 !== "" && this.n1 !== undefined && this.n1 !== null && this.n2 !== "" && this.n2 !== undefined && this.n2 !== null)
        {
            switch(e.target.name){
                case 'Add': this.result = `${this.n1} + ${this.n2} = ${(parseFloat(this.n1) + parseFloat(this.n2))}`; break;
                case 'Subtract': this.result = `${this.n1} - ${this.n2} = ${(parseFloat(this.n1) - parseFloat(this.n2))}`; break;
                case 'Multiply': this.result = `${this.n1} * ${this.n2} = ${(parseFloat(this.n1) * parseFloat(this.n2))}`; break;
                case 'Divide': this.result = `${this.n1} / ${this.n2} = ${(parseFloat(this.n1) / parseFloat(this.n2))}`; break;
                default: break;
            }
            this.results.push(this.result);
        } else {
            this.result = 'Please check your inputs.';
        }                
    }

    handelerShowHistory(e){
        this.history = e.target.checked;
    }
}