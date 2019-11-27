import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {
    @track dynamicGreeting = 'World';

    greetingChangeHandler(e){
        this.dynamicGreeting = e.target.value;
    }
}