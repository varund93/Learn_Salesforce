import { LightningElement, track, api } from 'lwc';

export default class PublicMethodChild extends LightningElement {
    @track value = ['red'];

    get options() {
        return [
            { label: 'Red', value: 'red' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
        ];
    }

    @api
    selectCheckbox(value) {
        const selectedCheckbox = this.options.find(checkbox => {
            return value === checkbox.value;
        })

        if (selectedCheckbox) {
            this.value = selectedCheckbox.value;
            return 'Found and Checked';
        }
        return 'Not Found';
    }
}