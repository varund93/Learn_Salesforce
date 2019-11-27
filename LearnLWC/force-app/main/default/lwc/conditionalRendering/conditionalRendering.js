import { LightningElement, track } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    @track flag = false;
    list_City = ['Chennai', 'Kochi', 'Bengaluru', 'Hyderabad'];

    handlerShowDiv(e) {
        this.flag = e.target.checked;
    }
}