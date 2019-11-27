import { LightningElement, track } from 'lwc';

export default class PublicMethodParent extends LightningElement {
    @track value;

    onChangeHandler(e)
    {
        this.value = e.target.value;
    }

    onSelectHandler(){
        const child = this.template.querySelector('c-public-method-child');
        // eslint-disable-next-line no-console
        console.log(child.selectCheckbox(this.value));
    }
}