import { LightningElement,api } from 'lwc';

export default class ComponentLifecycleChild extends LightningElement {
    @api n;
    constructor() {
        super();
        // eslint-disable-next-line no-console
        console.log(`Child - Constructor`);
    }

    connectedCallback() {
        // eslint-disable-next-line no-console
        console.log(`Child ${this.n} - Connected Callback`);
    }

    renderedCallback() {
        // eslint-disable-next-line no-console
        console.log(`Child ${this.n} - Rendered Callback`);
    }

    disconnectedCallback() {
        // eslint-disable-next-line no-console
        console.log(`Child ${this.n} - Disconnected Callback`);
    }
}