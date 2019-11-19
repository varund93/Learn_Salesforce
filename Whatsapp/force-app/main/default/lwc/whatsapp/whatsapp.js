/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { LightningElement, api, track, wire } from 'lwc';
import findRelatedMessages from '@salesforce/apex/MessageController.findRelatedMessages';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import MESSAGE_OBJECT from '@salesforce/schema/Message__c';
import MESSAGE_FIELD from '@salesforce/schema/Message__c.Message__c';
import LEAD_FIELD from '@salesforce/schema/Message__c.Lead__c';
import DIRECTION_FIELD from '@salesforce/schema/Message__c.Direction__c';
import TIME_ZONE from '@salesforce/i18n/timeZone';
import { refreshApex } from '@salesforce/apex';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi';

export default class Whatsapp extends LightningElement {
    @track messages;
    @api recordId;
    @track error;
    @track message = undefined;
    @track messageId;
    @api timeZone = TIME_ZONE;

    wiredMessagesResult;

    channelName = '/topic/NewMessageCreated';
    subscription = {};

    @wire(findRelatedMessages, { recordId: '$recordId' })
    wiredMessages(result) {
        this.wiredMessagesResult = result;
        if (result.data) {
            this.messages = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.messages = undefined;
        }
    }

    handleMessageChange(event) {
        this.messageId = undefined;
        this.message = event.target.value;
    }

    createMessage() {
        if (this.message !== undefined && this.message !== '') {
            const fields = {};
            fields[MESSAGE_FIELD.fieldApiName] = this.message;
            fields[LEAD_FIELD.fieldApiName] = this.recordId;
            fields[DIRECTION_FIELD.fieldApiName] = 'Sent';
            const recordInput = { apiName: MESSAGE_OBJECT.objectApiName, fields };
            createRecord(recordInput)
                .then(message => {
                    this.messageId = message.id;
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Message created',
                            variant: 'success'
                        })
                    );
                    this.message = undefined;
                    return refreshApex(this.wiredMessagesResult);
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error creating record',
                            message: error,
                            variant: 'error'
                        })
                    );
                });
        }
    }

    handleLoad() {
        return refreshApex(this.wiredMessagesResult);
    }

    handleAvailability(event) {
        if (event.target.checked) {
            this.handleSubscribe();
            this.handleLoad();
        }
        else {
            this.handleUnsubscribe();
        }
    }

    handleSubscribe() {
        const messageCallback = function (response) {
            console.log('New message received : ', JSON.stringify(response));
            if (JSON.stringify(response).includes(this.recordId)) {
                this.handleLoad();
            }
        }.bind(this);

        subscribe(this.channelName, -1, messageCallback).then(response => {
            console.log('Successfully subscribed to : ', JSON.stringify(response.channel));
            this.subscription = response;
        });
    }

    handleUnsubscribe() {
        unsubscribe(this.subscription, response => {
            console.log('unsubscribe() response: ', JSON.stringify(response));
        });
    }

    registerErrorListener() {
        onError(error => {
            console.log('Received error from server: ', JSON.stringify(error));
        });
    }
}
