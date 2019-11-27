import { LightningElement,track } from 'lwc';

export default class MeetingRooms extends LightningElement {
    meetingRooms = [
        {name:'A-01', capacity: '10'},
        {name:'A-02', capacity: '15'},
        {name:'A-03', capacity: '20'},
        {name:'A-04', capacity: '25'},
        // {name:'B-01', capacity: '10'},
        // {name:'B-02', capacity: '15'},
        // {name:'B-03', capacity: '20'},
        // {name:'B-04', capacity: '25'},
    ];

    @track show =false;

    toggleChangeHandler(e){
        this.show = e.target.checked;
    }
}