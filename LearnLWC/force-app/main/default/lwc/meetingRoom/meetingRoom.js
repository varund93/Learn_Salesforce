import { LightningElement, api } from 'lwc';

export default class MeetingRoom extends LightningElement {
    @api meetingRoomInfo;
    @api showCapacity = false;

    tileClickHandler() {
        const tileClickedEvent = new CustomEvent('tileclick', { detail: this.meetingRoomInfo, bubbles:true});
        this.dispatchEvent(tileClickedEvent);
    }
}