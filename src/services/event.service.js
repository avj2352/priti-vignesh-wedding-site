require('../util/colors');
import { firebaseApp } from '../util/firebase.config';

export class EventService {

    constructor() {
        this.logger = `EventService`;
        console.log(`${this.logger} - initialized`.help);
        this.eventRef = firebaseApp.database().ref("/events");
        // binding
        this.getEvents = this.getEvents.bind(this);
    }

    /**
     * API to retrieve event details
     * @returns Promise
     */
    getEvents() {
        const promise = new Promise((resolve, reject) => {
            try {
                this.eventRef
                .on('value', (snapshot)=>{
                    resolve(snapshot.val());
                });
            } catch(err) {
                reject(`Error retrieving data - ${JSON.stringify(err)}`);
            }
        });
        return promise;
    }
    
}