require('../util/colors');
import { firebaseApp } from '../util/firebase.config';

export class ContentService {

    constructor() {
        this.logger = `ContentService`;
        console.log(`${this.logger} - initialized`.help);
        this.eventRef = firebaseApp.database().ref("/content");
        // binding
        this.getContent = this.getContent.bind(this);
    }

    /**
     * API to retrieve event details
     * @returns Promise
     */
    getContent() {
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