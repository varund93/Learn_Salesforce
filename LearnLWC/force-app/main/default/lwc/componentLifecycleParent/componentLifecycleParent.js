import { LightningElement } from 'lwc';

export default class ComponentLifecycleParent extends LightningElement {
    constructor() {
        super();
        // eslint-disable-next-line no-console
        console.log('Parent - Constructor');
    }

    connectedCallback() {
        // eslint-disable-next-line no-console
        console.log('Parent - Connected Callback');
    }

    renderedCallback() {
        // eslint-disable-next-line no-console
        console.log('Parent - Rendered Callback');
    }

    disconnectedCallback() {
        // eslint-disable-next-line no-console
        console.log('Parent - Disconnected Callback');
    }
}