require('../util/colors');
import { firebaseApp } from '../util/firebase.config';

export class EventService {

    constructor() {
        this.logger = `EventService`;
        console.log(`${this.logger} - initializing`.help);
        // binding
        this.getEvents = this.getEvents.bind(this);
    }

    /**
     * 
     * @returns Promise
     */
    getEvents() {
        const promise = new Promise((resolve, reject) => {
            try {
                firebaseApp.database().ref("events")
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